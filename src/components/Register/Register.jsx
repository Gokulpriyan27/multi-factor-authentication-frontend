import React, { useState } from "react";
import "./Register.scss";
import { Button, Container, Form, FormGroup, Input, Label } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios"
import { useNavigate } from "react-router-dom";

function Register() {

const navigate = useNavigate();
const [isLoading,setisLoading]=useState(false);

const initialRegisterValues = {
    email:"",
    username:"",
    password:""
}

const [formValues,setFormValues]=useState(initialRegisterValues);

const handleChange =(e)=>{
   setFormValues({...formValues,[e.target.name]:e.target.value})
}

const toastfunction = (error)=>{
    toast.error(`${error}`, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        });
  }

const handleRegister = async(event)=>{
    //form Validation
    event.preventDefault();

    if((formValues.email.length==0)&&(formValues.username.length===0)&&(formValues.password.length===0)){
        toastfunction("Fields cannot be empty")
    }else{
        if(!formValues.email){
            toastfunction("Email cannot be empty")
        }else if (!/\S+@\S+\.\S+/.test(formValues.email)){
            toastfunction("Invalid email format!")
        }else{
            if(!formValues.username.trim()){
                toastfunction("Username is required!")
            }else{
                    if(!formValues.password.trim()){
                        toastfunction("Password is required!")
                    }else if(formValues.password.trim().length<6){
                        toastfunction("Password must be at least 6 characters")
                    }else{
                        
                        try {
                            setisLoading(true);
                            const regResponse = await axios.post(`${import.meta.env.VITE_BACKEND_URL}auth/register`,formValues,{withCredentials:true});
                            if(regResponse.status===201){
                                setisLoading(false);
                                setFormValues(initialRegisterValues);
                                toast.success(`${regResponse.data.message}`, {
                                    position: "top-center",
                                    autoClose: 2000,
                                    hideProgressBar: false,
                                    closeOnClick: true,
                                    pauseOnHover: true,
                                    draggable: true,
                                    progress: undefined,
                                    theme: "colored",
                                    });

                            }
                        } catch (error) {
                            setisLoading(false);
                            setFormValues(initialRegisterValues);
                            toast.error(`${error.response.data.message}`, {
                                position: "top-center",
                                autoClose: 3000,
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: true,
                                progress: undefined,
                                theme: "colored",
                                });
                        }
                    }
                }
            }
        }
    }

const googleClick = async()=>{

  try {
    window.open(`${import.meta.env.VITE_BACKEND_URL}auth/google`,"_self");
  } catch (error) {
    toastfunction(error.response.data.message)
  }
}




const githubClick = async()=>{

  try {
    window.open(`${import.meta.env.VITE_BACKEND_URL}auth/github`,"_self")
  } catch (error) {
    toastfunction(error.response.data.message)
  }
}

const facebookClick = async()=>{

  try {
    window.open(`${import.meta.env.VITE_BACKEND_URL}auth/facebook`,"_self")
  } catch (error) {
    toastfunction(error.response.data.message)
  }
}


  return (
    <div className="register-wrapper">
      <Container className="register-container">
        <Form className="register-form">

          <FormGroup floating>
            <Input
              id="username"
              name="username"
              placeholder="username"
              type="text"
              autoComplete="off"
              value={formValues.username}
              onChange={handleChange}
          
            />

            <Label for="username">Username</Label>
          </FormGroup>{" "}

          <FormGroup floating>
            <Input
              id="email"
              name="email"
              placeholder="email"
              type="email"
              autoComplete="off"
              value={formValues.email}
              onChange={handleChange}
          
           
            />
            <Label for="email">Email</Label>

            
          </FormGroup>

          <FormGroup floating>
            <Input
              id="password"
              name="password"
              placeholder="Password"
              type="password"
              autoComplete="off"
              value={formValues.password}
              onChange={handleChange}
            />
            <Label for="password">Password</Label>
          </FormGroup>{" "}
          {isLoading ? (
            <Button className="register-button" disabled>
              <FontAwesomeIcon
                icon={faSpinner}
                spin
                size="xl"
                style={{ color: "#121212" }}
              />
            </Button>
          ) : (
            <Button className="register-button" onClick={handleRegister}>
              Register
            </Button>
          )}
          <div className="loginitems">
            <h6>Already registered ?</h6>
            <h6 className="signin" onClick={()=>{navigate("/")}}>Sign in</h6>
          </div>
          <hr />
          <h6>Or register with</h6>
          <div className="other-signin">
            <Button
              className="google-button"
              onClick={googleClick}
            >
              Google
            </Button>
            <Button
              className="github-button"
              onClick={githubClick}
            >
              Github
            </Button>
            <Button
              className="facebook-button"
              onClick={facebookClick}
            >
              Facebook
            </Button>
          </div>
        </Form>
      </Container>
      <ToastContainer />
    </div>
  );
}

export default Register;
