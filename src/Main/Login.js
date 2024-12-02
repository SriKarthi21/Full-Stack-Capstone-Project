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
   background-color: #e7e7ff;
    box-shadow: 2px 2px 5px gray;
    display: flex;
    width:30%;
    flex-direction: column;
    justify-content: center;
    align-items:center;
  `;
  
  const Form=styled.form`
  height:80%;
  width:100%;
  text-align:center;
  `;
  const ButtonContainer=styled.div`
  display:flex;
  justify-content:space-around;
  margin-top:15%;  


  `;
  
  const Button = styled.button`
    background-color: blue;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  width:10vw;
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

  outline: 1px solid blue;
  `;
  const Img=styled.img`
  height:70vh;
  width:60%;
  box-shadow: 2px 2px 5px gray;

  `;
  const Error=styled.span`
  color:red;
  font-family: 'Times New Roman';
  position:absolute;
  display:block;
  margin-left:2%;
  text-align:center;
  `;
  
export default function Login({onLogin}){
  const { enqueueSnackbar } = useSnackbar(); 
  const {isLoggedIn,logout}=useContext(AuthContext);
  let token=localStorage.getItem('token')
  const {register, handleSubmit,reset,formState:{errors}}=useForm();  
  const navigate = useNavigate();

  const onSubmit=(data)=>{
    try{
        onLogin(data);
        
        console.log(isLoggedIn);

          // setTimeout(()=>{
          //  console.log(isLoggedIn);
          //  console.log("login token",token)
           if( token){
           
             navigate("/dashboard");
            }
         
            // },200)
          }catch(e){
        console.log(e);
        enqueueSnackbar(`Unable to login! User details are not valid ${e.status}`, {
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
  
  


  return (
    <Grid2
     display={'flex'} justifyContent={'center'} 
     padding={1} 
    bgcolor={'rgb(229 235 238)'}  container alignContent={'center'} minHeight={600}>
        <Img  src="Types-of-To-Do-Lists.png" alt="login image"/>
<Container>
<Title>Login Form</Title>
<Form onSubmit={handleSubmit(onSubmit)} >
    <Grid2 mb={5}>
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
        <Error>{errors.userEmailID.message}</Error>
    )}

    </Grid2 >
 <Grid2 mb={5}>
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

 </Grid2>
<ButtonContainer>
<Button type="submit">Submit</Button>
<Button type="reset" onClick={()=> reset()}>
 Reset

</Button>

</ButtonContainer>
    </Form>
</Container>
   
    </Grid2>
    
  )
}

