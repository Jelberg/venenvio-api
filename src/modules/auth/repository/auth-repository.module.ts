import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthRepository } from './auth-repository.repository';
import { userProvider } from 'src/schemas/user';
import { validationCodeProvider } from 'src/schemas/validation-code';

@Module({
    imports:[MongooseModule.forFeature([
        userProvider, 
        validationCodeProvider,
      ])],
    exports: [AuthRepository],
    providers: [AuthRepository]
})
export class AuthRepositoryModule {}
