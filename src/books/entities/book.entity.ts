import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('books')
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  author: string;

  @Column({ unique: true })
  isbn: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  cost_usd: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  selling_price_local: number;

  @Column({ type: 'int', default: 0 })
  stock_quantity: number;

  @Column()
  category: string;

  @Column({ length: 2 })
  supplier_country: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
