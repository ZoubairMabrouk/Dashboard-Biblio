import React, { useEffect, useState } from "react";

import Pagination from "../../components/Pagination";

import { Button, Stack } from "react-bootstrap";
import { confirmAlert } from "react-confirm-alert";
import AffSub from "./AffSub";
import AddSub from "./AddSub";
import { deleteSubscribe, editSubscribe, fetchSubscribes } from "../../services/Subscribeservice";
import { deleteSUBTYPE, fetchSUBTYPE } from "../../services/TypesSubservice";

const ListSub = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [sub, setSub] = useState([]);
  const [limit, setLimit] = useState(2);
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false); // Track loading state
  const [error, setError] = useState(null); // Track errors

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const fetchCategories = async (page, limit) => {
    setLoading(true);
    setError(null); // Reset any previous errors
    try {
      const res = await fetchSUBTYPE();
      // Assuming response structure is: res.data.subs and res.data.totalPages
      setSub(res.data); // Ensure the subs data exists
      console.log(res.data); // Ensure total pages exists
    } catch (error) {
      setError("Failed to load subs."); // Set error message
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
            deleteSUBTYPE(id)
              .then((res) => fetchCategories(currentPage, limit, ""))
              .catch((error) => console.log(error)),
        },
        {
          label: "Non",
        },
      ],
    });
  };
  const modifproduct = async (subs) => {
    setSub(
      sub.map((cat) => (cat.id === subs.id ? subs : cat))
    );
    await editSubscribe(subs);
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
          <AffSub
            subs={sub}
            handleDeletesub={handleDeleteproduct}
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
            <AddSub
              show={show}
              handleClose={handleClose}
              fetchSubs={fetchCategories}
              limit={limit}
            />
          )}
        </>
      )}
    </div>
  );
};

export default ListSub;
