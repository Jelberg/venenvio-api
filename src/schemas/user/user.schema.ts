import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { DEFAULT_OPTIONS_SCHEMA } from '../default-options';


export interface IUserDocument extends Document {
  _id: string; 
  name: string;
  lastname: string;
  dni: string;
  birthdate: Date;
  phone: string;
  email: string;
  address: string;
  password: string;
  gender: string;
  verified: boolean;
  token: string;
}
@Schema(DEFAULT_OPTIONS_SCHEMA)
export class User {

  @Prop({ required: [true, 'Name is required']})
  name: string;

  @Prop({ required: [true, 'Lastname is required']})
  lastname: string;

  @Prop({ unique: true, sparse: true })
  dni: string;

  @Prop({ type: Date })
  birthdate: Date;

  @Prop({ required: [true, 'Phone is required'], unique: true, sparse: true /*, match: [/^\d{5,15}$/, 'Please fill a valid phone number']*/})
  phone: string;

  @Prop({ required: [true, 'Email is required'], unique: [true, "Email is taken"]})
  email: string;

  @Prop()
  address: string;

  @Prop({ required: [true, 'Password is required']})
  password: string;

  @Prop()
  gender: string;

  @Prop()
  images: string[];

  @Prop({ default:['client'] })
  roles: string[];

  @Prop({ required: [true, 'Active is required'], default: false })
  active: boolean;

  @Prop({ required: [true, 'Verified is required'], default: false })
  verified: boolean;

  @Prop({default: ''})
  token: string;

  @Prop({unique: true, sparse: true })
  username?: string;

}

export type UserDocument = User & Document;
export const UserSchema = SchemaFactory.createForClass(User);
