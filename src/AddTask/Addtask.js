
import React from 'react'
import {useForm} from "react-hook-form"
import {   Grid2, TextField, Typography } from '@mui/material'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Axios from 'axios';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';


const Addtask = ({propMail,onAddTask}) => {
    const{register,handleSubmit,formState:{errors,isValid},trigger,reset}=useForm();
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
    const onSubmit=(data)=>{
      handleClose(); 
      let  addTask={...data,emailID:propMail}
        console.log("button clicked")
        onAddTask(addTask);
        reset();
      };

    return (
    <div >
 <>
      <Button variant="primary" onClick={handleShow}>
        Add Task
      </Button>

      <Modal show={show} onHide={handleClose} >
        <Modal.Header closeButton>
          <Modal.Title>Add Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={onSubmit}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>New Task</Form.Label>
              <Form.Control
                name='taskName'  {...register('taskName',{
                  required:"Task Name is required",
              })}
                placeholder="Task Name"
                autoFocus onBlur={(e)=>trigger('taskName')}
              /> 
              <p>{errors.taskname?.message}</p>
              <Form.Control
              name='description'as="textarea" rows={3}
              placeholder="description" {...register('description',{
                required:"Description is required"
            })}
              autoFocus onBlur={(e)=>trigger('description')}
            /><p>{errors.descritption?.message}</p>
            <Form.Control
              name='startDate' type="date"
              placeholder="start Date" {...register('startDate',{
                required:"Start Date is required"
            })} 
            {...register('startDate')}
              autoFocus onBlur={(e)=>trigger('startDate')}
            /><p>{errors.startDate?.message}</p>
            <Form.Control
              name='endDate' type="date"
              placeholder="End Date" {...register('endDate',{
                required:"End Date is required"
            })} 
            {...register('endDate')}
              autoFocus onBlur={(e)=>trigger('endDate')}
            /><p>{errors.endDate?.message}</p>
            <Form.Control
              name='priority'
              placeholder="Priority " {...register('priority',{
                required:"Priority is required"
            })} 
            {...register('priority')}
              autoFocus onBlur={(e)=>trigger('priority')}
            /><p>{errors.priority?.message}</p>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button  variant='secondary' type="reset" onClick={() => reset()}>
          Reset
          </Button>
          {/* <Button variant="secondary" onClick={handleClose}>Close</Button> */}
          <Button variant="primary" type='submit' onClick={handleSubmit(onSubmit)}  disabled={!isValid}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>

    </div>
  )
}

export default Addtask