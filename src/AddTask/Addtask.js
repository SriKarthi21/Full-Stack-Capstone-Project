import './Addtask.css'
import React from 'react'
import {useForm} from "react-hook-form"
import { Button,  Grid2, TextField, Typography } from '@mui/material'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Axios from 'axios';
import { useState } from 'react';
const Addtask = ({prop,initialToken}) => {
    const{register,handleSubmit,formState:{errors,isValid},trigger,reset}=useForm();
    const [isExpanded, setIsExpanded] = useState(false);
    const toggleForm = () => {
      setIsExpanded(!isExpanded);
    };
    const saveForm=async(updated)=>{
        try{
          console.log(updated)
          const response=await Axios.post("http://localhost:8084/api/v1/task/addTask",updated,
    {headers:{Authorization:`Bearer ${initialToken}`}})
console.log(response.data)
alert("Added successfully"+response.data.taskName)
        }catch(e){
            console.log(e)
        }
    }
    const onSubmit=(data)=>{
      let  updated={...data,emailID:prop.emaiId}
    // let updated={...data,emailID:"srikarthi@gmail.com"}
      
        console.log("button clicked")
        saveForm(updated);
        reset();
      };

    return (
    <div >
 


       <div style={{ backgroundColor: "#ffffff",
            borderRadius: "8px",
            boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
            width: "90%",
            maxWidth: "600px",
            overflow: "hidden",justifyContent:"center"
         }}>
       <button onClick={toggleForm} style={{ backgroundColor: "#E57373",
    color: "white",
    padding: "16px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between"
  }}>
        {isExpanded ? 'X' : 'Add Task'}
      </button>
    {isExpanded?
    <form onSubmit={handleSubmit(onSubmit)} 
          style={{ margin:"10%",
            overflow: "hidden",justifyContent:"center"
         }}>
      
    <Grid2 item xs={12} md={6}mb={1}> 
            <TextField width={'100%'} name='taskName' variant="standard"  label="Task Name *"
            {...register('taskName',{
                required:"Task Name is required",
            })} fullWidth
            onBlur={(e)=>trigger('taskName')}/> 
           <p>{errors.taskname?.message}</p>
    </Grid2> 
    <Grid2 item xs={12} md={6} >
      <TextField name='description' variant="standard" label="Description *"
      {...register('description',{
          required:"Description is required"
      })}fullWidth
      onBlur={(e)=>trigger('description')}/>
      <p>{errors.descritption?.message}</p>
    </Grid2>

<Grid2 container>
<Grid2 item xs={12} md={6}><TextField  name='startDate' label='start Date' variant='standard'
            {...register('startDate')}
        defaultValue={new Date().toISOString().slice(0, 10)}
        fullWidth  />
     </Grid2>
     
<Grid2 item xs={12} md={6}><TextField  name='endDate' label='End Date' variant='standard'
            {...register('endDate')}
            
        
        fullWidth  />
     </Grid2>
     </Grid2>
   <Grid2 >
    <label style={{marginLeft:"40px"}}>Priority</label>
        <Select
          labelId="priority"  id="priority" 
           label="priority"{...register('priority')}
        >
          <MenuItem value="low">Low</MenuItem>
          <MenuItem value="medium">Medium</MenuItem>
          <MenuItem value="high">High</MenuItem>
         </Select>
        
  </Grid2>

        <Grid2 display={'flex'}  >         
              <Button  variant='contained' type="reset" onClick={() => reset()}>Reset</Button>
              <Button style={{marginLeft:"40px"}} variant='contained' type="submit">Submit</Button>
          </Grid2>

     </form>
    :null}
    </div>
    </div>
  )
}

export default Addtask