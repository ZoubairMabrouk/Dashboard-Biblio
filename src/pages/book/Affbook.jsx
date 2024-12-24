import React, { useState } from "react";
import { Modal, Button, Table, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { editBook } from "../../services/Bookservice";

const Affichebooks = ({
  books,
  handleLimitChange,
  limit,
  handleDeletebook,
  modifbook,
}) => {
  const [show, setShow] = useState(false);
  const [currentbook, setCurrentbook] = useState({});

  const handleShow = (book) => {
    setShow(true);
    setCurrentbook(book);
  };

  const handleClose = () => {
    setShow(false);
  };
const  handleEdit = (currentbook) => {
    handleShow();
    setCurrentbook(currentbook);
    
  };

  return (
    <div className="table-responsive">
      <Table className="table table-hover table-striped align-middle">
        <thead className="table-dark">
          <tr>
            <th>Image</th>
            <th>title</th>
            <th>Désignation</th>
            <th>Type</th>
            <th>Price</th> 
            <th>LastUpadate</th>
            <th>Modifier</th>
            <th>Supprimer</th>
          </tr>
        </thead>
        <tbody>
          {books.map((prod, index) => (
            <tr key={index}>
              <td>
                <img
                  src={prod.image}
                  alt="book"
                  style={{ width: "80px", height: "80px" }}
                />
              </td>
              <td>{prod.title}</td>
              <td>{prod.description}</td>
              <td>{prod.typeId}</td>
              <td>{prod.price}</td>
              <td>{prod.lastUpdate}</td>
              <td>
                  <Button variant="warning" onClick={() => handleEdit(prod)}>
                    <i className="fa-solid fa-pen-to-square"></i> Update
                  </Button>
                
              </td>
              <td>
                <Button
                  variant="danger"
                  onClick={() => handleDeletebook(prod.id, prod.reference)}
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
              <Form.Label>Référence</Form.Label>
              <Form.Control
                type="text"
                value={currentbook.reference || ""}
                disabled
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Désignation</Form.Label>
              <Form.Control
                type="text"
                value={currentbook.designation || ""}
                onChange={(e) =>
                  setCurrentbook({
                    ...currentbook,
                    designation: e.target.value,
                  })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Marque</Form.Label>
              <Form.Control
                type="text"
                value={currentbook.marque || ""}
                onChange={(e) =>
                  setCurrentbook({
                    ...currentbook,
                    marque: e.target.value,
                  })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Quantité</Form.Label>
              <Form.Control
                type="number"
                value={currentbook.qtestock || ""}
                onChange={(e) =>
                  setCurrentbook({
                    ...currentbook,
                    qtestock: e.target.value,
                  })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Prix</Form.Label>
              <Form.Control
                type="number"
                value={currentbook.prix || ""}
                onChange={(e) =>
                  setCurrentbook({
                    ...currentbook,
                    prix: e.target.value,
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
              editBook(currentbook);
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

export default Affichebooks;
