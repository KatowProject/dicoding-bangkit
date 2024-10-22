/* eslint-disable no-unused-vars */
const { Request, ResponseToolkit } = require('@hapi/hapi');
const reference = require('./reference');

const {
  getBooks,
  getBook,
  addBook,
  updateBook,
  deleteBook,
} = require('./book');

/**
 *
 * @param {Request} request
 * @param {ResponseToolkit} h
 */
const Books = (request, h) => {
  const query = request.query;
  const books = getBooks(query);

  return h.response({
    status: 'success',
    data: {
      books,
    },
  });
};

/**
 * @param {Request} request
 * @param {ResponseToolkit} h
 */
const AddBook = (request, h) => {
  const { pageCount, readPage } = request.payload;

  const keys = Object.keys(reference);
  const isKeyValid = keys.every((key) => {
    return (
      key in request.payload && typeof request.payload[key] === reference[key]
    );
  });

  if (!isKeyValid)
    return h
      .response({
        status: 'fail',
        message: 'Gagal menambahkan buku. Mohon isi nama buku',
      })
      .code(400);

  if (readPage > pageCount)
    return h
      .response({
        status: 'fail',
        message:
          'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
      })
      .code(400);

  const insertBook = addBook(request.payload);

  return h
    .response({
      status: 'success',
      message: 'Buku berhasil ditambahkan',
      data: {
        bookId: insertBook,
      },
    })
    .code(201);
};

/**
 *
 * @param {Request} request
 * @param {ResponseToolkit} h
 */
const Book = (request, h) => {
  const { bookId } = request.params;

  const book = getBook(bookId);

  if (!book)
    return h
      .response({
        status: 'fail',
        message: 'Buku tidak ditemukan',
      })
      .code(404);

  return h.response({
    status: 'success',
    data: {
      book,
    },
  });
};

/**
 * @param {Request} request
 * @param {ResponseToolkit} h
 */
const EditBook = (request, h) => {
  const { bookId } = request.params;

  const book = getBook(bookId);

  if (!book)
    return h
      .response({
        status: 'fail',
        message: 'Gagal memperbarui buku. Id tidak ditemukan',
      })
      .code(404);

  const { pageCount, readPage } = request.payload;

  const keys = Object.keys(reference);
  const isKeyValid = keys.every((key) => {
    return (
      key in request.payload && typeof request.payload[key] === reference[key]
    );
  });

  if (!isKeyValid)
    return h
      .response({
        status: 'fail',
        message: 'Gagal memperbarui buku. Mohon isi nama buku',
      })
      .code(400);

  if (readPage > pageCount)
    return h
      .response({
        status: 'fail',
        message:
          'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
      })
      .code(400);

  const updatedAt = new Date().toISOString();

  const finished = readPage === pageCount;

  updateBook(bookId, {
    ...request.payload,
    updatedAt,
    finished,
  });

  return h.response({
    status: 'success',
    message: 'Buku berhasil diperbarui',
  });
};

/**
 * @param {Request} request
 * @param {ResponseToolkit} h
 */
const RemoveBook = (request, h) => {
  const { bookId } = request.params;

  const book = getBook(bookId);

  if (!book)
    return h
      .response({
        status: 'fail',
        message: 'Buku gagal dihapus. Id tidak ditemukan',
      })
      .code(404);

  deleteBook(bookId);

  return h.response({
    status: 'success',
    message: 'Buku berhasil dihapus',
  });
};

module.exports = {
  Books,
  AddBook,
  Book,
  EditBook,
  RemoveBook,
};
