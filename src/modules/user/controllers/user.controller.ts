import { Controller, Post, Body, Patch, Get, Param, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { UserService } from '../services/user.service';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UserAuth } from 'src/decorators/user-auth.decorator';
import { IDataUserAuth } from 'src/interfaces/IDataUserAuth';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard';
import { CreateUserDto } from '../dto/create-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('signup')
  async signup(@Body() user: CreateUserDto) {
    return await this.userService.create(user);
  }

  @Get('validate-username/:username')
  async validateUsername(@Param('username') username: string) {
    return await this.userService.validateUsername(username);
  }

  @UseGuards(JwtAuthGuard)
  @Get('list')
  async list() {
    return await this.userService.list();
  }
  
  @UseGuards(JwtAuthGuard)
  @Patch()
  async update(@Body() user: UpdateUserDto, @UserAuth() userAuth: IDataUserAuth) {
    return await this.userService.update(user, userAuth.email);
  }

}
