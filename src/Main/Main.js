import React from 'react'
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "bootstrap-icons/font/bootstrap-icons.css";
import axios from 'axios';
import Task from './Task';
import Addtask from '../AddTask/Addtask';



const Main = ({prop,initialToken}) => {
  return (
    <div>
        <Addtask prop={prop} initialToken={initialToken}/>
        <main draggable className="container mt-4 mb-4">

{ prop!=null || undefined ?
      prop?.map((data)=>(
      <Task key={data.taskId} data={data}/>
       )
    ):<p>No Data Found</p>}
</main>

    </div>
  )
}

export default Main