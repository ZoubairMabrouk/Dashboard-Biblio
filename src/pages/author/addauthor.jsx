import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { FilePond, registerPlugin } from "react-filepond";
import axios from "axios";
import "filepond/dist/filepond.min.css";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import { addautors } from "../../services/Authorservice";

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);
const Addauthor = ({ show, handleClose, fetchauthors, limit }) => {
  const [author, setauthor] = useState({});
  const [files, setFiles] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(author);
    await addautors(author);
    fetchauthors();
    handleClose();
    setauthor({});
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
            setauthor({ ...author, image: data.url });
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
        <form className="author-form">
          <Modal.Header closeButton>
            <h2>ADD AN AUTHOR</h2>
          </Modal.Header>
          <Modal.Body>
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="title">Name</label>
                <input
                  type="text"
                  id="title"
                  value={author.name}
                  onChange={(e) =>
                    setauthor({ ...author, name: e.target.value })
                  }
                  className="form-input"
                  placeholder="Entrez nom d'author"
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">CARRIER</label>
                <input
                  type="text"
                  id="designation"
                  value={author.bio}
                  onChange={(e) =>
                    setauthor({ ...author, bio: e.target.value })
                  }
                  className="form-input"
                  placeholder="Entrez le bio author"
                />
              </div>
              <div className="form-group">
                <label htmlFor="prix">Image</label>
                <input
                  type="text"
                  required
                  id="image"
                  value={author.image}
                  onChange={(e) =>
                    setauthor({ ...author, image: e.target.value })
                  }
                  className="form-input"
                  placeholder="Image"
                />
              </div>
              <div className="form-group">
                <label htmlFor="prix">Image</label>
                <div style={{ width: "80%", margin: "auto", padding: "1%" }}>
                  <FilePond
                    files={files}
                    acceptedFileTypes="image/*"
                    onupdatefiles={setFiles}
                    allowMultiple={true}
                    server={serverOptions()}
                    name="file"
                  />
                </div>
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
export default Addauthor;
