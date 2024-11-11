import React from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
const Home = ({onLogin}) => {
    const navigate = useNavigate();
     function forLogin(){
        onLogin();
        setTimeout(() => {
          navigate("/login");
        }, 50);
    }

  return (
    <div>
<p className="title"> home Registration Form</p>
<button onClick={forLogin}>Login</button>
<Link to={"/login"}>navigate</Link>
    </div>
    
  )
}

export default Home