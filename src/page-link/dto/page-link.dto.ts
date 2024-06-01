import { IsBooleanField, IsNumberField, IsStringField } from "../../utils/decorators/dto.decorators.js"

export class PageLinkDto {
  @IsStringField('Name page link')
  name: string

  @IsStringField('Link page')
  link: string

  @IsNumberField('Order page link')
  order: number

  @IsBooleanField('Is button link')
  isButton: boolean
}
