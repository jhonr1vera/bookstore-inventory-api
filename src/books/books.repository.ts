import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from './entities/book.entity.js';
import { CreateBookDto } from './dto/create-book.dto.js';
import { UpdateBookDto } from './dto/update-book.dto.js';
import { MESSAGES } from '../common/constants/messages.constant.js';

@Injectable()
export class BooksRepository {
  constructor(
    @InjectRepository(Book)
    private readonly repository: Repository<Book>,
  ) {}

  private isUniqueViolation(error: unknown): boolean {
    return (
      error instanceof Error &&
      'code' in error &&
      error.code === '23505'
    );
  }

  async create(createBookDto: CreateBookDto): Promise<Book> {
    const book = this.repository.create(createBookDto);
    try {
      return await this.repository.save(book);
    } catch (error: unknown) {
      if (this.isUniqueViolation(error)) {
        throw new ConflictException(MESSAGES.BOOK_ALREADY_EXISTS);
      }
      throw error;
    }
  }

  async findAll(page: number = 1, limit: number = 20): Promise<Book[]> {
    const skip = (page - 1) * limit;
    return this.repository.find({
      skip,
      take: limit,
      order: { id: 'ASC' },
    });
  }

  async findById(id: number): Promise<Book | null> {
    const book = await this.repository.findOne({ where: { id } });
    return book;
  }

  async findByIsbn(isbn: string): Promise<Book | null> {
    const book = await this.repository.findOne({ where: { isbn } });
    return book;
  }

  async update(id: number, updateBookDto: UpdateBookDto, book: Book | null): Promise<Book> {
    this.repository.merge(book!, updateBookDto);
    return this.save(book!);
  }

  async save(book: Book): Promise<Book> {
    try {
      return await this.repository.save(book);
    } catch (error: unknown) {
      if (this.isUniqueViolation(error)) {
        throw new ConflictException(MESSAGES.BOOK_ALREADY_EXISTS);
      }
      throw error;
    }
  }

  async delete(id: number): Promise<void> {
    const result = await this.repository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(MESSAGES.BOOK_NOT_FOUND(id));
    }
  }

  async findByCategory(category: string): Promise<Book[]> {
    return this.repository.find({ where: { category } });
  }

  async findLowStock(threshold: number): Promise<Book[]> {
    return this.repository.createQueryBuilder('book')
      .where('book.stock_quantity <= :threshold', { threshold })
      .getMany();
  }
}
