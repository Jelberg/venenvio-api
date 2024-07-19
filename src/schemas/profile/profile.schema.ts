import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { DEFAULT_OPTIONS_SCHEMA } from '../default-options';

@Schema(DEFAULT_OPTIONS_SCHEMA)
export class Profile {

  @Prop({ required: [true, 'userId is required']})
  userId: string;

  @Prop({ default: false ,required: [true, 'isVerifiedEmail is required']})
  isVerifiedEmail: boolean;

  @Prop({ default: false ,required: [true, 'isVerifiedPhone is required']})
  isVerifiedPhone: boolean;

}

export type ProfileDocument =Profile & Document;
export const ProfileSchema = SchemaFactory.createForClass(Profile);
