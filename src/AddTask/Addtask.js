import styled from 'styled-components';
import React from 'react'
import { useForm } from "react-hook-form"
import { Grid2, TextField, Typography } from '@mui/material'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Axios from 'axios';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from 'react-router-dom';
const Error = styled.span`
  color: red;
  font-size: 0.8rem;
  margin:0;
`;

const Buttons=styled.span`
    padding: '10px 20px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
`;
const Addtask = ({  onAddTask }) => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors, isValid }, trigger, reset } = useForm();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const onSubmit = (data) => {
    handleClose();
    onAddTask(data);
    reset();
  };



  return (
    <div >
      <>
       
       
      <p class="button button-1" onClick={handleShow}>
          Add Task
        </p>


        {/* <Button variant="secondary" onClick={handleShow}>
          Recycle bin
        </Button> */}
        
        <Modal show={show} onHide={handleClose}  >
          <Modal.Header closeButton>
            <Modal.Title>Add Task</Modal.Title>
            {/* <Modal.Title>Recycle Bin</Modal.Title> */}
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={onSubmit}>
              <Form.Group className="mb-3" style={{}}
                controlId="exampleForm.ControlInput1">
                <Form.Label>New Task</Form.Label>
                <Form.Control className="mb-3"
                  name='taskName'  {...register('taskName', {
                    required: "Task Name is required",
                  })}
                  placeholder="Task Name"
                  autoFocus onBlur={(e) => trigger('taskName')}
                />
                <Error>{errors.taskname?.message}</Error>
                <Form.Control className="mb-3"
                  name='description' as="textarea" rows={3}
                  placeholder="description" {...register('description', {
                    required: "Description is required"
                  })}
                  autoFocus onBlur={(e) => trigger('description')}
                /><Error>{errors.descritption?.message}</Error>
                <Form.Control className="mb-3"
                defaultValue={new Date().toISOString().slice(0, 10)}
                  name='startDate' type="date"
                  
                  placeholder="start Date" {...register('startDate', {
                    required: "Start Date is required"
                  })}
                  {...register('startDate')}
                  autoFocus onBlur={(e) => trigger('startDate')}
                /><Error>{errors.startDate?.message}</Error>
                <Form.Control className="mb-3"
                defaultValue={new Date().toISOString().slice(0, 10)}
                  name='endDate' type="date"
                  placeholder="End Date" {...register('endDate', {
                    required: "End Date is required"
                  })}
                  {...register('endDate')}
                  autoFocus onBlur={(e) => trigger('endDate')}
                /><Error>{errors.endDate?.message}</Error>
                <Form.Select name='priority' className="mb-3"
                  placeholder="Priority "
                  {...register('priority', {
                    required: "Priority is required"
                  })}
                  autoFocus onBlur={(e) => trigger('priority')}
                  aria-label="Default select example">
                  <option>--Select Options--</option>
                  <option value="High">High</option>+
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </Form.Select><Error>{errors.priority?.message}</Error>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant='secondary' type="reset" onClick={() => reset()}>
              Reset
            </Button>
            {/* <Button variant="secondary" onClick={handleClose}>Close</Button> */}
            <Button variant="primary" type='submit' onClick={handleSubmit(onSubmit)} disabled={!isValid}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
       
       
        
      </>

    </div>
  )
}

export default Addtask