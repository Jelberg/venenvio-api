import { IsNotEmpty, IsNumber, IsString, IsIn } from 'class-validator';

export class SendCodeDto {
  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsIn(['2factor','signup'])
  type: string
}
