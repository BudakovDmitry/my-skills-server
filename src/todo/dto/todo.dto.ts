import { IsOptionalBooleanField, IsOptionalStringField, IsStringField } from "../../utils/decorators/dto.decorators.js";

export class TodoDto {
  @IsStringField('Name Todo')
  name: string

  @IsOptionalBooleanField('Status Todo')
  status?: boolean

  @IsOptionalStringField('Description todo')
  description?: string

  @IsOptionalStringField('Sticker todo')
  sticker?: string

  @IsStringField('User id')
  userId: string
}