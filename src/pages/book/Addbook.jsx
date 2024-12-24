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
import { fetchautors } from "../../services/Authorservice";

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);
const Addbook = ({ show, handleClose, fetchbooks, limit }) => {
  const [book, setbook] = useState({});
  const [TypeBook, setTypeBook] = useState([]);
  const [files, setFiles] = useState([]);
  const [author, setAuthor] = useState([]);
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
  const loadAuthor = async () => {
    try {
      const res = await fetchautors();

      console.log(res);
      setAuthor(res.data);
      console.log(author);
      
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    loadTypeBook();
    loadAuthor();
  }, []);
  const handleSubmit = async (event) => {
    event.preventDefault();
    setbook({...book, authorid:1});
    setbook({...book, typeid:1});
    console.log(book);
    await addBook(book);
    fetchbooks(1, limit, "");
    handleClose();
    setbook({});
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
            setbook({ ...book, image: data.url });
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
        <form className="book-form">
          <Modal.Header closeButton>
            <h2>Ajouter book</h2>
          </Modal.Header>
          <Modal.Body>
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="title">title</label>
                <input
                  type="text"
                  id="reference"
                  value={book.title}
                  onChange={(e) =>
                    setbook({ ...book, title: e.target.value })
                  }
                  className="form-input"
                  placeholder="Entrez référence book"
                />
              </div>
              <div className="form-group">
                <label htmlFor="marque">content</label>
                <input
                  type="text"
                  id="marque"
                  value={book.content}
                  onChange={(e) =>
                    setbook({ ...book, content: e.target.value })
                  }
                  className="form-input"
                  placeholder="Entrez marque"
                />
              </div>
              <div className="form-group">
                <label htmlFor="quantite">description</label>
                <input
                  type="text"
                  id="description"
                  value={book.description}
                  onChange={(e) =>
                    setbook({ ...book, description: e.target.value })
                  }
                  className="form-input"
                  placeholder="Entrez description"
                />
              </div>
              <div className="form-group">
                <label htmlFor="prix">Price</label>
                <input
                  type="number"
                  required
                  id="prix"
                  value={book.price}
                  onChange={(e) =>
                    setbook({ ...book, price: e.target.value })
                  }
                  className="form-input"
                  placeholder="Entrez Quantité stock"
                />
              </div>
              <div className="form-group">
                <label htmlFor="prix">pubdate</label>
                <input
                  type="date"
                  required
                  id="pubdate"
                  value={book.pubdate}
                  onChange={(e) =>
                    setbook({ ...book, pubdate: e.target.value })
                  }
                  className="form-input"
                  placeholder="Entrez Quantité stock"
                />
              </div>
              <div className="form-group">
                <label htmlFor="lastupdate">lastupdate</label>
                <input
                  type="date"
                  required
                  id="lastupdate"
                  value={book.lastupdate}
                  onChange={(e) =>
                    setbook({ ...book, lastupdate: e.target.value })
                  }
                  className="form-input"
                  placeholder="Entrez Quantité stock"
                />
              </div>
              <div className="form-group">
                <label htmlFor="prix">Types Book</label>
                <select
                  id="typeid"
                  className="form-control"
                  value={book.id}
                  onChange={(e) =>
                    setbook({ ...book, typeid:e.target.value })
                  }
                >
                  {Array.isArray(TypeBook) &&
                    TypeBook.map((type, index) => (
                      <option key={index} value={type.id}>
                        {type.category}
                      </option>
                    ))}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="category">Author</label>
                <select
                  id="category"
                  className="form-control"
                  value={book.authorid}
                  onChange={(e) =>
                    setbook({ ...book, authorid:e.target.value })
                  }
                >
                  {Array.isArray(author) &&
                    TypeBook.map((auth, index) => (
                      <option key={index} value={auth.authorId}>
                        {auth.name}
                      </option>
                    ))}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="prix">Image</label>
                <input
                  type="text"
                  required
                  id="image"
                  value={book.image}
                  onChange={(e) =>
                    setbook({ ...book, image: e.target.value })
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
export default Addbook;
