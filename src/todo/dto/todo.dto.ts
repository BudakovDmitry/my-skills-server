import { IsBoolean, IsOptional, IsString } from "class-validator";

export class TodoDto {
  @IsString()
  name: string

  @IsOptional()
  @IsBoolean()
  status?: boolean

  @IsOptional()
  @IsString()
  description?: string

  @IsOptional()
  @IsString()
  sticker?: string

  @IsString()
  userId: string
}