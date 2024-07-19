import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from '../entities/user.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from '../respository/user-repository.repository';
import { UpdateUserDto } from '../dto/update-user.dto';
import { CreateUserDto } from '../dto/create-user.dto';
import { InvitationRepository } from 'src/modules/invitation/repository/invitation-repository.repository';
import { ProfileRepository } from 'src/modules/profile/repository/profile.repository';
import { Profile } from 'src/modules/profile/entities/profile.entity';

@Injectable()
export class UserService {
  constructor(
    private jwtService: JwtService,
    private userRepository: UserRepository,
    private invitationRepository: InvitationRepository,
    private profileRepository: ProfileRepository
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      const userRef = await this.validateUsername(createUserDto.usernameInvitation)
      if (!userRef) {
        throw new HttpException(`User ${createUserDto.usernameInvitation} is not a valid`, HttpStatus.BAD_REQUEST);
      }

      const hashedPassword = bcrypt.hashSync(createUserDto.password, 10);
      createUserDto.password = hashedPassword;
      const user = await this.userRepository.saveUser(createUserDto)

      await this.invitationRepository.createInvitation(user._id, userRef._id)
      
      const newProfile = new Profile()
      newProfile.userId = user._id
      await this.profileRepository.create(newProfile)

      const payload = { email: user.email, password: user.password, verified: user.verified };
      user.token = this.jwtService.sign(payload);
      user.password = "";
      return user;
    } catch (error) {
      console.log(error)
      if (error.code === 11000 && 'dni' in error.keyValue) {
        throw new HttpException('DNI already exists', HttpStatus.BAD_REQUEST);
      }
      if (error.code === 11000 && 'phone' in error.keyValue) {
        throw new HttpException('Phone already exists', HttpStatus.BAD_REQUEST);
      }
      if (error.code === 11000 && 'email' in error.keyValue) {
        throw new HttpException('Email already exists', HttpStatus.BAD_REQUEST);
      }
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findOne(email: string): Promise<User | null> {
    return await this.userRepository.findOneUserByEmail(email);
  }

  async update(user: UpdateUserDto, email: string){
    try {
      return await this.userRepository.updateByEmail(user, email);
    } catch (error) {
      return error;
    }
  }

  async list() {
    try {
      const users =  await this.userRepository.findAll();
      return users;
    } catch (error) {
      return error;
    }
  }

  async validateUsername(username: string): Promise<User> {
    try {
      return await this.userRepository.getUserByUsername(username)
      
    } catch (error) {
      console.log(error)
    }
  }
}
