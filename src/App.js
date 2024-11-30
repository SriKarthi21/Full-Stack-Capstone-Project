import './App.css';


import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Addtask from './AddTask/Addtask';
import PageNotFound from'./PageNotFound'
import Main from './Main/Main'
import Footer from './Footer/Footer';
import Login from './Main/Login';
import SignUp from './Main/SignUp';
import HomePage from'./Main/HomePage';
import Bin from './Bin/Bin';
import Header from './Header/Header';
import { set } from 'react-hook-form';
import UpdateTask from './UpdateTask/UpdateTask';
import { useNavigate } from 'react-router-dom';
import AuthContext from './AuthContext/AuthContext';
import { useSnackbar } from "notistack";

function App() {
  const[mail,setMail]=useState("");
  const[imageSrc,setImageSrc]=useState("");
  const {isLoggedIn,login}=useContext(AuthContext);
  const { enqueueSnackbar } = useSnackbar(); 
  

async function handleLogin(data){
  console.log("login method called "+data.userEmailID,data.userPassword)
  try{
    
    const loginResponse=await axios.post(`http://localhost:8083/api/v1/login-check`,data)
    console.log("loginResponse",loginResponse)
    localStorage.setItem('token',loginResponse.data.token)
    if(loginResponse.status === 200 && loginResponse.data.token){
      localStorage.setItem('token',loginResponse.data.token)
      login()
    setMail(data.userEmailID)
    console.log("mailid is",data.userEmailID)
    const imageResponse = await fetch(`http://localhost:8083/api/v1/getImage/${data.userEmailID}`);
        const imageBlob = await imageResponse.blob();
        const imageUrl = URL.createObjectURL(imageBlob);
        console.log(imageUrl);
        setImageSrc(imageUrl);
       
    }else if(loginResponse.status===401){
      localStorage.setItem('token',null)

      enqueueSnackbar("Create an account for Login!", {
        variant: "info",
        autoHideDuration: 2000, 
        anchorOrigin: {
          vertical: "top",
          horizontal: "center", }
       } )
    } else {
      console.error("Login failed with status:", loginResponse.status);
      enqueueSnackbar("Login failed. Please try again later.", {
        variant: "error",
        autoHideDuration: 2000,
        anchorOrigin: {
          vertical: "top",
          horizontal: "center",
        },
      });
    }
  }catch(e){
    console.log(e)
  }
}

  return (
    <div >
      <BrowserRouter>
<Header imageSrc={imageSrc}/>

<Routes style={{height:"90%"}}>

 <Route path="/" element={<HomePage/>}/> 
  <Route path="/login" element={<Login onLogin={handleLogin} />}/>
 <Route path='/signUp' element={<SignUp/>}/> 
 {isLoggedIn && (<Route path="/user" element={<Main prop={mail}  />}/>)}
  {isLoggedIn && (<Route path="/bin" element={<Bin prop={mail} />}/>)}
  
  <Route path="*" element={<PageNotFound/>}  />
 
</Routes>
<Footer/>
</BrowserRouter>
            </div>
  );
}

export default App;