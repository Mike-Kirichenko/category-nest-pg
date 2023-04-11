import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { CategoryService } from './category.service';
import { Response } from 'src/common/types';
import { CreateCategoryDto, CategoryByParamDto } from './dto';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get('/byParam/:param')
  getCategoryByParam(
    @Param() { param }: CategoryByParamDto,
  ): Promise<Response> {
    return this.categoryService.getCategoryByParam(param as any);
  }

  @Delete('/byParam/:param')
  deleteCategory(@Param() { param }: CategoryByParamDto): Promise<Response> {
    return this.categoryService.deleteCategory(param as any);
  }

  @Post()
  async createCategory(
    @Body() categoryDto: CreateCategoryDto,
  ): Promise<Response> {
    return await this.categoryService.createCategory(categoryDto);
  }
}
