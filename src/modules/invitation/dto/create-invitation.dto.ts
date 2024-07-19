

import { IsNotEmpty, IsString } from "class-validator";


export class CreateInvitationDto {
    @IsNotEmpty()
    @IsString()
    userId: string;

    @IsNotEmpty()
    @IsString()
    refUserId: string;
}
