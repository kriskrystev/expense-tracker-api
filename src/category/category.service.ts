import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';
import { PageDto, PageMetaDto, PageOptionsDto } from 'src/core/dto/page.dto';
import { ReadCategoryDto } from './dto/read-category.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async checkIfExists(name: string) {
    const category = await this.categoryRepository.findOne({
      where: {
        name,
      },
    });
    return !!category;
  }

  create(createCategoryDto: CreateCategoryDto) {
    return this.categoryRepository.save(createCategoryDto);
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

  findOne(id: string) {
    return this.categoryRepository.findOneBy({ id });
  }

  update(id: string, updateCategoryDto: UpdateCategoryDto) {
    return this.categoryRepository.save({
      id,
      ...updateCategoryDto,
    });
  }

  remove(id: string) {
    return this.categoryRepository.delete(id);
  }
}
