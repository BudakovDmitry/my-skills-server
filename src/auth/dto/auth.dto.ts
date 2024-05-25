import { IsEmail, IsString, MinLength } from "class-validator"

export class AuthDto {
  @IsEmail()
  email: string

  @MinLength(6, {
    message: 'Пароль повинен бути мінімум 6 символів'
  })
  @IsString()
  password: string
}