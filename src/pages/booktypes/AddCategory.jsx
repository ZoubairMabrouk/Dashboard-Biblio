import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { FilePond, registerPlugin } from "react-filepond";
import axios from "axios";
import "filepond/dist/filepond.min.css";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import { addtypesBook } from "../../services/Typebokkservice";
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);
const AddCategory = ({ show, handleClose, fetchCategories, limit }) => {
  const [typebook, setTypebook] = useState({});
  const [files, setFiles] = useState([]);
 
  const handleSubmit = async (event) => {
    event.preventDefault();
    
    await addtypesBook(typebook);
    fetchCategories(1, limit);
    handleClose();
    setTypebook({});
  };
  const serverOptions = () => {
    console.log("server pond");
    return {
      process: (fieldName, file, metadata, load, error, progress, abort) => {
        console.log(file);
        const data = new FormData();
        data.append("file", file);
        data.append("upload_preset", "ecommerce");
        data.append("cloud_name", "dxjip85ip");
        data.append("publicid", file.name);
        axios
          .post("https://api.cloudinary.com/v1_1/dxjip85ip/image/upload", data)
          .then((response) => response.data)
          .then((data) => {
            console.log(data);
            setTypebook({ ...typebook, image: data.url });
            load(data);
          })
          .catch((error) => {
            console.error("Error uploading file:", error);
            error("Upload failed");
            abort();
          });
      },
    };
  };

  return (
    <div className="form-container">
      <Modal show={show} onHide={handleClose}>
        <form className="category-form">
          <Modal.Header closeButton>
            <h2>ADD CATEGORY</h2>
          </Modal.Header>
          <Modal.Body>
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="title">Name</label>
                <input
                  type="text"
                  id="reference"
                  value={typebook.category}
                  onChange={(e) =>
                    setTypebook({ ...typebook, category: e.target.value })
                  }
                  className="form-input"
                  placeholder="Entrez référence product"
                />
              </div>
              <div className="form-group">
                <label htmlFor="title">Designation</label>
                <input
                  type="text"
                  id="reference"
                  value={typebook.desc}
                  onChange={(e) =>
                    setTypebook({ ...typebook, desc: e.target.value })
                  }
                  className="form-input"
                  placeholder="Entrez référence product"
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
export default AddCategory;
