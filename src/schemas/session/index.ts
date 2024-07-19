import { SessionSchema } from "./session.schema";
import { Session } from "./interface";
import { model } from "mongoose";

export const sessionProvider = {
    name: 'Session',
    schema: SessionSchema
  };


export const SessionModel = model<Session>('Session', SessionSchema);