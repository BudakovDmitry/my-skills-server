import { IsStringField } from "../../utils/decorators/dto.decorators.js";

export class CommentDto {
  @IsStringField('Comment text')
  text: string

  @IsStringField('User author id')
  authorId: string

  @IsStringField('User recipient id')
  recipientId: string
}