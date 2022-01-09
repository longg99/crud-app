import axios from "axios";

export const getAllBooks = async () => await axios.get("api/books");

export const getBookById = async (id) => await axios.get(`api/books/${id}`);

// pass the book object and send a post request to the server
// the proxy is defined in the package.json
export const addBook = async (book) => await axios.post(`api/books`, book);

// pass both id and the edited book obj
export const updateBook = async (book) =>
  await axios.put(`api/books/${book.id}`, book);

export const deleteBook = async (id) => await axios.delete(`api/books/${id}`);
