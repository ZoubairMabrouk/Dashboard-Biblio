import React, { useState } from "react";
import { Modal, Button, Table, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { editBook } from "../../services/Bookservice";
import { editSUBTYPE } from "../../services/TypesSubservice";

const AffSub = ({
  subs,
  handleLimitChange,
  limit,
  handleDeletesub
}) => {
  const [show, setShow] = useState(false);
  const [currentsub, setCurrentsub] = useState({});

  const handleShow = (sub) => {
    setShow(true);
    setCurrentsub(sub);
  };

  const handleClose = () => {
    setShow(false);
  };
const  handleEdit = (currentsub) => {
    handleShow();
    setCurrentsub(currentsub);
    
  };

  return (
    <div className="table-responsive">
      <Table className="table table-hover table-striped align-middle">
        <thead className="table-dark">
          <tr>
            <th>Name</th>
            <th>Désignation</th>
            <th>Price</th> 
            <th>Modifier</th>
            <th>Supprimer</th>
          </tr>
        </thead>
        <tbody>
          {subs.map((prod, index) => (
            <tr key={index}>
             
              <td>{prod.name}</td>
              <td>{prod.designation}</td>
              <td>{prod.price}</td>
              <td>
                  <Button variant="warning" onClick={() => handleEdit(prod)}>
                    <i className="fa-solid fa-pen-to-square"></i> Update
                  </Button>
                
              </td>
              <td>
                <Button
                  variant="danger"
                  onClick={() => handleDeletesub(prod.id, prod.reference)}
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
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                value={currentsub.name || ""}
                disabled
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>description</Form.Label>
              <Form.Control
                type="text"
                value={currentsub.description || ""}
                onChange={(e) =>
                  setCurrentsub({
                    ...currentsub,
                    description: e.target.value,
                  })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                value={currentsub.price || ""}
                onChange={(e) =>
                  setCurrentsub({
                    ...currentsub,
                    price: e.target.value,
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
              editSUBTYPE(currentsub);
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

export default AffSub;
