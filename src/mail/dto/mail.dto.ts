import { IsEnum } from "class-validator";
import { IsStringField } from "../../utils/decorators/dto.decorators.js";

export enum MailPurpose {
  Registration = 'Registration',
  Promotional = 'Promotional',
  Notification = 'Notification'
}

export class MailDto {
  @IsStringField('Name Mail')
  name: string

  @IsStringField('Content Mail')
  content: string

  @IsEnum(MailPurpose, { message: 'Purpose must be one of the following values: Registration, Promotional, Notification' })
  purpose: MailPurpose
}