const nanoId = require('nanoid');

/**
 * Array of books
 * @type {[]}
 */
const books = [];

/**
 *
 * @returns {[]} books
 */
const getBooks = (query) => {
  if (query.name) {
    return books
      .filter(({ name }) =>
        name.toLowerCase().includes(query.name.toLowerCase())
      )
      .map(({ id, name, publisher }) => ({ id, name, publisher }));
  } else if (query.reading) {
    const reading = query.reading === '1';
    return books
      .filter(({ reading: bookReading }) => bookReading === reading)
      .map(({ id, name, publisher }) => ({ id, name, publisher }));
  } else if (query.finished) {
    const finished = query.finished === '1';
    return books
      .filter(
        ({ pageCount, readPage }) => (pageCount === readPage) === finished
      )
      .map(({ id, name, publisher }) => ({ id, name, publisher }));
  }
  return books.map(({ id, name, publisher }) => ({ id, name, publisher }));
};

/**
 *
 * @param {string} bookId
 * @returns {object} book
 */
const getBook = (bookId) => {
  return books.find((book) => book.id === bookId);
};

/**
 *
 * @param {object} book
 * @returns {string} id
 */
const addBook = (book) => {
  const id = nanoId.nanoid(16);
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;

  const finished = book.readPage === book.pageCount;

  const newBook = {
    id,
    ...book,
    finished,
    insertedAt,
    updatedAt,
  };

  books.push(newBook);

  return id;
};

/**
 *
 * @param {string} bookId
 * @param {object} book
 * @returns {boolean}
 */
const updateBook = (bookId, book) => {
  const updatedAt = new Date().toISOString();

  const index = books.findIndex((book) => book.id === bookId);

  if (index === -1) return false;

  books[index] = {
    ...books[index],
    ...book,
    updatedAt,
  };

  return true;
};

/**
 *
 * @param {string} bookId
 * @returns {boolean}
 */
const deleteBook = (bookId) => {
  const index = books.findIndex((book) => book.id === bookId);

  if (index === -1) return false;

  books.splice(index, 1);

  return true;
};

module.exports = {
  getBooks,
  addBook,
  getBook,
  updateBook,
  deleteBook,
};
