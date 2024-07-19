import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Profile as MProfile, ProfileDocument } from 'src/schemas/profile/profile.schema';
import { profileProvider } from 'src/schemas/profile';
import { Model } from 'mongoose';


@Injectable()
export class ProfileRepository {
    constructor(
        @InjectModel(profileProvider.name) private profileModel:  Model<ProfileDocument>,
    ){

    }

    async create(profile: MProfile) {
        try {
            const newProfile = new this.profileModel(profile)
            return await newProfile.save()
        } catch (error) {
            console.log(error)
            throw error
        }
    }

    async updateByUserId(profile: MProfile){
        try {
            return await this.profileModel.findOneAndUpdate(
                { userId: profile.userId }, 
                 profile,
                 { new: true }
            );
            
        } catch (error) {
            console.log(error)
            throw error
        }
    }

    async findOneByUserId(userId: string){
        try {
            return await this.profileModel.findOne({
                userId: userId
            })
            
        } catch (error) {
            console.log(error)
            throw error
        }
    }

    


}
