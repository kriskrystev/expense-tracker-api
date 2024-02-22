import { BaseEntity } from 'src/core/entities/base.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class User extends BaseEntity {
  @Column({ unique: true })
  username: string;

  @Column()
  password: string;
}
