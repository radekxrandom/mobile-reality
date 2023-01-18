import { IsEmail, IsNotEmpty , MaxLength} from 'class-validator';


export class EditUserDto {
  @IsNotEmpty()
  id: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MaxLength(50)
  firstName: string;

  @IsNotEmpty()
  @MaxLength(50)
  lastName: string;
}