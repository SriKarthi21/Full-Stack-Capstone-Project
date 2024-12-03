import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@mui/material'
const PageNotFound = () => {
  return (
<div className ="pagenotfound">
      
      <div >
        <h3>PageNotFound !  </h3></div>
      <Link to="/login">
    <Button variant='contained' color="warning">Go to Login</Button>  
      </Link>

      </div>  )
}

export default PageNotFound