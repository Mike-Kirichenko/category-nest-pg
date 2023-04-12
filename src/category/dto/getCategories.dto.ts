import { Transform } from 'class-transformer';
import { IsIn, IsNumber, IsOptional, IsString } from 'class-validator';

export class GetCategoriesDto {
  @IsString()
  @IsOptional()
  search!: string;

  @IsString()
  @IsOptional()
  name!: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsIn(['true', 'false', '0', '1'])
  @IsOptional()
  active?: string;

  @IsNumber()
  @Transform(({ value }) => parseInt(value))
  @IsOptional()
  pageSize?: number;

  @IsString()
  @IsOptional()
  sort?: string;

  @IsNumber()
  @Transform(({ value }) => parseInt(value))
  @IsOptional()
  page?: number;
}
