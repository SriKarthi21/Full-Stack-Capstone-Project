import React, { useEffect } from 'react'
import axios from 'axios'
import { useState } from 'react'
import styled from 'styled-components'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Grid2 } from '@mui/material';
import Main from '../Main/Main'
import { useSnackbar } from "notistack";
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { Card, Box ,IconButton} from '@mui/material';
import RestoreIcon from '@mui/icons-material/Restore';
import DeleteIcon from "@mui/icons-material/Delete";
import { Link } from 'react-router-dom';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import DeleteOutlineTwoToneIcon from '@mui/icons-material/DeleteOutlineTwoTone';

const Bin = ({prop}) => {
    const [emailID, setEmailID] = useState(prop)
    const [tasks, setTasks] = useState([]);
    let token = localStorage.getItem('token')
    const { enqueueSnackbar } = useSnackbar(); 
    useEffect( () => {
        async function fetchDeletedTask(){
          console.log(emailID)
        const response =await axios.get(`http://localhost:8085/api/v1/task/getAllDeletedTask/${emailID}`,
             { headers: {   Authorization: `Bearer ${token}` } })
        setTasks(response.data); 
        // console.log(response);console.log(response.data);
      }
   fetchDeletedTask();
    }, [emailID]);

    const navigate=useNavigate();
    
    
    const restore=async (taskId) => {
        // console.log({taskId});
        const response = await axios.get(`http://localhost:8085/api/v1/task/restore/${taskId}`, {
            headers: { Authorization: `Bearer ${token}` }
        })
        const results=(tasks.filter((task) => task.taskId !== taskId));
        // console.log(results);
        setTasks(results);
        enqueueSnackbar("Task Restored!", {
          variant: "success",
          autoHideDuration: 3000,
          anchorOrigin: {
            vertical: "top",
            horizontal: "center",
          }
        });
    }

   const handleDeleteTask = async (taskId) => {
    console.log(taskId)
    try {
      const confirmed = window.confirm('Are you sure you want to delete this task?');
      if (!confirmed) return; // User cancelled
      await axios.delete(`http://localhost:8085/api/v1/task/delete/${taskId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTasks(tasks.filter((task) => task.taskId !== taskId)); 
      enqueueSnackbar("Task deleted successfully!", {
        variant: "success",
        autoHideDuration: 2000,
        anchorOrigin: {
          vertical: "top",
          horizontal: "center",
        }
      });
    } catch (error) {
      console.error("Error   deleting Task!", error);
      enqueueSnackbar("Error deleting Task!", { variant: "error" });
    }
  };
    return (
        <Grid2 minHeight={600} >
          <span class="container-eg-btn-3" >
          <Link to="/user"class="button button-1" >Dashboard</Link>

          </span>
          <Box sx={{ width: '100%'}} >
            <h3 style={{textAlign:'center'}}>Task will be permanently deleted after 3 days</h3>
            <Grid2  container spacing={{ xs: 2, md: 1 }} 
        columns={{ xs: 3, sm: 8, md: 12 }}  >
                       {tasks === undefined ? (
                        <p>Invalid Email and Token</p>
                      ) : tasks === null ? (
                        <p>Data is Null</p>
                      ) : tasks.length === 0 ? ( 
                        <p>No Data Found</p>
                      ) :
               ( tasks.map((task) => (
                <Grid2  size={{ xs: 3, sm: 4, md: 3 }}>
                  <Card sx={{
        maxWidth: 300,  m: 2, bgcolor: "rgb(36, 218, 173)",
        borderRadius: 3
      }} > 
        <div className="card">
        <div className={`task ${task.priority}  card-body`} style={{padding:"10px",textAlign:"center"}}>
        <h5 className="card-title">{task.taskName}</h5>
            <p className="card-text">Description : {task.description}</p>
            <div className="date ">
              <span className="date1">
                Start 
              <p className="card-text "> {task?.startDate}</p>
              </span>
              {/* <span className='date-line'></span> */}
              <span className='date2'>
                End 
              <h6 className="card-text "><small > {task?.endDate}</small></h6> 

              </span>
           </div>
           <p className="card-text">Priority : {task?.priority}</p>
            <span class="container-eg-btn-3" style={{justifyContent:"space-between"}}
            >
            <IconButton className="button button-1" color="info" onClick={() => restore(task.taskId)} >
              <RestoreIcon />Reset
            </IconButton>
            <IconButton className="button2 button-2" color="error"  onClick={()=>handleDeleteTask(task.taskId)} >
              <DeleteIcon />Delete
            </IconButton></span>
          
                  </div>
        </div>
      </Card>
            </Grid2>  
            
))
    )} </Grid2>
            </Box>
       
        </Grid2>
    )
}

export default Bin;