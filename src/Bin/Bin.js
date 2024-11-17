import React, { useEffect } from 'react'
import axios from 'axios'
import { useState } from 'react'
import { get } from 'react-hook-form';


const Bin = () => {
    const [emailID, setEmailID] = useState("sam@gmail.com")
    let token = localStorage.getItem('token')
    useEffect( () => {
       async function fetchDeletedTask(){
        const response = axios.get(`http://localhost:8084/api/v1/task/getAllDeletedTask/${emailID}`, {
            headers: { Authorization: `Bearer ${token}` }
        })
        console.log(response);}
        // fetchDeletedTask();
    }, []);

    const getAllSoftDeletedTask = async () => {
        let emailID = "sam@gmail.com";
        const response = await axios.get(`http://localhost:8084/api/v1/task/getAllDeletedTask/${emailID}`, {
            headers: { Authorization: `Bearer ${token}` }
        })
        console.log(response);
    }
    const restoreTask = async (taskId) => {
        const response = await axios.get(`http://localhost:8084/api/v1/task/restore/${taskId}`, {
            headers: { Authorization: `Bearer ${token}` }
        })
    }
    const softDelete = async (taskId) => {
        const response = await axios.put(`http://localhost:8084/api/v1/task/softDelete/${taskId}`, {
            headers: { Authorization: `Bearer ${token}` }
        });
    }
    return (
        <div>
            <button onClick={getAllSoftDeletedTask}>get delete</button>
            <button onClick={restoreTask}>Restore</button>
            <p>Bin component</p>

        </div>
    )
}

export default Bin