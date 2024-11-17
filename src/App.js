import './App.css';


import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { useEffect, useState } from 'react';
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

function App() {
  const[mail,setMail]=useState("");

const[initialToken,setToken]=useState("");

async function handleLogin(data){
  console.log("login method called "+data.userEmailID,data.userPassword)
  try{
    
    const loginResponse=await axios.post(`http://localhost:8082/api/v1/login-check`,data)
    localStorage.setItem('token',loginResponse.data.token)
    // data.userEmailID="john@gmail.com"
    
    setMail(data.userEmailID)
    console.log("mailid is",data.userEmailID)
    
  }catch(e){
    console.log(e)
  }
}

  return (
    <div >
      <BrowserRouter>
<Header/>

<Routes style={{height:"90%"}}>

 <Route path="/" element={<HomePage/>}/> 
  <Route path="/login" element={<Login onLogin={handleLogin} />}/>
 <Route path='/signUp' element={<SignUp/>}/> 
  <Route path="/user" element={<Main prop={mail}  />}/>
  <Route path="/bin" element={<Bin />}/>
  {/* <Route path="/update/:taskId" element={<UpdateTask initialToken={initialToken}/>} /> */}
  <Route path="*" element={<PageNotFound/>}  />
</Routes>
<Footer/>
</BrowserRouter>
            </div>
  );
}

export default App;