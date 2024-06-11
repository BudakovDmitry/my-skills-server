import { IsArrayField } from "../../utils/decorators/dto.decorators.js";

export class ChatDto {
  @IsArrayField('Users')
  users: string[];
}