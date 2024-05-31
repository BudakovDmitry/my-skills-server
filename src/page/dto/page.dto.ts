import { IsString } from "class-validator"

export class PageDto {
  @IsString()
  title: string

  @IsString()
  content: string
}