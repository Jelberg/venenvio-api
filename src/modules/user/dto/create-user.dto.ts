

import { IsNotEmpty, IsString, IsBoolean, IsEmail } from "class-validator";

export class CreateUserDto {
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    lastname: string;

    @IsNotEmpty()
    @IsString()
    phone: string;

    @IsNotEmpty()
    @IsString()
    password: string;

    @IsNotEmpty()
    @IsString()
    usernameInvitation: string;

    /*@IsEmpty()
    @IsNumber()
    dni: string;

    @IsEmpty()
    @IsString()
    address: string;

    @IsEmpty()
    @IsDate()
    birthdate: Date;

    @IsEmpty()
    @IsString()
    gender: string;

    @IsEmpty()
    @IsBoolean()
    active: boolean;*/
}
