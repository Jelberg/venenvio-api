import { Injectable } from '@nestjs/common';
import { TokenExpiredException, TokenInvalidException, UserNotFoundException } from '../auth.exceptions';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { MailerService } from '@nestjs-modules/mailer';
import {User} from 'src/modules/user/entities/user.entity';
import { ValidationCode } from '../entities/validation-code.entity';
import { AppConfigService } from 'src/config.service';
import { AuthRepository } from 'src/modules/auth/repository/auth-repository.repository';
import { UserRepository } from 'src/modules/user/respository/user-repository.repository';
import { ProfileRepository } from 'src/modules/profile/repository/profile.repository';
import { Profile } from 'src/modules/profile/entities/profile.entity';

@Injectable()
export class AuthService {
  constructor(
    private appConfigService: AppConfigService, 
    private jwtService: JwtService,
    private mailerService: MailerService, 
    private authRepository: AuthRepository,
    private userRepository: UserRepository,
    private profileRepository: ProfileRepository
  ) {}

  
  async login(email: string, pass: string) {
    const user = await this.userRepository.findOneUserByEmail(email);
    if (user && bcrypt.compareSync(pass, user.password)) {
      const profile = await this.profileRepository.findOneByUserId(user._id)
      if (profile.isVerifiedEmail){
        await this.sendCode(user.email, "2factor")
      }
      return {
        isLogged: true,
        isVerifiedEmail: profile.isVerifiedEmail, 
        user: user
      };
    }
    throw new UserNotFoundException();
  }


  async getUserLogin(user: User) {
    const payload = { email: user.email, password: user.password, verified: user.verified };
    user.token = this.jwtService.sign(payload);
    return await this.userRepository.updateByEmail(user, user.email);
  }


  async logout(email: string) {
    const user = await this.userRepository.findOneUserByEmail(email);
    if (!user) {
      return 'No se encontró el usuario';
    } else{
        user.token = "";
        return await this.userRepository.updateByEmail(user, user.email);
    }
  }

    
  async validateToken(token: string): Promise<any> {
    try {
      const decodedToken = await this.jwtService.decode(token);
    
      await this.jwtService.verify(token);
    
      const user = await this.userRepository.findOneUserByEmail(decodedToken.email)
    
      if (user && user.token === token) {
        return { message: 'The token is valid', user };
      } else {
        throw new TokenInvalidException();
      }
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        throw new TokenExpiredException();
      }
      throw error;
    }
  }


  async recoverPasswordRequest(email: string): Promise<boolean> {
    try {
      const user = await this.userRepository.findOneUserByEmail(email)
      if (!user) throw new UserNotFoundException()
      const resetToken = this.jwtService.sign({ email: user.email }, { expiresIn: 60 * 60 });
      user.token = resetToken;
    
        await Promise.all([
          this.userRepository.updateByEmail(user, email),
          this.mailerService.sendMail({
            to: email,
            subject: 'Reset your password',
            template: './reset-password',
            context:{
              resetLink: this.appConfigService.venenvio_url+'change-password?token='+resetToken
            }
          })
        ])
        return true
    }catch(error) {
      return false;
      throw error;
    }
 
  }


async resetPassword(token: string, password: string){
  try {
    const hashedPassword = bcrypt.hashSync(password, 10);
    const decodedToken = await this.jwtService.decode(token);
    const user = await this.userRepository.findOneUserByEmail(decodedToken.email)
    if (!user) {
      throw new UserNotFoundException();
    }
    const resetToken = this.jwtService.sign({ email: user.email })
    user.password = hashedPassword;
    user.token = resetToken
    return this.userRepository.updateByEmail(user, user.email)

    } catch (error) {
      throw error;
    }
  }

  generateCode (max: number = 99999999, min: number=11111111): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  async getCodeByUser (email: string, type: string): Promise<ValidationCode> {
    try {
      return this.authRepository.findOneByEmailValidationCode(email, type);
    } catch (error) {
      console.log(error);
    }
  }


  async sendCode(email: string, type: string): Promise<boolean> {
    try {
      const gencode = this.generateCode()
      let validationCode = await this.getCodeByUser(email, type);
      if (!validationCode) {
        validationCode = new ValidationCode()
      }
        validationCode.code =gencode;
        validationCode.email = email;
        validationCode.type = type;

      await Promise.all([
        this.authRepository.saveValidationCode(validationCode),
        this.mailerService.sendMail({
          to: email,
          subject: gencode.toString(),
          template: './send-code',
          context:{
            code: gencode
          }
        })
      ])
      return true

    } catch (error) {
      throw new Error(error)
    }
  }

  async deleteValidationCodeByUser(email: string) {
    try {
      return await this.authRepository.deleteOneByEmailValidationCode(email) 
    } catch (error) {
      throw new Error(error)
    }
  }


  async validateAuth(email: string, code: number, type:string): Promise<any>{
    try {
      let validationCode = await this.getCodeByUser(email, type);
      if (!validationCode) throw new Error(`User no have a code`)

      if (validationCode.code !== code){
        throw new Error(`Invalid code: ${code}`)
      }

      const currentUser = await this.userRepository.findOneUserByEmail(email)

    
      const profile = new Profile()
      profile.userId = currentUser._id
      profile.isVerifiedEmail = true;

      const [,user,] = await Promise.all([
        this.deleteValidationCodeByUser(email),
        this.userRepository.findOneUserByEmail(email),
        type === "signup" && this.profileRepository.updateByUserId(profile)
      ])
      
      return this.getUserLogin(user);

    } catch (error) {
      throw new Error(error)
    }

  }

  async getTokenSignup(): Promise<string | null> {
    try {
      const payload = {}
      const options ={ expiresIn: 10 * 60 }   
      const token = this.jwtService.sign(payload, options);
      return token

      
    }catch(error) {
      throw error;
    }
 
  }

  async validateTokenSignup(token: string): Promise<boolean> {
    try {
      const result = this.jwtService.verify(token);
      return true;
      
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        throw new TokenExpiredException();
      }
      return false
    }
  }

}
