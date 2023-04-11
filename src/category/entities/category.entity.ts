import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { CreateDateColumn } from 'typeorm';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    type: 'varchar',
    unique: true,
    nullable: false,
  })
  name!: string;

  @Column({
    type: 'varchar',
    unique: true,
    nullable: false,
  })
  slug!: string;

  @Column({
    type: 'text',
    unique: false,
    nullable: true,
  })
  description?: string;

  @Column('boolean', { default: true })
  active!: boolean;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  created_at!: Date;
}
