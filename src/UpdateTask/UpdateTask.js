import React from 'react'
import { useEffect,useState } from 'react';
import { useParams,useNavigate, Link } from 'react-router-dom';
import { useForm} from 'react-hook-form';
import axios  from 'axios';
import { Button,  Grid2, TextField, Typography } from '@mui/material'
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';

const UpdateTask = ({initialToken}) => {
  const {taskId}=useParams();
  const{register,handleSubmit,formState:{errors,isValid},trigger,reset}=useForm();
  const [updateData, setUpdateData] = useState({})

  useEffect(()=>{
async function fetchById(){
  try{
    const response=await axios.get(`http://localhost:8084/api/v1/task/getTask/${taskId}`,
      {headers:{Authorization:`Bearer ${initialToken}`}})
      setUpdateData(response.data)
      console.log(response.data)
  }catch(e){
    console.error("error while fetch"+e);
  }
}
fetchById();
  },[taskId]);
 
  
  const saveForm=async(updated)=>{
      try{
        console.log(updated)
        const response=await axios.put(`http://localhost:8084/api/v1/task/update/${taskId}`,updated,
  {headers:{Authorization:`Bearer ${initialToken}`}})
console.log(response.data)
      }catch(e){
          console.log(e)
      }
  }
  const onSubmit=(data)=>{
    console.log(taskId)
    let  updated={...data,taskId:taskId,emailID:updateData.emailID}
      console.log("button clicked")
      console.log(updated)
      saveForm(updated);
      reset();
    };

  return (
    <div>UpdateTask
         <form onSubmit={handleSubmit(onSubmit)} 
          style={{ margin:"10%",width:"50%",
            overflow: "hidden",justifyContent:"center"
         }}>
    <Grid2 item xs={12} md={6}mb={1}> 
            <TextField width={'100%'}  name='taskName' variant="standard"  
            id="outlined-required"
            
            value={updateData?.taskName}
          
            {...register('taskName',{
                required:"Task Name is required",
            })} fullWidth
            onBlur={(e)=>trigger('taskName')}/> 
           <p>{errors.taskname?.message}</p>
    </Grid2> 
    <Grid2 item xs={12} md={6} >
      <TextField name='description' variant="standard" 

       value={updateData?.description}
      {...register('description',{
          required:"Description is required"
      })}fullWidth
      onBlur={(e)=>trigger('description')}/>
      <p>{errors.descritption?.message}</p>
    </Grid2>

<Grid2 container>
<Grid2 item xs={12} md={6}><TextField  name='startDate' variant='standard'

  value={updateData?.startDate}
 {...register('startDate')}
        fullWidth  />
     </Grid2>
     <br/>
<Grid2 item xs={12} md={6}><TextField  name='endDate'  variant='standard'

             value={updateData?.endDate}
            {...register('endDate')}
       
        fullWidth  />
     </Grid2>
     </Grid2>
   <Grid2 >
    <label style={{marginLeft:"40px"}}>Priority</label>
        <Select
          labelId="priority"  id="priority" 
            value={updateData?.priority}
           {...register('priority')}
        >
          <MenuItem value="low">Low</MenuItem>
          <MenuItem value="medium">Medium</MenuItem>
          <MenuItem value="high">High</MenuItem>
         </Select>
        
  </Grid2>

        <Grid2 display={'flex'}justifyContent={"space-between"}  >         
              <Button  variant='contained' type="reset" onClick={() => reset()}>Reset</Button>
              <Button style={{marginLeft:"40px"}} variant='contained' type="submit">Submit</Button>
             <Button variant='contained' ><Link to="/login" style={{color:"white",textDecoration:"none"}}>Cancel</Link></Button> 
          </Grid2>

     </form>
   
        form
    </div>
  )
}

export default UpdateTask