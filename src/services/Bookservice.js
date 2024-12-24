import axios from "../api/axios";

const Book_API = "Book";
export const fetchBooks = async () => {
  return await axios.get(Book_API);
};
export const fetchBookById = async (BookId) => {
  return await axios.get(Book_API + "/" + BookId);
};
export const deleteBook = async (BookId) => {
  return await axios.delete(Book_API + "/" + BookId);
};
export const addBook = async (Book) => {
  try {
    const response = await axios.post(Book_API+"/", Book, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error adding Book:", error.response?.data || error.message);
    throw error;
  }
};
export const editBook = (Book) => {
  return axios.put(Book_API + "/" + Book.id, Book);
};
export const fetchBooksByName = async (name) => {
  return await axios.get(
    Book_API + `/search`,name
  );
};