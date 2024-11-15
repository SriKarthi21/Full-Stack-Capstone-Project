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



function Header() {
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

  // .error {
  //   width: 600px;
  //   text-align: center;
  //   margin: 0 auto;
  //   font-size: 1.3em;
  // }

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
  text-shadow: #ef0a0a;
  font-family: "Lora", serif;
  font-size: 50px;
  color:blue;
`
  const Nav = styled.nav`
backgrounColor:blue;
padding:20px;
justify-Content:space-between;
`
  // .headerLogo {
  //   height: 70px;
  //   width: 100px;
  //   margin-right: 20px;
  //   border-radius: 20px;
  // }

  // .footer {
  //   display: flex;
  //   justify-content: space-between;
  //   padding: 20px;
  //   color: white;
  //   background-color: black;
  // }

  // .social-icons {
  //   display: flex;
  // }

  // .social-icons li {
  //   margin: 0 10px;
  //   font-size: 24px;
  //   list-style-type: none;

  // }

  // .social-media {
  //   text-align: center;
  // }


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

      </Nav>

    </Header>


  );

}

export default Header;