// gallery.dto.ts
import { IsString, IsBoolean, IsOptional, IsNotEmpty, IsEnum } from 'class-validator';

export const galleryTypes = ['video', 'audio'];

export class CreateGalleryDTO {
  @IsNotEmpty()
  @IsEnum(galleryTypes)
  type!: string;

  @IsNotEmpty()
  @IsString()
  url!: string;

  @IsNotEmpty()
  @IsString()
  HouseId?: string;
}

export class UpdateGalleryDTO {
  @IsOptional()
  @IsEnum(galleryTypes)
  type?: string;

  @IsOptional()
  @IsString()
  url?: string;

  @IsOptional()
  @IsBoolean()
  deleted?: boolean;
}

export class FindGalleryDTO {
  @IsOptional()
  @IsString()
  id?: number;

  @IsOptional()
  @IsString()
  HouseId?: number;

  @IsOptional()
  @IsEnum(galleryTypes)
  type?: string;

  @IsOptional()
  @IsString()
  url?: string;
}
