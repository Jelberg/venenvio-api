import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ValidationCode as MValidationCode, ValidationCodeDocument } from 'src/schemas/validation-code/validationCode.schema';
import { validationCodeProvider } from 'src/schemas/validation-code';
import { Model } from 'mongoose';


@Injectable()
export class AuthRepository {
    constructor(
        @InjectModel(validationCodeProvider.name) private validationCodeModel:  Model<ValidationCodeDocument>,
    ){}

    async findOneByEmailValidationCode(email: string, type: string): Promise<MValidationCode>{
        try {
            return await this.validationCodeModel.findOne({email: email, type: type})
        } catch (error) {
            console.log(error)
        }
    }

    async deleteOneByEmailValidationCode(email: string){
        try {
            return await this.validationCodeModel.deleteOne({ email: email })
        } catch (error) {
            console.log(error)
        }
    }

    async saveValidationCode(validationCode: MValidationCode){
        try {
            const newCode = new this.validationCodeModel(validationCode);
            return await newCode.save();
        } catch (error) {
            console.log(error)
        }
    }


}
