import { IsString } from "class-validator"

export class PageLinkDto {
  @IsString()
  name: string

  @IsString()
  link: string
}
