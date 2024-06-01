import { IsEmailField, IsPasswordField } from "../../utils/decorators/dto.decorators.js"

export class AuthDto {
  @IsEmailField('Emal')
  email: string

  @IsPasswordField('Password')
  password: string
}