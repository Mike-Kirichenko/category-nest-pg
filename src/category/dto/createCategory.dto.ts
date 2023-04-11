import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
} from 'class-validator';

export class CreateCategoryDto {
  @Matches(/^[A-Za-z_\-]+$/g)
  @IsString()
  @IsNotEmpty()
  slug!: string;

  @Matches(/^(?:[а-яА-ЯЁё\s.!?,_\-]+|[a-zA-Z\s.!?,_\-]+)$/g)
  @IsString()
  @IsNotEmpty()
  name!: string;

  @Matches(/^(?:[а-яА-ЯЁё\s.!?,_\-]+|[a-zA-Z\s.!?,_\-]+)$/g)
  @IsString()
  @IsOptional()
  description?: string;

  @IsBoolean()
  @IsOptional()
  active?: boolean;
}
