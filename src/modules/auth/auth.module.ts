import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { UserModule } from '../user/user.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { UserService } from 'src/modules/user/services/user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/schemas/user/user.schema';
import { ValidationCodeSchema } from 'src/schemas/validation-code/validationCode.schema';
import { ConfigService, ConfigModule } from '@nestjs/config';
import { AuthController } from './controllers/auth.controller';
import { HttpStrategy } from './guards/strategy/http.strategy';
import { AppConfigService } from 'src/config.service';
import { UserRepositoryModule } from '../user/respository/user-repository.module';
import { AuthRepositoryModule } from './repository/auth-repository.module';
import { InvitationRepository } from '../invitation/repository/invitation-repository.repository';
import { invitationProvider } from 'src/schemas/invitation';
import { ProfileRepositoryModule } from '../profile/repository/profile.module';

@Module({
  imports: [
    UserModule,
    PassportModule,
    UserRepositoryModule,
    JwtModule.registerAsync({
      imports: [ConfigModule], 
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: { expiresIn: '2 days' }, 
      }),
      inject: [ConfigService],
    }),
    MongooseModule.forFeature([
      { name: 'User', schema: UserSchema }, 
      { name: 'ValidationCode', schema: ValidationCodeSchema },
      invitationProvider
    ]),
    AuthRepositoryModule,
    ProfileRepositoryModule
  ],
  providers: [AuthService, UserService, HttpStrategy, AppConfigService, InvitationRepository],
  exports: [AuthService, HttpStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
