import { IsNotEmpty, IsIn } from 'class-validator';

export class ResetPasswordDto {
  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  token: string;

  @IsNotEmpty()
  @IsIn(['2factor','signup'])
  type: string
}
