import React, { useEffect, useState } from "react";

import AfficheCategory from "./AffichCategory";
import Pagination from "../../components/Pagination";
import AddCategory from "./AddCategory";
import { Button, Stack } from "react-bootstrap";
import { confirmAlert } from "react-confirm-alert";
import { deletetypesBook, edittypesBook, fetchtypesBook } from "../../services/Typebokkservice";

const ListCategory = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [categorie, setCategorie] = useState([]);
  const [limit, setLimit] = useState(2);
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false); // Track loading state
  const [error, setError] = useState(null); // Track errors

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const fetchCategories = async () => {
    setLoading(true);
    setError(null); // Reset any previous errors
    try {
      const res = await fetchtypesBook();
      // Assuming response structure is: res.data.categories and res.data.totalPages
      setCategorie(res.data || []); 
      console.log(res.data.categories); // Ensure total pages exists
    } catch (error) {
      setError("Failed to load categories."); // Set error message
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
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
    setCurrentPage(1);};
  const handleDeleteproduct = async (id, ref) => {
    
    confirmAlert({
      title: "Confirm delete...",
      message: " supprimer l' article: " + ref,
      buttons: [
        {
          label: "Oui",
          onClick: () =>
            deletetypesBook(id)
              .then((res) => fetchCategories(currentPage, limit, ""))
              .catch((error) => console.log(error)),
        },
        {
          label: "Non",
        },
      ],
    });
  };
  const modifproduct = async (category) => {
    setCategorie(
      categorie.map((cat) => (cat.id === category.id ? category : cat))
    );
    await edittypesBook(category);
  };
  return (
    <div className="fullscreen-container">
      {loading ? (
        <p>Loading...</p> // Show loading text
      ) : error ? (
        <p>{error}</p> // Show error if fetching fails
      ) : (
        <>
        <Stack direction="horizontal" gap={1}>
          
          <div className="p-2 ms-auto">
            <Button variant="success" onClick={handleShow}>
              <i className="fa-solid fa-plus-square me-1"></i>
              Add CATEGORY
            </Button>
          </div>
        </Stack>
          <AfficheCategory
            categorie={categorie}
            handleDeleteproduct={handleDeleteproduct}
            modifproduct={modifproduct}
            handleLimitChange={handleLimitChange}
            limit={limit}
          />
          <Pagination
            handlePrevPage={handlePrevPage}
            handleNextPage={handleNextPage}
            handlePageChange={handlePageChange}
            totalPages={totalPages}
            currentPage={currentPage}
          />
          {show && (
            <AddCategory
              show={show}
              handleClose={handleClose}
              fetchCategories={fetchCategories}
              limit={limit}
            />
          )}
        </>
      )}
    </div>
  );
};

export default ListCategory;
