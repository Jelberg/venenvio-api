import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { profileProvider } from 'src/schemas/profile';
import { ProfileRepository } from './profile.repository';

@Module({
    imports:[MongooseModule.forFeature([
        profileProvider
      ])],
    providers: [ProfileRepository],
    exports: [ProfileRepository]
})
export class ProfileRepositoryModule{}
