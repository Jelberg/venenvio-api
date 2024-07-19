import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Invitation } from '../entities/invitation.entity';
import { InvitationDocument } from 'src/schemas/invitation/invitation.schema';
import { invitationProvider } from 'src/schemas/invitation';
import { Model } from 'mongoose';

@Injectable()
export class InvitationRepository {
    constructor(
        @InjectModel(invitationProvider.name) private invitationModel:  Model<InvitationDocument>,
    ){}

    async createInvitation(userId: string, refUserId: string): Promise<Invitation>{
        try {
            return await this.invitationModel.create({
                userId: userId,
                refUserId: refUserId
            })
        } catch (error) {
            console.error(error);
        }
    }


    async findAllByUserId(userId:string): Promise<Invitation[]> {
        try {
            return await this.invitationModel.find({userId: userId})
        } catch (error) {
            console.log(error);
        }
    }
}
