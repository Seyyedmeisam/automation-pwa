/* eslint-disable react/prop-types */
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import React from "react";
import { useState, useEffect } from "react";
import Tree from "./Tree";
const EditRoleModal = ({
  data, 
  roleData, 
  expandedNodes, 
  setExpandedNodes, 
  parentSelectedNode, 
  setParentSelectedNode, 
  showModal, 
  closeModal, 
  handleDelete, 
  handleUpdate,
  formData,
  setFormData,
}) => {
  useEffect(() => {
    setFormData((prevData) => ({
      title: roleData.title,
      description: roleData.description ?? "",
    }));
  }, [roleData, setFormData]);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div>
      <Modal show={showModal} onHide={closeModal} size="lg">
        <Modal.Header closeButton >
          {/* <Modal.Title >ویرایش نقش</Modal.Title> */}
        </Modal.Header>
        <Modal.Body>
        <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>عنوان</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                autoFocus
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label> توضیحات</Form.Label>
              <Form.Control 
                as="textarea" 
                name="description"
                rows={3}
                value={formData.description}
                onChange={handleChange}
                />
            </Form.Group>
          </Form>
           نقش پدر را انتخاب کنید
          <Tree
              data={data}
              expandedNodes={expandedNodes}
              setExpandedNodes={setExpandedNodes}
              selectedNode={parentSelectedNode}
              setSelectedNode={setParentSelectedNode}
          />
        </Modal.Body>
        <Modal.Footer>
        <Button variant="danger" onClick={handleDelete} className=" mt-1 d-block mx-auto">
            حذف
          </Button>
        <Button variant="success" onClick={handleUpdate} className=" mt-1 d-block mx-auto">
            تایید
          </Button>
          <Button variant="secondary" onClick={closeModal} className=" mt-1 d-block mx-auto">
            بستن
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default EditRoleModal;
