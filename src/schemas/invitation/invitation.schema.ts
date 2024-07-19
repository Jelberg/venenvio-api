import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { DEFAULT_OPTIONS_SCHEMA } from '../default-options';

@Schema(DEFAULT_OPTIONS_SCHEMA)
export class Invitation {

  @Prop({ required: [true, 'refUserId is required']})
  refUserId: string;

  @Prop({ required: [true, 'userId is required']})
  userId: string;

}

export type InvitationDocument =Invitation & Document;
export const InvitationSchema = SchemaFactory.createForClass(Invitation);
