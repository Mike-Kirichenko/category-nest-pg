import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import {
  CreateCategoryDto,
  CategoryByParamDto,
  UpdateCategoryDto,
} from './dto';
import { Category } from './entities';
import { Response } from 'src/common/types';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  private formatParamObject(param: CategoryByParamDto) {
    return Number.isInteger(Number(param))
      ? { id: Number(param) }
      : { slug: param.toString() };
  }

  async createCategory(categoryDto: CreateCategoryDto): Promise<Response> {
    try {
      const newCategory = this.categoryRepository.create(categoryDto);
      return await this.categoryRepository.save(newCategory);
    } catch (_) {
      throw new BadRequestException({
        msg: 'Opps... Something went wrong',
      });
    }
  }

  async updateCategory(
    id: number,
    categoryDto: UpdateCategoryDto,
  ): Promise<Response> {
    let updated: number;
    try {
      const { affected } = await this.categoryRepository.update(
        {
          id,
        },
        categoryDto,
      );
      updated = affected;
    } catch (_) {
      throw new BadRequestException({
        msg: 'Opps... Something went wrong',
      });
    }
    if (!updated)
      throw new NotFoundException({
        msg: `category is not found`,
      });

    return { msg: 'category was successfully updated' };
  }

  async deleteCategory(id: number): Promise<Response> {
    let deleted: number;
    try {
      const { affected } = await this.categoryRepository.delete({ id });
      deleted = affected;
    } catch (_) {
      throw new BadRequestException({
        msg: 'Opps... Something went wrong',
      });
    }

    if (!deleted)
      throw new NotFoundException({
        msg: `category was not found`,
      });

    return { msg: `category removed successfully` };
  }

  async getCategoryByParam(param: CategoryByParamDto): Promise<Response> {
    const paramObj = this.formatParamObject(param);
    let found: Category;
    try {
      found = await this.categoryRepository.findOneBy(paramObj);
    } catch (_) {
      throw new BadRequestException({
        msg: 'Opps... Something went wrong',
      });
    }

    if (!found)
      throw new NotFoundException({
        msg: `category was not found`,
      });

    return found;
  }
}
