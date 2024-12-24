import React, { useEffect, useState } from "react";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

import { Button, Container, Stack } from "react-bootstrap";

import {
  deleteBook,
  editBook,
  fetchBooks,
} from "../../services/Bookservice";
import Pagination from "../../components/Pagination";
import AddProduct from "./Addbook";
import { getProfile } from "../../services/auth";
import Affichebooks from "./Affbook";
import Addbook from "./Addbook";

const ListBook = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [Books, setProducts] = useState([]);
  const [limit, setLimit] = useState(5);
  const [filtre, setFiltre] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [adminID, setAdminID] = useState(null);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const fetchProfile = async () => {
    try {
      const res = await getProfile();
      console.log(res);
      setAdminID(res.id);
      console.log(adminID);
    } catch (err) {}
  };

  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetchBooks();
      setProducts(res.data);
      console.log(Books);
      setTotalPages(res.data.totalpage);
      console.log(totalPages); 
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    
    fetchProducts();
  }, []);

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleLimitChange = (e) => {
    setLimit(parseInt(e.target.value, 10));
    setCurrentPage(1);
  };
  const handleFiltreChange = (e) => {
    setFiltre(e.target.value);
  };
  const handleDeleteBook = async (id, ref) => {
    confirmAlert({
      title: "Confirm delete...",
      message: " supprimer l' article: " + ref,
      buttons: [
        {
          label: "Oui",
          onClick: () =>
            deleteBook(id)
              .then((res) => fetchProducts(currentPage, limit, ""))
              .catch((error) => console.log(error)),
        },
        {
          label: "Non",
        },
      ],
    });
  };
  const modifBook = async (prodmod) => {
    setProducts(
      Books.map((prod) => (prod.id === prodmod.id ? prodmod : prod))
    );
    await editBook(prodmod);
  };

  return (
    <div>
      <>
        <Stack direction="horizontal" gap={1}>
          
          <div className="p-2 ms-auto">
            <Button variant="success" onClick={handleShow}>
              <i className="fa-solid fa-plus-square me-1"></i>
              Ajouter un Livre
            </Button>
          </div>
        </Stack>

        <Affichebooks
          books={Books}
          handleLimitChange={handleLimitChange}
          limit={limit}
          handleDeleteBook={handleDeleteBook}
          modifBook={modifBook}
          adminID={adminID}
        />

        <Pagination
          handlePrevPage={handlePrevPage}
          handleNextPage={handleNextPage}
          handlePageChange={handlePageChange}
          totalPages={totalPages}
          currentPage={currentPage}
        />
        {show && (
          <Addbook
            show={show}
            handleClose={handleClose}
            fetchProducts={fetchProducts}
            limit={limit}
          />
        )}
      </>
    </div>
  );
};
export default ListBook;
