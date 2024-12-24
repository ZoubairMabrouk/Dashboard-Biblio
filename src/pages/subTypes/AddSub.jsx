import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { FilePond, registerPlugin } from "react-filepond";
import axios from "axios";
import "filepond/dist/filepond.min.css";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import { addBook } from "../../services/Bookservice";
import { fetchtypesBook } from "../../services/Typebokkservice";
import { addSUBTYPE } from "../../services/TypesSubservice";

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);
const AddSub = ({ show, handleClose, fetchSubs, limit }) => {
  const [Sub, setSub] = useState({});
  const [TypeBook, setTypeBook] = useState([]);
  const [files, setFiles] = useState([]);
  const loadTypeBook = async () => {
    try {
      const res = await fetchtypesBook();

      console.log(res);
      setTypeBook(res.data);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    loadTypeBook();
  }, []);
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(Sub);
    await addSUBTYPE(Sub);
    fetchSubs();
    handleClose();
    setSub({});
  };

  return (
    <div className="form-container">
      <Modal show={show} onHide={handleClose}>
        <form className="Sub-form">
          <Modal.Header closeButton>
            <h2>Ajouter Sub</h2>
          </Modal.Header>
          <Modal.Body>
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="title">Name</label>
                <input
                  type="text"
                  id="reference"
                  value={Sub.name}
                  onChange={(e) => setSub({ ...Sub, name: e.target.value })}
                  className="form-input"
                  placeholder="Entrez référence Sub"
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Désignation</label>
                <input
                  type="text"
                  id="description"
                  value={Sub.description}
                  onChange={(e) =>
                    setSub({ ...Sub, description: e.target.value })
                  }
                  className="form-input"
                  placeholder="Entrez la désignation produit"
                />
              </div>

              <div className="form-group">
                <label htmlFor="prix">Price</label>
                <input
                  type="number"
                  required
                  id="prix"
                  value={Sub.price}
                  onChange={(e) => setSub({ ...Sub, price: e.target.value })}
                  className="form-input"
                  placeholder="Entrez Quantité stock"
                />
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <button
              type="button"
              className="form-submit-button"
              onClick={(e) => handleSubmit(e)}
            >
              Enregistrer
            </button>
            <button
              type="reset"
              className="form-reset-button"
              onClick={() => handleClose()}
            >
              Annuler
            </button>
          </Modal.Footer>
        </form>
      </Modal>
    </div>
  );
};
export default AddSub;
