import { IsEmailField, IsPasswordField } from "../../utils/decorators/dto.decorators.js"

export class AuthDto {
  @IsEmailField('Emal')
  email: string

  @IsPasswordField('Password', 6, 'Пароль повинен бути мінімум 6 символів')
  password: string
}