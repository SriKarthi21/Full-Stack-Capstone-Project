import styled from "styled-components";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useSnackbar } from "notistack";
import { Grid, Grid2 } from "@mui/material";
import { RiEyeCloseFill } from "react-icons/ri";

const Title = styled.h3`
color:gray;
font-family: 'Times New Roman';
font-size: x-large;
`;

const Container = styled.div`
  background-color: #dedeff;
    
  padding: 2%;
    width:30%;
  box-shadow: 2px 2px 5px gray;
 
`;

const Form=styled.form`
height:80%;
width:100%;
`;
const ButtonContainer = styled.div`
 display:flex;
gap:20px;
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
  width:10vw;
  &:hover {
    background-color: midnightblue;
  }
`;
const Input = styled.input`
padding: 15px;
background-color: #e7e7ff;
border: none;
outline: none;
border-bottom: 2px solid blue;
border-radius: 3px;
width: 90%;

&:focus {
  outline: 1px solid blue;
}
`;
const Error=styled.span`
  color:red;
  font-family: 'Times New Roman';
  position:absolute;
  display:block;
  text-align:center;
  `;
  const Img=styled.img`
  height:70vh;
  box-shadow: 2px 2px 5px gray;
width:60%;
  `;
  
function SignUp() {

    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const { enqueueSnackbar } = useSnackbar(); 
    const onSubmit = (data) => {
        const formData = new FormData();
    formData.append('userName',   data.userName);
    formData.append('userEmailID', data.userEmailID);
    formData.append('userPassword', data.userPassword);
    formData.append('image', data.image[0]); 

        saveUser(formData);
       
        console.log(formData);
        reset();
    }

    

    async function saveUser(data) {
        try {
            console.log(data);
            const regesterUrl="http://localhost:8083/api/v1/register";
            const response=await axios.post(regesterUrl,data);
            console.log(response);
            
            // alert(`User  ${data.userName} registered successfully`)
            if(response.status===201){
                enqueueSnackbar("Registeration successfully!", {
                variant: "success",
                autoHideDuration: 2000, 
                    anchorOrigin: {
                    vertical: "top",
                    horizontal: "center",
                    },
                });
            }
        console.log('done');
        } catch (error) {
            console.log("error",error,error.status);
            if(error.status=409){
                enqueueSnackbar("Email already regestered!", {
                    variant: "info",
                    autoHideDuration: 2000,
                        anchorOrigin: {
                        vertical: "top",
                        horizontal: "center",
                        },
                    });
                }else{
            enqueueSnackbar(`Server Error! ${error.status}`, {
                variant: "info",
                autoHideDuration: 2000, 
                    anchorOrigin: {
                    vertical: "top",
                    horizontal: "center",
                    },
                });
            }
        }
    }

    return (
        <Grid2   display={'flex'} justifyContent={'center'} 
        padding={1} 
       bgcolor={'rgb(229 235 238)'}  container alignContent={'center'} minHeight={600}>
           {/* <Grid2 maxWidth={300}m={1}> */}
           <Img  src="Types-of-To-Do-Lists.png" alt="login image"/>

            {/* </Grid2>        */}

    
     <Container>
            <Title>Registration Form</Title>
            <Form onSubmit={handleSubmit(onSubmit)}>
            <Grid2 mb={3}>

            <Input type="text"
                    id="userName"
                    placeholder="Enter UserName" {...register(
                        "userName", {
                        required: {
                            value: true,
                            message: 'User Name is Required'
                        },
                        minLength: {
                            value: 6,
                            message: 'User Name must contains atlease 6 characters'
                        },
                        pattern: {
                            value: "^[a-zA-Z]+$",
                            message: 'Name must contain only alphabets'

                        }
                    }
                    )} />
                {errors.userName && (
                    <Error>{errors.userName.message}</Error>
                )}
</Grid2>
<Grid2 mb={3}>
<               Input type="text"
                    id="userEmailID"
                    placeholder="Enter EmailID" {...register(
                        "userEmailID", {
                        required: {
                            value: true,
                            message: 'Email-ID is Required.'
                        },
                        pattern: {
                            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                            message: 'Please enter a valid email address'
                        }
                    }
                    )} />
                {errors.userEmailID && (
                    <Error>{errors.userEmailID.message}</Error>
                )}

</Grid2>
<Grid2 mb={3}>
                <Input type="password"
                    id="userPassword"
                    placeholder="Enter Password" {...register(
                        "userPassword", {
                        required: {
                            value: true,
                            message: 'Password is Required'
                        },
                        minLength: {
                            value: 6,
                            message: 'Password must contains alteast 8 characters'
                        }
                    }
                    )} />
                {errors.userPassword && (
                    <Error>{errors.userPassword.message}</Error>
                )}</Grid2>                
<Grid2 mb={3}>
<label id="file-input-label" for="file-input"
      >Upload Profile Image</label>

        
    <input   id="file-input" name="file-input"
                        {...register("image",{
                            required:{value:true}
                        })}
                        type="file" 
                        accept="image/*"
                    />
               
</Grid2>
             
                <ButtonContainer>
                    <Button type="submit">Submit</Button>
                    <Button type="reset" onClick={() => reset()}>
                        Reset

                    </Button>

                </ButtonContainer>
            </Form>
        </Container>
        </Grid2>
 


    )
}
export default SignUp;