import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import styled from "styled-components";
import { useNavigate } from 'react-router-dom';
import { Button, Container, FormControl, Grid2, Input, TextField, Typography } from '@mui/material'
import AuthContext from '../AuthContext/AuthContext';
import { enqueueSnackbar } from 'notistack'
import { useState } from 'react';


const HeaderLogo = styled.div`
  width:10vw;    
  height: 10vh;
  display:flex;
align-items:center;
  `;
  const Headerdiv = styled.div`
  background-color: #190882;
  color: rgb(10, 65, 168);
  display: flex;
  justify-content: space-between;
  align-items:center;

`;
 const Image = styled.img`
  width:90%;
  height:70%
  `;

  const CompanyName = styled.div`
  text-shadow: #ef0a0a;
  font-style: italic;
  color:lightgreen;

  
`;
  const Nav = styled.nav`
backgrounColor:blue;
padding:20px;
justify-Content:space-between;
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
    localStorage.setItem('token',null);

  }



  return (
    <><Headerdiv>
      <div style={{ margin: "20px" }}>
        {!isLoggedIn ? (<Link style={{ marginLeft: "20px" }} to="/">
          <Button variant="contained" color="primary">Home</Button>
        </Link>
        ) : (<p></p>)}
        <Link to="/contactUs">
          <Button variant="contained" color="primary">Contact Us</Button>
        </Link>
      </div>
      <HeaderLogo>
        <Image src="todo.png" alt='Logo' />
        <CompanyName>
          <h3>      𝕋𝕠 𝔻𝕠 𝕋𝕣𝕒𝕔𝕜𝕖𝕣        </h3>

        </CompanyName>
      </HeaderLogo>
      <div style={{ marginLeft: "50px", alignItems: "center" }}>
        {!isLoggedIn ? (<Link to="/">
          <Button variant="contained" color="primary">Home</Button>
        </Link>
        ) : (<Link to="/dashboard">
          <Button variant="contained" color="primary">Home</Button>
        </Link>)}
        <Link style={{ marginLeft: "20px" }} to="/contactUs">
          <Button variant="contained" color="primary">Contact Us</Button>
        </Link>
      </div>

    </div><Nav onMouseEnter={() => setHide(true)} onMouseLeave={() => setHide(false)}>
        <Grid2>
          {isLoggedIn ? (
            <div style={{ marginLeft: "20px", display: "flex" }}>

              {imageSrc ? (

                <div style={{ marginLeft: "20px" }}>

                  <img style={{ width: "60px", height: "50px" }} src={imageSrc} alt="User Image" />
                  {hide && <Link to="/">
                    <Button style={{ position: "absolute", top: "10vh", right: "1%" }} variant="contained" color="secondary" onClick={handleLogout}> Logout</Button>
                  </Link>}
                </div>
              ) : (
                <p>

                </p>
              )}

            </div>
          ) : (
            <span>


              <Link to="/login">
                <Button style={{ marginLeft: "20px" }} variant="contained" color="primary"> Login</Button>
              </Link>
              <Link to="/signUp">
                <Button style={{ marginLeft: "20px" }} variant="contained" color="primary">Sign Up</Button>

              </Link>
            </span>
          )}

        </Grid2>





      </Nav></>

    </Headerdiv>


  );

}

export default Header;