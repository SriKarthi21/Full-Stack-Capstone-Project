import React from 'react'
import styled from 'styled-components';
import { Link } from 'react-router-dom'
import { useState } from 'react';
import UpdateTask from '../UpdateTask/UpdateTask';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/esm/Button';
import { Card, TextField, Box } from '@mui/material';
import { useForm } from 'react-hook-form';
import Modal from 'react-bootstrap/Modal';


const Error = styled.span`
  color: red;
  font-size: 0.8rem;
  margin:0;
`;

const Task = ({ data, handleUpdate, onDelete }) => {
  const [updatedTask, setUpdatedTask] = useState({
  });
  const { register, handleSubmit, formState: { errors, isValid }, trigger, reset } = useForm();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleEditClick = (oldTask) => {
    handleShow(); console.log(oldTask)
    setUpdatedTask({ ...oldTask, updatedTask }); console.log(updatedTask)
  }

  const onSubmit = (modifiedTask) => {
    // console.log(modifiedTask)
    modifiedTask.emailID = updatedTask.emailID;
    modifiedTask.taskId = updatedTask.taskId;
    // console.log(modifiedTask)
    handleUpdate(modifiedTask)
    handleClose();
    reset();
  }

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Form >
          <Modal.Header closeButton>
            <Modal.Title>Edit Task</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group
              className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Existing Task</Form.Label>
              <Form.Control className="mb-3"
                defaultValue={updatedTask?.taskName}
                name='taskName'  {...register('taskName', {
                  required: "Task Name is required",
                })}
                placeholder="Task Name"
                autoFocus onBlur={(e) => trigger('taskName')}
              />
              <Error>{errors.taskname?.message}</Error>
              <Form.Control className="mb-3"
                defaultValue={updatedTask.description}
                name='description' as="textarea" rows={3}
                placeholder="description" {...register('description', {
                  required: "Description is required"
                })}
                autoFocus onBlur={(e) => trigger('description')}
              /><p>{errors.descritption?.message}</p>
              <Form.Control className="mb-3"
                defaultValue={updatedTask?.startDate}
                name='startDate' type="date"
                placeholder="start Date" {...register('startDate', {
                  required: "Start Date is required"
                })}
                {...register('startDate')}
                autoFocus onBlur={(e) => trigger('startDate')}
              /><Error>{errors.startDate?.message}</Error>
              <Form.Control className="mb-3"
                defaultValue={updatedTask?.endDate}
                name='endDate' type="date"
                placeholder="End Date" {...register('endDate', {
                  required: "End Date is required"
                })}
                {...register('endDate')}
                autoFocus onBlur={(e) => trigger('endDate')}
              /><Error>{errors.endDate?.message}</Error>
              <Form.Select name='priority' className="mb-3"
                defaultValue={updatedTask?.priority}
                placeholder="Priority "
                {...register('priority', {
                  required: "Priority is required"
                })}
                autoFocus onBlur={(e) => trigger('priority')}
                aria-label="Default select example">
                <option defaultValue={updatedTask?.priority}>{updatedTask?.priority}</option>
                <option value="High">High</option>
                <option value="Low">Medium</option>
                <option value="Medium">Low</option>
              </Form.Select><Error>{errors.priority?.message}</Error>


            </Form.Group>

          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" disabled={!isValid} onClick={handleSubmit(onSubmit)}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
      <Card sx={{
        maxWidth: 300, maxHeight: 300, m: 2, bgcolor: "rgb(36, 218, 173)",
        borderRadius: 3, boxShadow: "5px 5px 10px rgb(210, 71, 228)"
      }} >

        <div className="card">
          <div className="card-body">
            <h5 className="card-title">{data?.taskName}</h5>
            {/* <p className="card-text">{data?.emailID}</p> */}
            <p className="card-text">{data?.description}</p>
            <p className="card-text"><small
              className="text-muted">Start Date : {data?.startDate}</small></p>
            <p className="card-text"><small className="text-muted">End Date : {data?.endDate}</small></p>
            <p className="card-text">{data?.priority}</p>
            <Button onClick={() => handleEditClick(data)}>Edit</Button>
            <Button variant="danger" type="button" className="btn btn-primary" >Delete</Button>
          </div>
        </div>
      </Card>


    </>
  )
}

export default Task