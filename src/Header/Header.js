import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import styled from "styled-components";
import { useNavigate } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import { Button, Container, FormControl, Grid, Grid2, Input, TextField, Typography } from '@mui/material'
import AuthContext from '../AuthContext/AuthContext';
import { enqueueSnackbar } from 'notistack'




const Image = styled.img`
  height:100px;
  width:100px;
  float:left;
  margin-right:10px;
  padding-bottom:50%;
  `;



function Header({imageSrc}) {
  const navigate = useNavigate();
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

  const Container = styled.div`
  display:flex;
    width: 90%;
    max-width: 1200px;
    margin-left: auto;
    margin-right: auto;
  `

  const Header = styled.div`
  background-color: wheat;
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
        <img src="logo1.png" alt='Logo' class="logo" />
      </HeaderContainer>

      <Nav>
      <Grid2  >
      <Link style={{ marginLeft: "20px" }} to="/">
          <Button variant="contained" color="success">Home</Button>
        </Link>
          {isLoggedIn ? (
            <span>
            <Link to="/">
              <Button style={{ marginLeft: "20px" }} variant="contained" color="success"onClick={handleLogout}> Logout</Button>
            </Link>
             {imageSrc ? (
             <img style={{height:"50px",marginLeft:"10px"}}  src={imageSrc} alt="User Image" />

            ) : (
                 <p></p>
                )
            }  
           
            </span>
          ) : (
            <span>
            <Link to="/login">
              <Button style={{ marginLeft: "20px" }} variant="contained" color="success"> Login</Button>
            </Link>
            <Link to="/signUp">
        <Button style={{ marginLeft: "20px" }} variant="contained" color="success" >Sign Up</Button>

            </Link>
            </span>
          )}

        </Grid2>
      

      
            
        
      </Nav>

    </Header>


  );

}

export default Header;