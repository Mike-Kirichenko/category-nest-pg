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

  async getCategoryByParam(param: CategoryByParamDto) {
    const paramObj: { id: number } | { slug: string } = Number.isInteger(
      Number(param),
    )
      ? { id: Number(param) }
      : { slug: param.toString() };
    try {
      const category: Category = await this.categoryRepository.findOneByOrFail(
        paramObj,
      );
      return category;
    } catch (_) {
      throw new NotFoundException({
        msg: `category with id/slug: ${param} is not found`,
      });
    }
  }
}
