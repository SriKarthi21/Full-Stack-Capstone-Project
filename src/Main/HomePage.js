import styled from "styled-components"


function HomePage(){
    const H1=styled.h1`

    Kanban Board;
    `;

    const H3=styled.h3`

    Kanban Board;
    `;
    return(
        <div style={{height:"500px", marginTop:"20px"}}>
        <H1>Kanban Board- Project Management Application</H1>
        <H3> This is a Project Management tool to keep track of the Project works.
            There are various Categories namely Todos, In Progress and Completed.
            Day to Day activities are keep tracked using task.
            Task contains descriptions, priority, release dates, severity
            Task is assigned to any person so that he can update his daily activites.

            Please SignUp/Login for furthur details.

        </H3>
        </div>
    )
}
export default HomePage