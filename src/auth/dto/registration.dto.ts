import { IsEmail, IsString, MinLength } from "class-validator"

export class RegistrationDto {
  @IsEmail()
  email: string

  @MinLength(6, {
    message: 'Пароль повинен бути мінімум 6 символів'
  })
  @IsString()
  password: string

  @IsString()
  firstName: string

  @IsString()
  lastName: string
}
