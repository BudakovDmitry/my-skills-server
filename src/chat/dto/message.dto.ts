import { IsStringField } from "../../utils/decorators/dto.decorators.js";

export class MessageDto {
  @IsStringField('Content')
  content: string;

  @IsStringField('User ID')
  userId: string;

  @IsStringField('Chat ID')
  chatId: string;
}