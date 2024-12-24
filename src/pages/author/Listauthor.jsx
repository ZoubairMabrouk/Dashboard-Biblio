import React, { useEffect, useState } from "react";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

import { Button, Container, Stack } from "react-bootstrap";

import Pagination from "../../components/Pagination";
import { deleteautors, editautors, fetchautors } from "../../services/Authorservice";
import Afficheauthors from "./affauthor";
import Addauthor from "./addauthor";


const Listauth = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [authors, setauthor] = useState([]);
  const [limit, setLimit] = useState(5);
  const [filtre, setFiltre] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [adminID, setAdminID] = useState(null);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const fetchauthors = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetchautors();
      setauthor(res.data);
      console.log(authors); 
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchauthors();
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
  const handleDeleteauth = async (id, ref) => {
    confirmAlert({
      title: "Confirm delete...",
      message: " supprimer l' article: " + ref,
      buttons: [
        {
          label: "Oui",
          onClick: () =>
            deleteautors(id)
              .then((res) => fetchautors())
              .catch((error) => console.log(error)),
        },
        {
          label: "Non",
        },
      ],
    });
  };
  const modifauth = async (prodmod) => {
    setauthor(
      authors.map((prod) => (prod.id === prodmod.id ? prodmod : prod))
    );
    await editautors(prodmod);
  };

  return (
    <div>
      <>
        <Stack direction="horizontal" gap={1}>
          
          <div className="p-2 ms-auto">
            <Button variant="success" onClick={handleShow}>
              <i className="fa-solid fa-plus-square me-1"></i>
              Ajouter un Produit
            </Button>
          </div>
        </Stack>

        <Afficheauthors
          authors={authors}
          handleLimitChange={handleLimitChange}
          limit={limit}
          handleDeleteauth={handleDeleteauth}
        />

        <Pagination
          handlePrevPage={handlePrevPage}
          handleNextPage={handleNextPage}
          handlePageChange={handlePageChange}
          totalPages={totalPages}
          currentPage={currentPage}
        />
        {show && (
          <Addauthor
            show={show}
            handleClose={handleClose}
            fetchauthors={fetchauthors}
            limit={limit}
          />
        )}
      </>
    </div>
  );
};
export default Listauth;
