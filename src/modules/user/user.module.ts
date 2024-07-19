import { Module } from '@nestjs/common';
import { UserController } from './controllers/user.controller';
import { UserService } from './services/user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService, ConfigModule } from '@nestjs/config';
import { UserRepositoryModule } from './respository/user-repository.module';
import { UserRepository } from './respository/user-repository.repository';
import { userProvider } from 'src/schemas/user';
import { InvitationRepositoryModule } from '../invitation/repository/invitation-repository.module';
import { InvitationRepository } from '../invitation/repository/invitation-repository.repository';
import { ProfileRepositoryModule } from '../profile/repository/profile.module';
import { invitationProvider } from 'src/schemas/invitation';

@Module({
  controllers: [UserController],
  providers: [UserService, UserRepository, InvitationRepository],
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule], 
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: { expiresIn: '60s' }, 
      }),
      inject: [ConfigService],
    }),
    MongooseModule.forFeature([userProvider, invitationProvider]),
    UserRepositoryModule,
    InvitationRepositoryModule,
    ProfileRepositoryModule
  ],
})
export class UserModule {}
