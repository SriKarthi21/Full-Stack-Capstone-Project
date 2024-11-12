
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { Button, Grid2, TextField, Typography, Select, MenuItem } from '@mui/material';

const UpdateTask = ({ initialToken }) => {
  const { taskId } = useParams();

  const [updateData, setUpdateData] = useState(null);
 
  useEffect(() => {
    const fetchById = async () => {
      try {
        const response = await axios.get(`http://localhost:8084/api/v1/task/getTask/${taskId}`, {
          headers: { Authorization: `Bearer ${initialToken}` },
        });

        setUpdateData(response.data);
        console.log(response.data)
      } catch (error) {
        console.error('Error while fetching task:', error);
      }
    };

    fetchById();
  }, [taskId]);

  const { register, handleSubmit, formState: 
    { errors, isValid }, trigger, reset ,setValue} = useForm({defaultValues:updateData});
  const onSubmit = async (data) => {
    try {
      console.log(updateData.emailID)
      const updatedTask = { ...data, taskId, emailID:updateData.emailID}; 
      const response = await axios.put(`http://localhost:8084/api/v1/task/update/${taskId}`, updatedTask, {
        headers: { Authorization: `Bearer ${initialToken}` },
      });
      alert('Task updated successfully:', response.data);
     
    } catch (error) {
      console.error('Error while updating task:', error);
    }
    reset(); 
  };

  return ( updateData?
    <div style={{backgroundColor:"whitesmoke"}}>
      <Typography variant="h6">Update Task</Typography>
      <form onSubmit={handleSubmit(onSubmit)} style={{marginLeft:"30%"}}>
        <Grid2 container spacing={2} display={"block"} alignContent={"center"} width={500} justifyContent={'space-around'} >
          <Grid2 item xs={12} m={2}>
            <TextField
              {...register('taskName', { required: 'Task Name is required' })}
              fullWidth
             defaultValue={updateData?.taskName}
              error={errors.taskName}
              helperText={errors.taskName?.message}
            />
 {errors.taskName && <span>Task Name is required</span>}
          </Grid2>
          <Grid2 item xs={12} m={2}>
            <TextField
              {...register('description', { required: 'Description is required' })}
              fullWidth
              label="Description"
              error={errors.description}
              helperText={errors.description?.message} 
              defaultValue={updateData?.description}
            />
          </Grid2>
          <Grid2 item xs={6}m={2}>
            <TextField
              {...register('startDate', { required: 'Start Date is required' })}
              fullWidth
              label="Start Date"
              error={errors.startDate}
              helperText={errors.startDate?.message}
              defaultValue={updateData?.startDate}
            />
          </Grid2>
          <Grid2 item xs={6}m={2}>
            <TextField
              {...register('endDate', { required: 'End Date is required' })}
              fullWidth
              label="End Date"
              error={errors.endDate}
              helperText={errors.endDate?.message}
              defaultValue={updateData?.endDate}
            />
          </Grid2>
          <Grid2 item xs={12}m={2}>
            <Select
              {...register('priority')}
              label="Priority"
              error={errors.priority}
              helperText={errors.priority?.message} 
            >
              <MenuItem value="low">Low</MenuItem>
              <MenuItem value="medium">Medium</MenuItem>
              <MenuItem value="high">High</MenuItem>
            </Select>
          </Grid2>
          <Grid2>
          <Grid2 item xs={12} display="flex" justifyContent="space-around">
            <Button variant="contained" type="reset" onClick={reset}>
              Reset
            </Button>
            <Button variant="contained" type="submit" disabled={!isValid}>
              Submit
            </Button>
            <Button variant="contained" component={Link} to="/user">
              Cancel
            </Button>
            </Grid2>
          </Grid2>
        </Grid2>
          </form>
          </div>:<div>Not Found</div>
  )
}
export default UpdateTask;