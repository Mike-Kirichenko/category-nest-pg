import { Matches } from 'class-validator';

export class CategoryByParamDto {
  @Matches(/^(?:[0-9]+|[a-zA-Z\-_]+)$/g)
  param: string;
}
