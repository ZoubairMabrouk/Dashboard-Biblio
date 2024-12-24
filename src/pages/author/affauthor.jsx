import React, { useState } from "react";
import { Modal, Button, Table, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { editautors } from "../../services/Authorservice";
import { Update } from "@mui/icons-material";

const Afficheauthors = ({
  authors,
  handleLimitChange,
  limit,
  handleDeleteauth,
}) => {
  const [show, setShow] = useState(false);
  const [currentauthor, setCurrentauthor] = useState({});

  const handleShow = (author) => {
    setShow(true);
    setCurrentauthor(author);
  };

  const handleClose = () => {
    setShow(false);
  };
const  handleEdit = (currentauthor) => {
    handleShow();
    setCurrentauthor(currentauthor);
    
  };

  return (
    <div className="table-responsive">
      <Table className="table table-hover table-striped align-middle">
        <thead className="table-dark">
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>bio</th>
            <th>Modifier</th>
            <th>Supprimer</th>
          </tr>
        </thead>
        <tbody>
          {authors.map((auth, index) => (
            <tr key={index}>
              <td>
                <img
                  src={auth.image}
                  alt="author"
                  style={{ width: "80px", height: "80px" }}
                />
              </td>
              <td>{auth.name}</td>
              <td>{auth.bio}</td>
              <td>
                  <Button variant="warning" onClick={() => handleEdit(auth)}>
                    <i className="fa-solid fa-pen-to-square"></i> Update
                  </Button>
                
              </td>
              <td>
                <Button
                  variant="danger"
                  onClick={() => handleDeleteauth(auth.authorId, auth.name)}
                >
                  <i className="fa-solid fa-trash"></i> Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="8" className="text-center">
              <Form.Group className="d-inline-flex align-items-center">
                <Form.Label className="me-2">Afficher</Form.Label>
                <Form.Select
                  value={limit}
                  onChange={handleLimitChange}
                  style={{ width: "auto" }}
                >
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={20}>20</option>
                  <option value={100}>100</option>
                </Form.Select>
              </Form.Group>
            </td>
          </tr>
        </tfoot>
      </Table>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modifier l'article</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="text"
                value={currentauthor.image || ""}
                disabled
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                value={currentauthor.name || ""}
                onChange={(e) =>
                  setCurrentauthor({
                    ...currentauthor,
                    name: e.target.value,
                  })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>bio</Form.Label>
              <Form.Control
                type="text"
                value={currentauthor.bio || ""}
                onChange={(e) =>
                  setCurrentauthor({
                    ...currentauthor,
                    bio: e.target.value,
                  })
                }
              />
            </Form.Group>
          
            
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Annuler
          </Button>
          <Button
            variant="success"
            onClick={() => {
              editautors(currentauthor);
              handleClose();
            }}
          >
            Enregistrer
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Afficheauthors;
