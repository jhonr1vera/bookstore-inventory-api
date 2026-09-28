export const MESSAGES = {
  BOOK_ALREADY_EXISTS: 'Book with ISBN already exists',
  BOOK_NOT_FOUND: (id: number) => `Book with ID ${id} not found`,
  BOOKS_NOT_FOUND: 'No books found',
  BOOK_NOT_FOUND_BY_ISBN: (isbn: string) => `Book with ISBN ${isbn} not found`,
  BOOKS_NOT_FOUND_BY_CATEGORY: (category: string) => `No books found in category ${category}`,
  BOOKS_NOT_FOUND_BY_LOW_STOCK: (threshold: number) => `No books found with low stock (threshold: ${threshold})`,
};
