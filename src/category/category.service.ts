import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCategoryDto, CategoryByParamDto } from './dto';
import { Category } from './entities';
import { Response } from 'src/common/types';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

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

  private formatParamObject(param: CategoryByParamDto) {
    return Number.isInteger(Number(param))
      ? { id: Number(param) }
      : { slug: param.toString() };
  }

  async deleteCategory(param: CategoryByParamDto) {
    const paramObj = this.formatParamObject(param);
    let deleted: number;
    try {
      const { affected } = await this.categoryRepository.delete(paramObj);
      deleted = affected;
    } catch (_) {
      throw new BadRequestException({
        msg: 'Opps... Something went wrong',
      });
    }

    if (!deleted)
      throw new NotFoundException({
        msg: `category is not found`,
      });

    return { msg: `category removed successfully` };
  }

  async getCategoryByParam(param: CategoryByParamDto) {
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
        msg: `category is not found`,
      });

    return found;
  }
}
