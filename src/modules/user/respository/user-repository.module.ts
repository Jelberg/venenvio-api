import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserRepository } from './user-repository.repository';
import { userProvider } from 'src/schemas/user';

@Module({
    imports: [
        MongooseModule.forFeature([
          userProvider, 
        ]),
      ],
    providers: [UserRepository],
    exports: [UserRepository]
})
export class UserRepositoryModule {}
