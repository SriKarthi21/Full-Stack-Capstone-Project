import styled from "styled-components"
import { Grid2 } from "@mui/material"


function HomePage(){
  
    return(
        <div >
              <Grid2 display={'flex'} justifyContent={'center'} paddingLeft={5}
    // bgcolor={'rgb(26, 118, 173)'} 
    container alignContent={'center'} minHeight={600}>
        <Grid2> <h1> Stay Organized, Boost Productivity</h1></Grid2>
       
        <Grid2 paddingLeft={5} paddingRight={5} >
<h3>Our To-Do List app is your personal assistant, helping you manage your tasks efficiently. With its intuitive interface and powerful features, you can:
</h3>
<ul style={{padding:'0 5% 0 5%',display:"flex",justifyContent:"space-around"}}>
    <div><h5>Create and Organize Tasks:</h5>
<li>Add tasks with detailed descriptions and due dates.</li>
<li>Categorize tasks into different lists for better organization.</li>
<li>Prioritize tasks to focus on what matters most.</li>
<h5>Track Progress:</h5>
<li>Mark tasks as completed to track your progress.</li>
<li>Visualize your accomplishments with a clear overview of completed tasks.</li>
<h5>Set Reminders:</h5>
<li>Receive timely notifications to stay on top of deadlines.</li>
<li>Never miss an important task again.</li></div>
<div>
<h5>Customize Your Experience:</h5>
<li>Personalize your to-do list with custom themes and settings.</li>
<li>Tailor the app to your specific needs and preferences.</li>
<h5>Access Your Tasks Anywhere:</h5>
<li>Stay organized on the go with our mobile-friendly app.</li>
<li>Sync your tasks across devices for seamless access.</li>
<li>Simplify your life and boost your productivity with our To-Do List app.</li>
</div>
</ul>

        </Grid2>
        </Grid2>
        </div>
    )
}
export default HomePage