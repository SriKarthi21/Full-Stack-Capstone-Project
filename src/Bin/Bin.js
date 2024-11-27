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
import { Card, Box } from '@mui/material';
const Bin = ({prop}) => {
    const [emailID, setEmailID] = useState(prop)
    const [tasks, setTasks] = useState([]);
    const [restoreTask,setRestoreTask]=useState([]);
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
    const navigateToUser=()=>{
        navigate("/user")
    }
    
    const restore=async (taskId) => {
        // console.log({taskId});
        const response = await axios.get(`http://localhost:8085/api/v1/task/restore/${taskId}`, {
            headers: { Authorization: `Bearer ${token}` }
        })
        const results=(tasks.filter((task) => task.taskId !== taskId));
        // console.log(results);
        setTasks(results);
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
          horizontal: "right",
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
          <button class="button button-1"  onClick={navigateToUser}>Dashboard</button>

          </span>
            <div style={{display:"flex"}}>
            <Box sx={{ width: '100%' }} >
            <h3>Task will be deleted after 3 days</h3>
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
        maxWidth: 300, maxHeight: 300, m: 2, bgcolor: "rgb(36, 218, 173)",
        borderRadius: 3
      }} > 
        <div className="card">
          <div className={`task ${task.priority}  card-body`} >
            <h5 className="card-title">{task.taskName}</h5>
            <p className="card-text">Description : {task.description}</p>
            <p className="card-text"><small>Start Date:{task.startDate} </small></p>
            <h6 className="card-text"style={{}} >End Date : {task.endDate}</h6>
            <p className="card-text">{task?.priority}</p>
            <span class="container-eg-btn-3" style={{justifyContent:"space-between",fontSize:"5px"}}
            >

            <button  className="button button-1"
            onClick={() => restore(task.taskId)}>
              Restore</button>
            <button  className="button2 button-2" onClick={()=>handleDeleteTask(task.taskId)} >Delete</button>
          </span>
          
                  </div>
        </div>
      </Card>
            </Grid2>  
            
))
    )} </Grid2>
            </Box>
       
</div>  
 {/* </Grid2> */}
        </Grid2>
    )
}

export default Bin;