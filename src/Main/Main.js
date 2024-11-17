import React, { useEffect } from 'react'
import { Link } from "react-router-dom";
import { useForm } from 'react-hook-form';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "bootstrap-icons/font/bootstrap-icons.css";
import axios from 'axios';
import Task from './Task';
import Addtask from '../AddTask/Addtask';
import { useState } from 'react';
import { useSnackbar } from "notistack";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { Grid2 } from '@mui/material';
import Box from '@mui/material/Box';



const Main = ({ prop }) => {
  // prop contains taskId taskName startDate endDate priority
  const { enqueueSnackbar } = useSnackbar(); 
  console.log(prop)
  const token=localStorage.getItem('token');
  console.log("this is toke",token)
  const[mail,setMail]=useState(prop);
  const[data,setData]=useState([]);
  const [isEditing,setIsEditing]=useState(false);
  const{register,handleSubmit,formState:{errors,isValid},trigger,reset}=useForm();
  const[updatedTask,setUpdatedTask]=useState({})
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  useEffect(()=>{
    console.log(prop)
   async function fetchData(){
    const response=await axios.get(`http://localhost:8084/api/v1/task/email/${prop}`,
      {headers:{Authorization:`Bearer ${token}`}})
      setData(response.data)
      console.log(response)
    }fetchData();
  },[token])
  // console.log("add task",data)
  const handleAddTask=async(addTask)=>{
    try{
      const response=await axios.post("http://localhost:8084/api/v1/task/addTask",addTask,
        {headers:{Authorization:`Bearer ${token}`}})
        console.log("Task added"+response.data)
      setData([...data,response.data]);
      enqueueSnackbar("Task added successfully!", {
        variant: "success",
        autoHideDuration: 2000, 
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        }
      });
    }catch(error){
      console.error("Error not added"+error);
      enqueueSnackbar("Error adding Task!", { variant: "error" }); 
    }
  };


  const handleUpdateTask = async (updatedTask) => {
    try {
      console.log(updatedTask)
      const updatedResponse = await  axios.put(`http://localhost:8084/api/v1/task/update/${updatedTask.taskId}`, updatedTask, {
        headers: { Authorization: `Bearer ${token}` }
      });
      let updatedData=updatedResponse.data
      console.log("task Updated Success",updatedData)
      
     let newArray=data.map((task) => (task.taskId === updatedData.taskId ? updatedData : task))
     console.log("New Array",newArray);
      setData( newArray )
      console.log(data)
      enqueueSnackbar("Task updated successfully!", {
        variant: "success",
        autoHideDuration: 2000,
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        }
      });
    } catch (error) {
      console.error("Error updating Task!", error);
      enqueueSnackbar("Error updating Task!", { variant: "error" });
    }
  };

  const handleDeleteTask = async (taskId) => {
    console.log(taskId)
    try {
      const confirmed = window.confirm('Are you sure you want to delete this task?');
      if (!confirmed) return; // User cancelled
      await axios.delete(`http://localhost:8084/api/v1/task/delete/${taskId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setData(data.filter((task) => task.taskid !== taskId)); 
      enqueueSnackbar("Task deleted successfully!", {
        variant: "success",
        autoHideDuration: 2000,
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        }
      });
    } catch (error) {
      console.error("Error   deleting Task!", error);
      enqueueSnackbar("Error deleting Task!", { variant: "error" });
    }
  };
  const handleBinTask = async (taskId) => {
    console.log(taskId)
    try {
      const confirmed = window.confirm('Are you sure you want to delete this task?');
      if (!confirmed) return; // User cancelled
      const response=await axios.put(`http://localhost:8084/api/v1/task/softDelete/${taskId}`,
        {headers:{Authorization:`Bearer ${token}`}})
      console.log("soft deleted",response)
      setData(data.filter((task) => task.taskId !== taskId)); 
      console.log(data)
      enqueueSnackbar("Task moved to Bin!", {
        variant: "success",
        autoHideDuration: 2000,
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        }
      });
    } catch (error) {
      console.error("Error not moved to bin!", error);
      enqueueSnackbar("Error not moved to bin!", { variant: "error" });
    }
  };
  return (
    <div>
       <Grid2 display={'flex'} 
       justifyContent={'center'} padding={5}
    // bgcolor={'rgb(26, 118, 173)'} 
    container alignContent={'center'} minHeight={600} >
      <Addtask prop={prop} onAddTask={handleAddTask} />

      <Box sx={{ width: '100%' }}>
      <Grid2  container spacing={{ xs: 2, md: 1 }} 
        columns={{ xs: 3, sm: 8, md: 12 }}  >
          
        {data === undefined ? (
          <p>Invalid Email and Token</p>
        ) : data === null ? (
          <p>Data is Null</p>
        ) : data.length === 0 ? ( 
          <p>No Data Found</p>
        ) : (
          data.map((data) => (
            <Grid2  size={{ xs: 3, sm: 4, md: 3 }}>
              <Task key={data.taskId} data={data}
                handleUpdate={ handleUpdateTask} 
                onDelete={handleBinTask} />
          </Grid2>
            
          ))
        )}
        </Grid2>
      </Box>
      <main draggable className="container mt-4 mb-4">
      
      </main>
      </Grid2>
    </div>
  )
}

export default Main