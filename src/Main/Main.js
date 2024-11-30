
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
// import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import CardMedia from '@mui/material';
import { Card, CardContent, Typography, CardActions, IconButton, TextField, Box } from "@mui/material";
import { FaEdit } from "react-icons/fa";
import AutoDeleteTwoToneIcon from '@mui/icons-material/AutoDeleteTwoTone';
import RecyclingIcon from '@mui/icons-material/Recycling';
const Main = ({ prop }) => {
  // prop contains taskId taskName startDate endDate priority
  const { enqueueSnackbar } = useSnackbar();
  // console.log(prop)
  const token = localStorage.getItem('token');
  // console.log("token is",token)
  const [mail, setMail] = useState(prop);
  const [data, setData] = useState([]);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [priorityFilter, setPriorityFilter] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [priority, setPriority] = useState("");

  const handleFilter = (value) => {
    let filtered;
    console.log(value);

    if (value) {
      filtered = data.filter((task) => task.priority === value);
      console.log(filtered);
      setPriorityFilter(filtered)

    }


  };

  const handleDateFilter = () => {
    console.log('in handleDateFilter');
    console.log(startDate, endDate);
    let filtered;
    filtered = data.filter(task => {

      const taskDate = new Date(task.startDate); // Ensure `startDate` is in your task data
      return taskDate >= new Date(startDate) && taskDate <= new Date(endDate);

    });


    setPriorityFilter(filtered);

  }
  const handleReset = () => {
    setStartDate("");
    setEndDate("");
    setPriorityFilter(data); // Reset to original data
  };
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`http://localhost:8085/api/v1/task/email/${mail}`,
        { headers: { Authorization: `Bearer ${token}` } });
      setData(response.data);
      setPriorityFilter(response.data);
    };
    if (mail) { // Fetch data only if mail is not null (loading state)
      fetchData();
    }
  }, [mail]);

  useEffect(() => {
    setMail(prop);
  }, [prop]);

  // console.log("add task",data)
  const handleAddTask = async (addTask) => {
    addTask.emailID = mail
    addTask.isDeleted = false
    try {
      const response = await axios.post("http://localhost:8085/api/v1/task/addTask", addTask, {
        headers: { Authorization: `Bearer ${token}` }
      })
      console.log("Task added" + response.data)
      setData([...data, response.data]);
      enqueueSnackbar("Task added successfully!", {
        variant: "success",
        autoHideDuration: 2000,
        anchorOrigin: {
          vertical: "top",
          horizontal: "center",
        }
      });
    } catch (error) {
      console.error("Error not added" + error);
      enqueueSnackbar("Error adding Task!", { variant: "error" });
    }
  };


  const handleUpdateTask = async (updatedTask) => {
    try {
      console.log(updatedTask)
      const updatedResponse = await axios.put(`http://localhost:8085/api/v1/task/update/${updatedTask.taskId}`, updatedTask, {
        headers: { Authorization: `Bearer ${token}` }
      });
      let updatedData = updatedResponse.data
      console.log("task Updated Success", updatedData)

      let newArray = data.map((task) => (task.taskId === updatedData.taskId ? updatedData : task))
      console.log("New Array", newArray);
      setData(newArray)
      console.log(data)
      enqueueSnackbar("Task updated successfully!", {
        variant: "success",
        autoHideDuration: 2000,
        anchorOrigin: {
          vertical: "top",
          horizontal: "center",
        }
      });
    } catch (error) {
      console.error("Error updating Task!", error);
      enqueueSnackbar("Error updating Task!", { variant: "error" });
    }
  };



  const handleBinTask = async (taskId) => {
    console.log(taskId)
    try {
      const confirmed = window.confirm('Are you sure you want to move this task to bin?');
      if (!confirmed) return;
      console.log(token)
      const response = await axios.post(`http://localhost:8085/api/v1/task/softDelete/${taskId}`, {
      }, { headers: { Authorization: `Bearer ${token}` } })
      console.log("soft deleted", response)
      setData(data.filter((task) => task.taskId !== taskId));
      console.log(data)
      enqueueSnackbar("Task moved to Bin!", {
        variant: "success",
        autoHideDuration: 2000,
        anchorOrigin: {
          vertical: "top",
          horizontal: "center",
        }
      });

    } catch (e) {
      console.error("Not to bin!", e);
      enqueueSnackbar("Error not moved to bin!", { variant: "error" });
    }
  };
  console.log(priorityFilter);
  return (
    <>

      <div style={{ display: "flex", justifyContent: "center", gap: "10px", margin: "20px 0" }}>
        <Form.Select
          aria-label="Filter by Priority"
          // onChange={(e) => setPriorityFilter(e.target.value)}
          onChange={(e) => handleFilter(e.target.value)}
          value={priority}
          style={{ width: '200px' }}
          className="mb-3"
        >
          <option value="">All Priorities</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </Form.Select>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          style={{ padding: "5px" }}
        />
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          style={{ padding: "5px" }}
        />
        <button onClick={handleDateFilter} style={{ padding: "5px 10px" }}>
          Apply Filter
        </button>

        <button
          onClick={handleReset} // Reset to original data
          style={{ marginLeft: "10px", padding: "5px 10px" }}
        >
          Reset Filter
        </button>
      </div>
      <Grid2 minHeight={"600px"}>
        <span class="container-eg-btn-3" style={{ justifyContent: "space-around" }}>
          <Addtask onAddTask={handleAddTask} />

          <Link to="/bin" class="button button-1" > <RecyclingIcon />Recycle Bin</Link>

        </span>



        <Box sx={{ width: '100%' }}>
          <Grid2 container spacing={{ xs: 2, md: 1 }}
            columns={{ xs: 3, sm: 8, md: 12 }}  >


            {priorityFilter === undefined ? (
              <p>Invalid Email and Token</p>
            ) : priorityFilter === null ? (
              <p>Data is Null</p>
            ) :
              // priorityFilter.length===0 ? ( 
              //   <p>No Data Found</p>
              // ) 
              // :
              (
                priorityFilter.map((data) => (
                  <Grid2 size={{ xs: 3, sm: 4, md: 3 }}>
                    <Task key={data.taskId} data={data}
                      handleUpdate={handleUpdateTask}
                      onDelete={handleBinTask}
                    />
                  </Grid2>

                ))
              )}
            {/* {filterPriority === undefined ? (
          <p>Invalid Email and Token</p>
        ) : filterPriority===null? (
          <p>Data is Null</p>
        ) : filterPriority.length===0 ? ( 
          <p>No Data Found</p>
        ) : (
          filterPriority.map((data) => (
            <Grid2  size={{ xs: 3, sm: 4, md: 3 }}>
              <Task key={data.taskId} data={data}
                handleUpdate={ handleUpdateTask} 
                 onDelete={handleBinTask} 
                />
          </Grid2>
            
          ))
        )} */}

          </Grid2>

        </Box>


      </Grid2>
    </>
  )
}

export default Main