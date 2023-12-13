import { BaseEntity } from 'src/core/entities/base.entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Category extends BaseEntity {
  @Column()
  name: string;

  @Column()
  description: string;
}
