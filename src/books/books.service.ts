import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { BooksRepository } from './books.repository.js';
import { CreateBookDto } from './dto/create-book.dto.js';
import { UpdateBookDto } from './dto/update-book.dto.js';
import { Book } from './entities/book.entity.js';
import { MESSAGES } from '../common/constants/messages.constant.js';

@Injectable()
export class BooksService {
  constructor(private readonly booksRepository: BooksRepository) {}

  async create(createBookDto: CreateBookDto): Promise<Book> {
    const bookExists = await this.booksRepository.findByIsbn(createBookDto.isbn);
    if (bookExists) {
      throw new ConflictException(MESSAGES.BOOK_ALREADY_EXISTS);
    }

    return this.booksRepository.create(createBookDto);
  }

  async findAll(page?: number, limit?: number): Promise<Book[]> {
    const books = await this.booksRepository.findAll(page, limit);
    
    if (books.length === 0) {
      throw new NotFoundException(MESSAGES.BOOKS_NOT_FOUND);
    }

    return books;
  }

  async findOne(id: number): Promise<Book> {
    const book = await this.booksRepository.findById(id);
    if (!book) {
      throw new NotFoundException(MESSAGES.BOOK_NOT_FOUND(id));
    }
    return book;
  }

  async findOneByIsbn(isbn: string): Promise<Book | null> {
    const book = await this.booksRepository.findByIsbn(isbn);
    if (!book) {
      throw new NotFoundException(MESSAGES.BOOK_NOT_FOUND_BY_ISBN(isbn));
    }
    return book;
  }

  async update(id: number, updateBookDto: UpdateBookDto): Promise<Book> {
    const book = await this.findOne(id);
    return this.booksRepository.update(id, updateBookDto, book);
  }

  async remove(id: number): Promise<void> {

    await this.findOne(id);

    return this.booksRepository.delete(id);
  }

  async findByCategory(category: string): Promise<Book[]> {
    const books = await this.booksRepository.findByCategory(category);
    
    if (books.length === 0) {
      throw new NotFoundException(MESSAGES.BOOKS_NOT_FOUND_BY_CATEGORY(category));
    }

    return books;
  }

  async findLowStock(threshold: number): Promise<Book[]> {
    const books = await this.booksRepository.findLowStock(threshold);
    
    if (books.length === 0) {
      throw new NotFoundException(MESSAGES.BOOKS_NOT_FOUND_BY_LOW_STOCK);
    }

    return books;
  }

  async calculatePrice(id: number): Promise<any> {
    // TODO: se llama el servicio de calculateprice
    return { message: `Pending calculation for book ${id}` };
  }
}
