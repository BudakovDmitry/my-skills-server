import { applyDecorators } from '@nestjs/common';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsEmail, IsNumber, IsOptional, IsString, MinLength } from 'class-validator';

export function IsStringField(description: string) {
  return applyDecorators(
    IsString(),
    ApiProperty({ description }),
  );
}

export function IsOptionalStringField(description: string) {
  return applyDecorators(
    IsOptional(),
    IsString(),
    ApiPropertyOptional({ description }),
  );
}

export function IsNumberField(description: string) {
  return applyDecorators(
    IsNumber(),
    ApiProperty({ description }),
  );
}

export function IsBooleanField(description: string) {
  return applyDecorators(
    IsBoolean(),
    ApiProperty({ description }),
  );
}

export function IsOptionalBooleanField(description: string) {
  return applyDecorators(
    IsOptional(),
    IsBoolean(),
    ApiPropertyOptional({ description }),
  );
}

export function IsOptionalField(description: string) {
  return applyDecorators(
    IsOptional(),
    ApiPropertyOptional({ description }),
  );
}

export function IsEmailField(description: string) {
  return applyDecorators(
    IsEmail(),
    ApiProperty({ description }),
  );
}

export function IsOptionalEmailField(description: string) {
  return applyDecorators(
    IsOptional(),
    IsEmail(),
    ApiPropertyOptional({ description }),
  );
}

export function IsPasswordField(description: string, minLength: number, message: string) {
  return applyDecorators(
    IsString(),
    MinLength(minLength, {
      message
    }),
    ApiProperty({ description, minLength }),
  );
}
