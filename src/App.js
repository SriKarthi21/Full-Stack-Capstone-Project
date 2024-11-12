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
  const[initialData,setData]=useState();
  const[loginForm,setLoginForm]=useState({ userEmailID:"john@gmail.com", userPassword:12345 })
  useEffect(()=>{
    async function fetchData(){
      const response=await axios.get("")
      setData(response.data);
    }
    fetchData();
  },[])

const[initialToken,setToken]=useState("");
async function getAllData(){
  // const config={headers:{Authorization:`Bearer ${initialToken}`}}
  console.log("getdata method called")

  const response=await axios.get(`http://localhost:8084/api/v1/task/getAllTask`,
    {headers:{Authorization:`Bearer ${initialToken}`}})
  .then(response=> setData(response.data))
  .catch(e=>console.log(e))
}

async function handleLogin(data){
  console.log("login method called")
  try{
    const loginResponse=await axios.post(`http://localhost:8082/api/v1/login-check`,loginForm)
    setToken(loginResponse.data.token)
    let token=loginResponse.data.token;
    const response=await axios.get(`http://localhost:8084/api/v1/task/email/${loginForm.userEmailID}`,
      {headers:{Authorization:`Bearer ${token}`}})
      setData(response.data)
    console.log(response.data)
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

<Routes>

 <Route path="/" element={<HomePage/>}/> 
  <Route path="/login" element={<Login onLogin={handleLogin} />}/>
 <Route path='/signUp' element={<SignUp/>}/> 
  <Route path="/user" element={<Main prop={initialData}  initialToken={initialToken}/>}/>
  <Route path="/addtask" element={<Addtask/>}/>
  <Route path="/update/:taskId" element={<UpdateTask initialToken={initialToken}/>} />
  <Route path="*" element={<PageNotFound/>}  />
</Routes>
<Footer/>
</BrowserRouter>
            </div>
  );
}

export default App;