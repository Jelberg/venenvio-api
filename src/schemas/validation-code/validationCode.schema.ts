import { DEFAULT_OPTIONS_SCHEMA } from '../default-options';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema(DEFAULT_OPTIONS_SCHEMA)
export class ValidationCode {

  @Prop({ required: [true, 'Code is required']})
  code: number;

  //TODO: Dberia ser por el id del usuario, pero no puedo acceder a el _id despues de que ejecuto el findOne
  @Prop({ required: [true, 'email is required']})
  email: string;

  @Prop({ required: [true, 'type is required'], enum: ['2factor', 'signup']})
  type: string

}

export type ValidationCodeDocument = ValidationCode & Document;
export const ValidationCodeSchema = SchemaFactory.createForClass(ValidationCode);