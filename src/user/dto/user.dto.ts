import { IsEmail, IsOptional, IsString, MinLength } from "class-validator"

export class UserDto {
  @IsOptional()
  @IsEmail()
  email?: string

  @IsOptional()
  @MinLength(6, {
    message: 'Пароль повинен бути мінімум 6 символів'
  })
  @IsString()
  password?: string

  @IsOptional()
  @IsString()
  firstName?: string

  @IsOptional()
  @IsString()
  lastName?: string

  @IsOptional()
  @IsString()
  photo?: string

  @IsOptional()
  @IsString()
  work?: string

  @IsOptional()
  @IsString()
  location?: string

  @IsOptional()
  @IsString()
  description?: string
  
  @IsOptional()
  todos?: object 
}
