import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';
import { PageDto } from 'src/core/dto/page.dto';
import { ReadCategoryDto } from './dto/read-category.dto';
import { PageOptionsDto } from 'src/core/dto/page-options.dto';
import { PageMetaDto } from 'src/core/dto/page-meta.dto';
import { CategoryConflict } from './exceptions/4xx/category-409';
import { CategoryNotFound } from './exceptions/4xx/category-404';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async checkIfExists(options: any) {
    return await this.categoryRepository.exist({ where: { ...options } });
  }

  async create(createCategoryDto: CreateCategoryDto) {
    const exists = await this.checkIfExists({ name: createCategoryDto.name });

    if (exists) {
      throw new CategoryConflict(createCategoryDto.name);
    }

    const newCategory = await this.categoryRepository.save(createCategoryDto);

    return newCategory;
  }

  async findAll(
    pageOptionsDto: PageOptionsDto,
  ): Promise<PageDto<ReadCategoryDto>> {
    const queryBuilder = this.categoryRepository.createQueryBuilder('category');

    queryBuilder
      .orderBy('category.createdAt', pageOptionsDto.order)
      .skip(pageOptionsDto.skip)
      .take(pageOptionsDto.take);

    const itemCount = await queryBuilder.getCount();
    const { entities } = await queryBuilder.getRawAndEntities();

    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });

    return new PageDto(entities, pageMetaDto);
  }

  async findOne(id: string) {
    const category = await this.categoryRepository.findOneBy({ id });

    if (!category) {
      throw new CategoryNotFound(id);
    }

    return category;
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    return await this.categoryRepository.save({
      id,
      ...updateCategoryDto,
    });
  }

  async remove(id: string) {
    const exists = await this.checkIfExists({ id });

    if (!exists) {
      throw new CategoryNotFound(id);
    }

    const deleteResult = await this.categoryRepository.delete(id);

    return deleteResult.affected >= 1;
  }
}
