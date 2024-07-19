import { Controller, Post, Body, Put, Get, Param } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { ResetPasswordDto } from '../dto/reset-password.dto';
import {TypeToken} from '../interfaces/ITypeToken'
import { ValidateCodeAuthDto } from '../dto/validate-code-auth.dto';
import { SendCodeDto } from '../dto/send-code';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService) {}

  @Post('login')
  async login(@Body('email') email: string, @Body('password') password: string) {
    return await this.authService.login(email, password);
  }

  @Post('logout')
  async logout(@Body('email') email: string) {
    return await this.authService.logout(email);
  }

  @Put('password-reset')
  async passwordReset(@Body() resetPasswordDto: ResetPasswordDto) {
    return await this.authService.resetPassword(resetPasswordDto.token, resetPasswordDto.password);
  }

  @Put('request-password-recovery')
  async passwordRecovery(@Body('email') email: string) {
    return await this.authService.recoverPasswordRequest(email);
  }

  @Get('validate-token/:token/:typeToken?')
  async validateToken(@Param('token') token: string, @Param('typeToken') typeToken?: TypeToken['type']) {
    return await this.authService.validateToken(token);
  }

  @Get('get-token-signup')
  async getTokenSingup() {
    return await this.authService.getTokenSignup();
  }

  @Get('validate-token-signup/:token')
  async validateTokenSingup(@Param('token') token: string) {
    return await this.authService.validateTokenSignup(token);
  }

  @Post('send-code')
  async sendCode(@Body() sendCodeDto: SendCodeDto) {
    return await this.authService.sendCode(sendCodeDto.email, sendCodeDto.type);
  }

  //@Post('two-factor')
  @Post('validate-code')
  async validateCodeAuth(@Body() dto: ValidateCodeAuthDto ) {
    const {email, code, type} = dto;
    return await this.authService.validateAuth(email, code, type);
  }
  
}
