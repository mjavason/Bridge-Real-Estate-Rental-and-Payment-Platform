import { IsNotEmpty, IsString } from 'class-validator';

export class UniqueIdDTO {
  @IsNotEmpty()
  @IsString()
  id!: number;
}
