import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
} from 'class-validator';

export class UpdateCategoryDto {
  @Matches(/^[A-Za-z_\-]+$/g)
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  slug?: string;

  @Matches(/^(?:[A-Za-z\s?!,\-.']|[а-яА-Я\s?!,\-.'Ёё])+$/g)
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  name?: string;

  @Matches(/^(?:[A-Za-z\s?!,\-.']|[а-яА-Я\s?!,\-.'Ёё])+$/g)
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  description?: string;

  @IsBoolean()
  @IsOptional()
  active?: boolean;
}
