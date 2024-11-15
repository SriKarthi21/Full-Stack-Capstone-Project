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

import Header from './Header/Header';
import { set } from 'react-hook-form';
import UpdateTask from './UpdateTask/UpdateTask';
import { useNavigate } from 'react-router-dom';

function App() {
  const[mail,setMail]=useState();
  // useEffect(()=>{
  //   async function fetchData(){
  //     const response=await axios.get("")
  //     setData(response.data);
  //   }
  //   fetchData();
  // },[])

const[initialToken,setToken]=useState("");

// async function getAllData(){
  // const config={headers:{Authorization:`Bearer ${initialToken}`}}
  // console.log("getdata method called")

//   const response=await axios.get(`http://localhost:8084/api/v1/task/getAllTask`,
//     {headers:{Authorization:`Bearer ${initialToken}`}})
//   .then(response=> setData(response.data))
//   .catch(e=>console.log(e))
// }

async function handleLogin(data){
  console.log("login method called"+data.userEmailID,data.userPassword)
  try{
    
    const loginResponse=await axios.post(`http://localhost:8082/api/v1/login-check`,data)
    localStorage.setItem('token',loginResponse.data.token)
    setMail(data.userEmailID)
    console.log(data.userEmailID)
    // const response=await axios.get(`http://localhost:8084/api/v1/task/email/${data.userEmailID}`,
    //   {headers:{Authorization:`Bearer ${token}`}})
    //   setData(response.data)
  }catch(e){
    console.log(e)
  }
}

// const handleDelete=async(initialData)=>{
//   try{
//       const conf= window.confirm("do you want to delete ?");
//       console.log(initialData.taskId)
//       if(conf){
  
//    const response= await axios.delete(`http://localhost:8082/api/v1/task/delete/${initialData.taskId}`);
    // setData(initialData.filter((n)=>n.taskId !==taskId))
    // alert("record deleted"+response.data)
//   }
//   }catch(error){
//     console.error("error deleting Notes");
//   }
// }

  return (
    <div >
      <BrowserRouter>
<Header/>

<Routes style={{height:"90%"}}>

 <Route path="/" element={<HomePage/>}/> 
  <Route path="/login" element={<Login onLogin={handleLogin} />}/>
 <Route path='/signUp' element={<SignUp/>}/> 
  <Route path="/user" element={<Main prop={mail}  />}/>
  {/* <Route path="/update/:taskId" element={<UpdateTask initialToken={initialToken}/>} /> */}
  <Route path="*" element={<PageNotFound/>}  />
</Routes>
<Footer/>
</BrowserRouter>
            </div>
  );
}

export default App;