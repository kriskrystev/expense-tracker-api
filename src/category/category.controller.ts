import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PageDto } from 'src/core/dto/page.dto';
import { ReadCategoryDto } from './dto/read-category.dto';
import { PageOptionsDto } from 'src/core/dto/page-options.dto';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.create(createCategoryDto);
  }

  @Post('/check-if-exists')
  @HttpCode(HttpStatus.OK)
  checkUnique(@Body() body: { name: string }) {
    return this.categoryService.checkIfExists({ name: body.name });
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll(
    @Query() pageOptionsDto: PageOptionsDto,
  ): Promise<PageDto<ReadCategoryDto>> {
    return this.categoryService.findAll(pageOptionsDto);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  findOne(@Param('id') id: string) {
    return this.categoryService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoryService.update(id, updateCategoryDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  remove(@Param('id') id: string) {
    return this.categoryService.remove(id);
  }
}
