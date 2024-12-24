import React from "react";

const Pagination = ({
  handlePrevPage,
  handleNextPage,
  handlePageChange,
  totalPages,
  currentPage,
}) => {
  return (
    <div className="d-flex justify-content-center align-items-center mt-3">
      <button
        className="btn btn-primary me-2"
        onClick={()=>handlePrevPage()}
        disabled={currentPage === 1}
      >
        Previous
      </button>

      {Array.from({ length: totalPages }, (_, index) => (
        <button
          key={index}
          onClick={() => handlePageChange(index + 1)}
          className={`btn me-1 ${
            currentPage === index + 1 ? "btn-secondary" : "btn-outline-primary"
          }`}
        >
          {index + 1}
        </button>
      ))}

      <button
        className="btn btn-primary ms-2"
        onClick={handleNextPage}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
