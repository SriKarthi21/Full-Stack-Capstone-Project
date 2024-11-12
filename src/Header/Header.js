import React from 'react'
import { Link } from 'react-router-dom';
import styled from "styled-components";
import { useNavigate } from 'react-router-dom';

const H1=styled.h1`
color:navy;
`;

const ButtonContainer = styled.div`
  position: absolute;

  top: 10px;     /* Adjust as needed */
  right: 10px;   /* Adjust as needed */
  display: flex;
  gap: 10px;     /* Space between buttons */
`;

const Button = styled.button`
  padding: 10px 20px;
  margin:20px 20px;
  background-color: #007BFF;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #0056b3;
  }
`;



  const Image=styled.img`
  height:100px;
  width:100px;
  float:left;
  margin-right:10px;
  padding-bottom:50%;
  `;



 function Header(){
   const navigate = useNavigate(); 
  
  const handleLoginClick=()=>{
    navigate('/login')
  }

  const handleSignUpClick=()=>{
    navigate('/signUp')
  }
 
  return (
    <div className='App-header'style={{backgroundColor:"wheat"}}>
    
     <H1 >To Do Tracker</H1>
     
     <ButtonContainer>
     
         <Button onClick={handleLoginClick}>Login</Button>
         <Button onClick={handleSignUpClick}>Sign Up</Button>
       </ButtonContainer>
 
     
 </div>
 
 
 );
  
}

export default Header;