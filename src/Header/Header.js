import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import styled from "styled-components";
import { useNavigate } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import { Button, Container, FormControl, Grid2, Input, TextField, Typography } from '@mui/material'
import AuthContext from '../AuthContext/AuthContext';
import { enqueueSnackbar } from 'notistack'
import { useState } from 'react';


const Image = styled.img`
  height:100px;
  width:100px;
  float:left;
  margin-right:10px;
  padding-bottom:50%;
  `;



function Header({imageSrc}) {
  const navigate = useNavigate();
  
  const[hide,setHide]=useState(false);
  const {isLoggedIn,logout}=useContext(AuthContext);
  const handleLogout = () => {
    enqueueSnackbar("Logut Successfully !!!", {
      variant: "info",
      autoHideDuration: 2000,
      anchorOrigin: {
        vertical: "top",
        horizontal: "center"
      }
    });
    logout();
   
  }
  const logoutButton=()=>{
    setHide(!hide);
  }

  const Container = styled.div`
  display:flex;
    width: 90%;
    max-width: 1200px;
    margin-left: auto;
    margin-right: auto;
  `

  const Header = styled.div`
  background-color: #0b61de;
  color: rgb(10, 65, 168);
  display: flex;
  justify-content: space-between;

`
  const HeaderContainer = styled.div`
  padding-right: 10px;
  margin:5px 20px;
 
`

  const CompanyName = styled.h1`
  text-shadow: #ef0a0a;font-family: "Bungee Spice", sans-serif;
  font-weight: 400;
  font-style: normal;
  font-size: 50px;
  color:blue;
`
  const Nav = styled.nav`
backgrounColor:blue;
padding:20px;
justify-Content:space-between;
`


  return (
    <Header>
      <HeaderContainer>
        <img src="logo1.png" alt='Logo' className="logo" />
      </HeaderContainer>

      <Nav onMouseEnter={()=>setHide(true)} onMouseLeave={()=>setHide(false)}>
      <Grid2  >
          {isLoggedIn ? (
           <div style={{marginLeft:"20px",display:"flex"}} >
          
              {imageSrc ? (
                
               <div style={{marginLeft:"20px"}}  >
           
              <img style={{height:"50px",marginLeft:"10px"}}  src={imageSrc} alt="User Image"/>
              {hide && <Link to="/">
               <Button style={{ marginLeft: "20px",  top:"10%", right:"1%" }} variant="contained" color="success"onClick={handleLogout}> Logout</Button>
             </Link>
             }
                </div>        
                 ) : (
                  <p>

                  </p>
                 )
                }
                
                </div>
          ):(
            <span>
              <Link style={{ marginLeft: "20px" }} to="/">
          <Button variant="contained" color="success">Home</Button>
               </Link>
      
            <Link to="/login">
              <Button style={{ marginLeft: "20px" }} variant="contained" color="success"> Login</Button>
            </Link>
            <Link to="/signUp">
        <Button style={{ marginLeft: "20px" }} variant="contained" color="success" >Sign Up</Button>

            </Link>
            </span>
          ) }

        </Grid2>
      

      
            
        
      </Nav>

    </Header>


  );

}

export default Header;