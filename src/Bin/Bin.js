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
        // this mehtod return isDeleted=true cards 
        console.log(response.data);}
        // fetchDeletedTask();
    }, []);

    const restore=async (taskId) => {
        const response = await axios.get(`http://localhost:8084/api/v1/task/restore/${taskId}`, {
            headers: { Authorization: `Bearer ${token}` }
        })
        // this mehtod passing id should not be in the bincomponent response array
    }
    const frommainmovetobin = async (taskId) => {
        const response = await axios.post(`http://localhost:8084/api/v1/task/softDelete/${taskId}`, {
            headers: { Authorization: `Bearer ${token}` }
        });
    }
    return (

        // main component have bin button that should navigate to bin component
        // bin component useeffect should getsoftdeleted(URL)  array should be displayed in card 
        // card having two button restore and deleted
        // if restore cllicked it should displayed in main component
        // if deleted clicked it should delete from the array and don't show in bin component
        <div>
            <button onClick={""}>get delete</button>
            <button onClick={restore}>Restore</button>
            <p>Bin component</p>

        </div>
    )
}

export default Bin