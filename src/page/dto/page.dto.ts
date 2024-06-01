import { IsStringField } from "../../utils/decorators/dto.decorators.js"

export class PageDto {
  @IsStringField('Name page')
  name: string

  @IsStringField('Content page')
  content: string
}