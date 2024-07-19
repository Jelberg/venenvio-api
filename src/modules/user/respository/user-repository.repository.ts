import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { userProvider } from 'src/schemas/user';
import { Model } from 'mongoose';
import { UserDocument, User as MUser } from 'src/schemas/user/user.schema';
import { User } from '../entities/user.entity';
import { UpdateUserDto } from '../dto/update-user.dto';
import { CreateUserDto } from '../dto/create-user.dto';

@Injectable()
export class UserRepository {
    constructor(
        @InjectModel(userProvider.name) private userModel:  Model<UserDocument>,
    ){}

    async updateByEmail(user: UpdateUserDto, email: string, query: string = '-password'): Promise<MUser>{
        try {
            return await this.userModel.findOneAndUpdate(
                { email: email }, 
                 user,
                 { new: true }
            ).select(query);
        } catch (error) {
            console.error(error);
        }
    }

    async getUserByUsername(username: string): Promise<MUser>{
        try {
            return await this.userModel.findOne(
                { username: username }
            );
        } catch (error) {
            console.error(error);
        }
    }

    async findOneUserByEmail(email: string): Promise<User> {
        try {
            return this.userModel.findOne({ email: email });
        } catch (error) {
            console.error(error);
        }
    }

    async findAll(): Promise<MUser[]> {
        try {
            return this.userModel.find();
        } catch (error) {
            console.error(error);
        }
    }

    async saveUser(user: CreateUserDto): Promise<User>{
        try {
            const newUser = new this.userModel(user);
            return await newUser.save();
        } catch (error) {
            console.log(error)
        }
    }

}
