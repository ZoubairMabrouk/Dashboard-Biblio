import React from "react"; 

const AfficheCategory = ({ categorie, handleLimitChange,handleDeleteproduct,modifproduct, limit }) => {
  console.log(categorie);
  return (
    <div>
      <div className="table-responsive">
        <table className="table table-hover table-striped align-middle">
          <thead className="table-dark">
            <tr>
              <th scope="col">Type</th>
              <th scope="col">Description</th>
              <th scope="col">Update</th>
              <th scope="col">Delete</th>
            </tr>
          </thead>
          <tbody>
            {categorie.map((cat, index) => (
              <tr key={index}>
                <td>{cat.category}
                    
                  
                </td>
                <td>{cat.description}</td>
                <td>
                  <button className="btn btn-warning btn-sm"
                  onClick={()=>modifproduct(cat)}>
                    <i className="fa-solid fa-pen-to-square me-1"></i>Update
                  </button>
                </td>
                <td>
                  <button className="btn btn-danger btn-sm" onClick={()=>handleDeleteproduct(cat.id,cat.nom)}>
                    <i className="fa-solid fa-trash me-1"></i>Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan="5">
                <div className="d-flex justify-content-end align-items-center">
                  <label className="me-2 mb-0 fw-bold">Afficher:</label>
                  <select
                    className="form-select form-select-sm w-auto"
                    value={limit}
                    onChange={handleLimitChange}
                  >
                    <option value={2}>2</option>
                    <option value={4}>4</option>
                    <option value={8}>8</option>
                    <option value={16}>16</option>
                  </select>
                </div>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

export default AfficheCategory;
