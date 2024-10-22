const { Books, AddBook, Book, EditBook, RemoveBook } = require('./controllers');

/**
 * @module routes/index
 * @description Aggregates all routes into a single array
 */
module.exports = [
  {
    method: 'GET',
    path: '/books',
    handler: Books
  },
  {
    method: 'POST',
    path: '/books',
    handler: AddBook
  },
  {
    method: 'GET',
    path: '/books/{bookId}',
    handler: Book
  },
  {
    method: 'PUT',
    path: '/books/{bookId}',
    handler: EditBook
  },
  {
    method: 'DELETE',
    path: '/books/{bookId}',
    handler: RemoveBook
  }
];