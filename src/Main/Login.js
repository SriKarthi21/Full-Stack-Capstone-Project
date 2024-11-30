import React from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import {useForm} from "react-hook-form";
import styled from "styled-components";
import axios from "axios";
import { useContext } from 'react';
 import AuthContext from '../AuthContext/AuthContext';
import { useSnackbar } from "notistack";
import { Grid2 } from '@mui/material';

const Title=styled.h3`
  color:gray;
  font-family: 'Times New Roman';
  font-size: x-large;
  `;
  
  const Container = styled.div`
    background-color: #dedeff;
      
    padding: 30px;
    width: 500px;
    margin: 30px auto;
    
    box-shadow: 2px 2px 5px gray;
   
  `;
  
  const ButtonContainer=styled.div`
  display:flex;
  gap:10px;
  align-items:center
  `;
  
  const Button = styled.button`
    background-color: blue;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    align-self: start;
    font-size: 1em;
    &:hover {
      background-color: midnightblue;
    }
  `;
  const Input=styled.input`
  padding: 15px;
  background-color: #e7e7ff;
  border: none;
  outline: none;
  border-bottom: 2px solid blue;
  border-radius: 3px;
  width: 90%;
  margin-bottom: 5px;
  &:focus {
    outline: 1px solid blue;
  }
  `;
  
export default function Login({onLogin}){
  const { enqueueSnackbar } = useSnackbar(); 
  const {isLoggedIn,logout}=useContext(AuthContext);
  const token=localStorage.getItem('token')
  const {register, handleSubmit,reset,formState:{errors}}=useForm();  
  const navigate = useNavigate();

  const onSubmit=(data)=>{
    try{
        onLogin(data);
        
        console.log(isLoggedIn);
            let token = localStorage.getItem('token')

          // setTimeout(()=>{
          //  console.log(isLoggedIn);
           console.log("login token",token)
           if( token){
            enqueueSnackbar("Login successfully!", {
              variant: "success",
              autoHideDuration: 2000, 
              anchorOrigin: {
                vertical: "top",
                horizontal: "center", }
             } )
             navigate("/user");
            }
         
            // },200)
          }catch(e){
        console.log(e);
        enqueueSnackbar("Unable to login! User details are not valid ", {
          variant: "info",
          autoHideDuration: 2000, 
          anchorOrigin: {
            vertical: "top",
            horizontal: "center",
          }
        });
      }
       
       
      reset();
  }
  
  const Error=styled.span`
  color:red;
  font-family: 'Times New Roman';
  `;
  


  return (
    <Grid2 display={'flex'} justifyContent={'center'} paddingLeft={5}
    // bgcolor={'rgb(26, 118, 173)'} 
    container alignContent={'center'} minHeight={600}>
<Container>
<Title>Login Form</Title>
<form onSubmit={handleSubmit(onSubmit)}>
    
 <Input type="text"
    id="userEmailID"
    placeholder="Enter Email-ID" {...register(
        "userEmailID",{
            required:{
                value:true,
                message:'Email-ID Is Required'
            },
            pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: 'Please enter a valid email address'
            }
        }
    )}/>
    { errors.email &&(
        <Error>{errors.email.message}</Error>
    )}

<Input type="password"
    id="userPassword"
    placeholder="Enter Password" {...register(
        "userPassword",{
            required:{
                value:true,message:'Password Is Required'
            }
        }
    )}/>
       { errors.userPassword &&(
        <Error>{errors.userPassword.message}</Error>
    )}
<ButtonContainer>
<Button type="submit">Submit</Button>
<Button type="reset" onClick={()=> reset()}>
 Reset

</Button>

</ButtonContainer>
    </form>
</Container>
   
    </Grid2>
    
  )
}

