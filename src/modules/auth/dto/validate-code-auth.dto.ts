import { IsNotEmpty, IsNumber, IsString, IsIn } from 'class-validator';

export class ValidateCodeAuthDto {
  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsNumber()
  code: number;

  @IsNotEmpty()
  @IsIn(['2factor','signup'])
  type: string
}
