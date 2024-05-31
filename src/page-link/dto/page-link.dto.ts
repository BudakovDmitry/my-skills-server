import { IsNumber, IsString, IsBoolean } from "class-validator"

export class PageLinkDto {
  @IsString()
  name: string

  @IsString()
  link: string

  @IsNumber()
  order: number

  @IsBoolean()
  isButton: boolean
}
