import { IsString } from 'class-validator';

export class UniqueIdDTO {
  @IsString()
  id!: number;
}
