import React from 'react'
import { Link } from 'react-router-dom';
import styled from "styled-components";

const HeaderContainer=  styled.header`
margin:0px 20px;
background-color: black;
color:rgb(203, 226, 221);
display:flex;
justify-content: space-between;
`;
const Header = () => {
  return (
    <div>
    <header className="navbar navbar-dark bg-dark">
        <div className="container-fluid">
            <Link to="/" className="navbar-brand" href="#">To Do Task</Link>
            <form className="d-flex">
                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
                <button className="btn btn-outline-success" type="submit">Search</button>
            </form>
      
            <div >  
                       <ul className="d-flex ms-auto mb-2 mb-lg-0"style={{color:"white",textDecoration:"none"}}>
                <li className="nav-item m-2" >
                    <Link to="#" className="nav-link active" aria-current="page" style={{textDecoration:"none"}}>Sign Up</Link>
                </li>
                <li className="nav-item m-2" >
                    <Link to="#" className="nav-link" >Login</Link>   

                </li> 
                <li className="nav-item dropdown m-2">
                    <a className="nav-link dropdown-toggle"  role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        <i className="bi bi-person-circle"></i>
                    </a>
                    <ul className="dropdown-menu">
                        <li><Link to="#" className="dropdown-item" >Profile</Link></li>
                        <li><Link to="#" className="dropdown-item" >Settings</Link></li>   

                        <li><br className="dropdown-divider"/></li>
                        <li><Link to="#" className="dropdown-item" >Logout</Link></li>
                    </ul>
                </li>
            </ul>
            </div>
 
        </div>   

    </header>
    </div>
  )
}

export default Header