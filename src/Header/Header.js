import React from 'react'
import { Link } from 'react-router-dom';
import styled from "styled-components";
import { useNavigate } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import { Button, Container, FormControl, Grid2, Input, TextField, Typography } from '@mui/material'





const Image = styled.img`
  height:100px;
  width:100px;
  float:left;
  margin-right:10px;
  padding-bottom:50%;
  `;



function Header({imageSrc}) {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login')
  }

  const handleSignUpClick = () => {
    navigate('/signUp')
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
  display: flex;
  background-color: white;
  border-radius: 20px;
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
        <CompanyName >To Do Tracker</CompanyName>
      </HeaderContainer>

      <Nav>


        <Link style={{ marginLeft: "20px" }} to="/">
          <Button variant="contained" color="success">Home</Button>
        </Link>
        <Button style={{ marginLeft: "20px" }} variant="contained" color="success" onClick={handleLoginClick}>Login</Button>
        <Button style={{ marginLeft: "20px" }} variant="contained" color="success" onClick={handleSignUpClick}>Sign Up</Button>
      
            {imageSrc ? (
                <img style={{height:"50px"}} src={imageSrc} alt="User Image" />
            ) : (
                <p></p>
            )}
        
      </Nav>

    </Header>


  );

}

export default Header;