import { IsOptionalEmailField, IsOptionalField, IsOptionalStringField, IsOptionalPasswordField } from "../../utils/decorators/dto.decorators.js";

export class UserLinksDto {
  @IsOptionalStringField('Instagram URL')
  instagram?: string;

  @IsOptionalStringField('Facebook URL')
  facebook?: string;

  @IsOptionalStringField('GitHub URL')
  github?: string;

  @IsOptionalStringField('LinkedIn URL')
  linkedIn?: string;
}

export class UserDto {
  @IsOptionalEmailField('Email')
  email?: string

  @IsOptionalPasswordField('Password', 6, 'Пароль повинен бути мінімум 6 символів')
  password?: string

  @IsOptionalStringField('First name')
  firstName?: string

  @IsOptionalStringField('Last name')
  lastName?: string

  @IsOptionalStringField('Photo')
  photo?: string

  @IsOptionalStringField('Work')
  work?: string

  @IsOptionalStringField('Location')
  location?: string

  @IsOptionalStringField('Description')
  description?: string

  @IsOptionalField('User links')
  links?: UserLinksDto

  @IsOptionalField('Todos')
  todos?: object 

  @IsOptionalStringField('Work')
  plan?: string
}

