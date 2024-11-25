import styled from "styled-components";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useSnackbar } from "notistack";
import { Grid2 } from "@mui/material";
const Title = styled.h3`
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

const ButtonContainer = styled.div`
display:flex;
gap:10px;
align-items:center;
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
const Input = styled.input`
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
const Error=styled.span`
    color:red;
    font-family: 'Times New Roman';
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
        // reset();
    }

    

    async function saveUser(data) {
        try {
            console.log(data);
            const backEndUrl="http://localhost:8083/api/v1/register";
            const response=await axios.post(backEndUrl,data);
            console.log(response);
            
            // alert(`User  ${data.userName} registered successfully`)
            if(response.status===201){
                enqueueSnackbar("Registeration successfully!", {
                variant: "success",
                autoHideDuration: 2000, // 2 seconds
                    anchorOrigin: {
                    vertical: "top",
                    horizontal: "right",
                    },
                });
            }
        console.log('done');
        } catch (error) {
            console.log("error",error)
        }
    }

    return (
        <Grid2 display={'flex'} justifyContent={'center'} paddingLeft={5}
    // bgcolor={'rgb(26, 118, 173)'} 
    container alignContent={'center'} minHeight={600}>       <Container>
            <Title>Registration Form</Title>
            <form onSubmit={handleSubmit(onSubmit)}>
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

                <Input type="text"
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
                    <Error>{errors.useruserEmailID.message}</Error>
                )}

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
                )}
              <Input
        {...register("image")}
        type="file" 
        accept="image/*"
      />
                <ButtonContainer>
                    <Button type="submit">Submit</Button>
                    <Button type="reset" onClick={() => reset()}>
                        Reset

                    </Button>

                </ButtonContainer>
            </form>
        </Container>
        </Grid2>
 


    )
}
export default SignUp;