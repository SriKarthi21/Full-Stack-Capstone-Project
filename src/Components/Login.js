import {useForm} from "react-hook-form";
import styled from "styled-components";
import axios from "axios";
export default function Login(){

const {register, handleSubmit,reset,formState:{errors}}=useForm();  
const Title=styled.h3`
color:gray;
font-family: 'Times New Roman';
font-size: x-large;
`;

const Container = styled.div`
  background-color: #dedeff;
    
  padding: 30px;
  width: 500px;
  margin: 30px auto;
  
  box-shadow: 2px 2px 5px gray;
 
`;

const ButtonContainer=styled.div`
display:flex;
gap:10px;
align-items:center
`;

const Button = styled.button`
  background-color: blue;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  align-self: start;
  font-size: 1em;
  &:hover {
    background-color: midnightblue;
  }
`;
const Input=styled.input`
padding: 15px;
background-color: #e7e7ff;
border: none;
outline: none;
border-bottom: 2px solid blue;
border-radius: 3px;
width: 90%;
margin-bottom: 5px;
&:focus {
  outline: 1px solid blue;
}
`;
const onSubmit=(data)=>{
    saveUser(data);
    console.log(data);
    alert(`${data.name} logged in Successfully`)
    reset();
}

const Error=styled.span`
color:red;
font-family: 'Times New Roman';
`;
async function saveUser(data) {
    try {
        console.log(data);

        alert(`User  ${data.username} logged in successfully`)
        
    } catch (error) {
        
    }
}

return (        
<Container>
<Title>Login Form</Title>
<form onSubmit={handleSubmit(onSubmit)}>
    
 <Input type="text"
    id="username"
    placeholder="Enter Email-ID" {...register(
        "email",{
            required:{
                value:true,
                message:'Email-ID Is Required'
            },
            pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: 'Please enter a valid email address'
            }
        }
    )}/>
    { errors.email &&(
        <Error>{errors.email.message}</Error>
    )}

<Input type="password"
    id="password"
    placeholder="Enter Password" {...register(
        "password",{
            required:{
                value:true,message:'Password Is Required'
            }
        }
    )}/>
       { errors.password &&(
        <Error>{errors.password.message}</Error>
    )}
<ButtonContainer>
<Button type="submit">Submit</Button>
<Button type="reset" onClick={()=> reset()}>
 Reset

</Button>

</ButtonContainer>
    </form>
</Container>
   
        

    )
}