import React, { useEffect } from 'react'
import axios from 'axios'
import { useState } from 'react'
import { get } from 'react-hook-form';
import styled from 'styled-components'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Grid2 } from '@mui/material';
import { AddTask } from '@mui/icons-material';
import Addtask from '../AddTask/Addtask';
import Main from '../Main/Main'
import { useSnackbar } from "notistack";
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

const Bin = ({prop}) => {
    const [emailID, setEmailID] = useState(prop)
    const [tasks, setTasks] = useState([]);
    const [restoreTask,setRestoreTask]=useState([]);
    let token = localStorage.getItem('token')
    const { enqueueSnackbar } = useSnackbar(); 
    useEffect( () => {
        async function fetchDeletedTask(){
        const response = axios.get(`http://localhost:8085/api/v1/task/getAllDeletedTask/balajimadhavan95@gmail.com`,
        //const response = axios.get(`http://localhost:8085/api/v1/task/getAllDeletedTask/${emailID}`,
             {
            headers: {
                 Authorization: `Bearer ${token}` 
                }
        }
    )
        setTasks(response.data);
        // this mehtod return isDeleted=true cards 
        console.log(response.data);}
         fetchDeletedTask();
    }, [tasks]);

    const navigate=useNavigate();
    const navigateToUser=()=>{
        navigate("/user")
    }
    
    const restore=async (taskId) => {
        console.log({taskId});
        
        const response = await axios.get(`http://localhost:8085/api/v1/task/restore/${taskId}`, {
            headers: { Authorization: `Bearer ${token}` }
        })
        
        const results=(tasks.filter((task) => task.taskId !== taskId));
        console.log(results);
        setTasks(results);
        
        console.log(tasks);
        // console.log(response)
        // console.log(response.data)
        // setRestoreTask(response.data); 
        // this mehtod passing id should not be in the bincomponent response array
    }
    
    // <Main restore={restoreTask}></Main>
    
    const frommainmovetobin = async (taskId) => {
        const response = await axios.post(`http://localhost:8085/api/v1/task/softDelete/${taskId}`, {
            headers: { Authorization: `Bearer ${token}` }
        });
    }
   useEffect(()=>{
    let emailID='balaji@gmail.com'
    async function fetchDeletedTask(){
    
        const response =await axios.get(`http://localhost:8085/api/v1/task/getAllDeletedTask/${emailID}`,
              {headers: {   Authorization: `Bearer ${token}`   }
         }
     )
         setTasks(response.data);
         // this mehtod return isDeleted=true cards 
         console.log(response);
         console.log(response.data);
      
        }
       if(emailID)
        {
            fetchDeletedTask()
        }
        
   },[emailID])

   const handleDeleteTask = async (taskId) => {
    console.log(taskId)
    try {
      const confirmed = window.confirm('Are you sure you want to delete this task?');
      if (!confirmed) return; // User cancelled
      await axios.delete(`http://localhost:8085/api/v1/task/delete/${taskId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTasks(tasks.filter((task) => tasks.taskId !== taskId)); 
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

        // main component have bin button that should navigate to bin component
        // bin component useeffect should getsoftdeleted(URL)  array should be displayed in card 
        // card having two button restore and deleted
        // if restore cllicked it should displayed in main component
        // if deleted clicked it should delete from the array and don't show in bin component
        <div>
            {/* <button onClick={fetchDeletedTask}>get delete</button> */}
            <div style={{display:"flex"}}>
            
                    {tasks === undefined ? (
                        <p>Invalid Email and Token</p>
                      ) : tasks === null ? (
                        <p>Data is Null</p>
                      ) : tasks.length === 0 ? ( 
                        <p>No Data Found</p>
                      ) :
               ( tasks.map((val) => (
                    
                    <Grid2  size={{ xs: 3, sm: 4, md: 3 }}>
                    <div style={{display:"flex",flexDirection:"column",
                        justifyContent:"center",alignItems:"center",textAlign: "center",
                        border:"3px solid green",backgroundColor: "lightgreen", borderRadius:"20px"
                        ,margin:"10px"
                    }}>
                        <p>Task Id:{val.taskId}</p>
                        <p>Desription:{val.description}</p>
                        <p>EmailID:{val.emailID}</p>
                        <p>Start Date:{val.startDate}</p>
                        <p>End Date:{val.endDate}</p>
                        <p>Priority:{val.priority}</p>
                   
                   <button onClick={()=>restore(val.taskId)}>Click restore</button>

                    </div>
                    

                   </Grid2>
                    
                   ))

    )} 
</div>   
            <button onClick={restore}>Restjorejj</button>
            <p>Bin component</p>
<button onClick={handleDeleteTask}>Click to delete</button><br/>

<Button variant="primary" onClick={navigateToUser}>Go to User</Button>
        </div>
    )
}

export default Bin;