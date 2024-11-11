import React from 'react'
import { Link } from 'react-router-dom'

const Task = ({data}) => {
  return (
            <div  className="col-md-6">
                <div className="card mb-3">
                    <div className="card-body">
                        <h5 className="card-title">{data?.taskName}</h5>
                        <p className="card-text">{data?.emailID}</p>
                        <p className="card-text">{data?.description}</p>
                        <p className="card-text"><small   
 className="text-muted">Start Date : {data?.startDate}</small></p>
                        <p className="card-text"><small className="text-muted">End Date : {data?.endDate}</small></p>
                        <p className="card-text">{data?.priority}</p>
                        <Link to={`/update/${data?.taskId}`} type="button" className="btn btn-primary">Edit</Link>
                        <button type="button" className="btn btn-primary">Delete</button>
                    </div>
                </div>


            </div>

  )
}

export default Task