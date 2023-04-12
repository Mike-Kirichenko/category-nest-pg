import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  ParseIntPipe,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { Response } from 'src/common/types';
import {
  CreateCategoryDto,
  CategoryByParamDto,
  UpdateCategoryDto,
} from './dto';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get('/byParam/:param')
  getCategoryByParam(
    @Param() { param }: CategoryByParamDto,
  ): Promise<Response> {
    return this.categoryService.getCategoryByParam(param as any);
  }

  @Delete(':id')
  deleteCategory(@Param('id', ParseIntPipe) id: number): Promise<Response> {
    return this.categoryService.deleteCategory(id);
  }

  @Post()
  async createCategory(
    @Body() categoryDto: CreateCategoryDto,
  ): Promise<Response> {
    return await this.categoryService.createCategory(categoryDto);
  }

  @Patch(':id')
  async updateCategory(
    @Param('id', ParseIntPipe) id: number,
    @Body() categoryDto: UpdateCategoryDto,
  ): Promise<Response> {
    return await this.categoryService.updateCategory(id, categoryDto);
  }
}
