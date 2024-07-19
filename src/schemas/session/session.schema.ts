import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { DEFAULT_OPTIONS_SCHEMA } from '../default-options';

@Schema(DEFAULT_OPTIONS_SCHEMA)
export class Session {

  @Prop({ required: [true, 'type is required'], enum: ['signup']})
  type: string;

  @Prop({ required: [true, 'token is required']})
  token: string;

}

export type SessionDocument =Session & Document;
export const SessionSchema = SchemaFactory.createForClass(Session);
