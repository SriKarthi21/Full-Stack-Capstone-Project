import React from 'react'
import styled from 'styled-components';
import { Link } from 'react-router-dom'
import { useState } from 'react';
import UpdateTask from '../UpdateTask/UpdateTask';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/esm/Button';
import { useForm } from 'react-hook-form';
import Modal from 'react-bootstrap/Modal';
import {Card,CardContent,Typography,CardActions,IconButton, TextField, Box} from "@mui/material";
import { FaEdit } from "react-icons/fa";
import AutoDeleteTwoToneIcon from '@mui/icons-material/AutoDeleteTwoTone';


const Error = styled.span`
  color: red;
  font-size: 0.8rem;
  margin:0;
`;
const priorityClass = {
  high: 'bg-red-500 text-white',
  medium: 'bg-yellow-400 text-black',
  low: 'bg-green-300 text-white',
};

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
        maxWidth: 300, m: 2, borderRadius: 3
      }} >

<div className="card" >
          <div className={`task ${data.priority}  card-body `}style={{padding:"10px",textAlign:"center"}} >
            <h5 className="card-title" style={{textTransform:"uppercase",borderBottom:"solid"}}> {data?.taskName}</h5>
            {/* <p className="card-text">{data?.emailID}</p> */}
           
            <p className="card-text font-weight-bold">Description : {data?.description}</p> 
            <div className="date ">
              <span className="date1">
                Start 
              <p className="card-text "> {data?.startDate}</p>
              </span>
              {/* <span className='date-line'></span> */}
              <span className='date2'>
                End 
              <h6 className="card-text "><small > {data?.endDate}</small></h6> 

              </span>
           </div>
           <p className="card-text font-weight-bold">Priority : {data?.priority}</p>

            <span class="container-eg-btn-3" style={{justifyContent:"space-between"}}>
            <IconButton  className="button button-1"  color="info" onClick={() => handleEditClick(data)} >
              <FaEdit />Edit
            </IconButton>
            <IconButton className="button2 button-2" color="error" onClick={() => onDelete(data.taskId)}>
              <AutoDeleteTwoToneIcon />Bin
            </IconButton>
            </span>
         
          </div>
        </div>
      </Card>


    </>
  )
}

export default Task