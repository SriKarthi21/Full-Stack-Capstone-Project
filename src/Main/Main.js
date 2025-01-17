
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


  const [priorityFilter, setPriorityFilter] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [priority, setPriority] = useState("");


  
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
  
  // console.log("add task",data)
  const handleAddTask = async (addTask) => {
    addTask.emailID = mail
    addTask.isDeleted = false
    try {
      const response = await axios.post("http://localhost:8085/api/v1/task/addTask", addTask, {
        headers: { Authorization: `Bearer ${token}` }
      })
      console.log("Task added" + response.data)
      setPriorityFilter([...priorityFilter, response.data]);
      setData([...priorityFilter, response.data])
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
      setPriorityFilter(newArray)
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
      setPriorityFilter(data.filter((task) => task.taskId !== taskId));
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

      
      <Grid2 minHeight={600}>
        <span class="container-eg-btn-3" style={{ justifyContent: "space-around" }}>
          <Addtask onAddTask={handleAddTask} />

          <span class="container-eg-btn-3" style={{ display: "flex", justifyContent: "center", gap: "10px", margin: "20px 0" }}>
        <Form.Select
          aria-label="Filter by Priority"
          onChange={(e) => handleFilter(e.target.value)}
          style={{ width: '180px' }}
        >
          <option value="">All </option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </Form.Select>
        <label>Start Date :
        <input className="filterDate "
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          style={{ padding: "5px" }}
        />
        </label >
        <label>

        End Date :
        <input className="filterDate"
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          style={{ padding: "5px" }}
        />
       

        </label>
        <input className="button button-1" type="submit" value="Apply Filter" onClick={handleDateFilter} style={{ padding: "5px 10px" }} />
        <input className="button2 button-2" type="reset" value="Reset" onClick={handleReset} 
          style={{ marginLeft: "10px", padding: "5px 10px" }}
        ></input>

      </span>

          <Link to="/bin" className="button button-1" > <RecyclingIcon />Recycle Bin</Link>

        </span>



        <Box sx={{ width: '100%' }}>
          <Grid2 container spacing={{ xs: 2, md: 1 }}
            columns={{ xs: 3, sm: 8, md: 12 }}  >


            {priorityFilter === undefined ? (
              <p>Invalid Email and Token</p>
            ) : priorityFilter === null ? (
              <p>Data is Null</p>
            ) :
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
            

          </Grid2>

        </Box>


      </Grid2>
    </>
  )
}

export default Main