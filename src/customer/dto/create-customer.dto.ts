import { IsEmail,
    IsEnum,
    IsNotEmpty,
    IsNumber,
    IsPositive,
    IsString,
    Length,
    Matches, } from 'class-validator';
    import { Transform } from 'class-transformer';

export class CreateCustomerDto {

    @IsNotEmpty()
    @IsString()
    @Length(2, 100)
    @Matches(/^[a-zA-Z\s'-]+$/, { message: 'Name has invalid characters' })
    @Transform(({ value }) => value?.trim())
    name: string;

  @IsEmail()
  @IsNotEmpty()
  @Transform(({ value }) => value?.toLowerCase().trim())
  email: string;

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  balance : number

}