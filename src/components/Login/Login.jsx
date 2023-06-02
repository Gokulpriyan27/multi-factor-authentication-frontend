import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import "./Login.scss"
import axios from "axios"
import {
    Button,
    Container,
    Form,
    FormGroup,
    Input,
    Label
  } from "reactstrap";
import { MyContext } from "../../Context/MyContext";

let initialLoginValues = {
  email:"",
  password:"",
}
function Login() {

const navigate = useNavigate();
const [isLoading, setisLoading] = useState(false);
const {loginData,setLoginData}=useContext(MyContext);
const [loginFormValues,setloginFormValues] = useState(initialLoginValues);

const loginChange = (e)=>{
  setloginFormValues({...loginFormValues,[e.target.name]:e.target.value})
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

const toastSuccess = (message)=>{
  toast.success(`${message}`, {
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

const loginSubmit = async()=>{
  if((loginFormValues.email.length===0)&&(loginFormValues.password.length===0)){
    toastfunction("All fields are mandatory!")
  }else{
    if(!loginFormValues.email){
      toastfunction("Email cannot be empty")
    }else if(!/\S+@\S+\.\S+/.test(loginFormValues.email)){
      toastfunction("Invalid email format!")
    }else{
      if(!loginFormValues.password.trim()){
        toastfunction("Password is required!")
      }else{
        setisLoading(true)
        try {
          const loginResponse = await axios.post(`http://localhost:4000/auth/login`,loginFormValues,{withCredentials:true});
          if(loginResponse.status===201){
            setisLoading(false)
            setLoginData(loginResponse.data.data)
            toastSuccess(loginResponse.data.message)
            setloginFormValues(initialLoginValues);
            navigate("/dashboard")
          }
        } catch (error) {
          setisLoading(false)
          toastfunction(error.response.data.message)
          setloginFormValues(initialLoginValues)
        }
      }
    }
  }
 
}

const googleLogin = ()=>{
  try {
    window.open(`http://localhost:4000/auth/google`,"_self")
  } catch (error) {
    toastfunction(error.response.data.message)
  }
}

const githubLogin = ()=>{
  try {
    window.open(`http://localhost:4000/auth/github`,"_self")
  } catch (error) {
    toastfunction(error.response.data.message)
  }
}

const facebookLogin = ()=>{
  try {
    window.open(`http://localhost:4000/auth/facebook`,"_self")
  } catch (error) {
    toastfunction(error.response.data.message)
  }
}


  return (
    <div className="login-wrapper">
    <Container className="login-container">
      <Form className="login-form">
        <FormGroup floating>
          <Input
            id="email"
            name="email"
            placeholder="email"
            type="email"
            autoComplete="off"
            value={loginFormValues.email}
            onChange={loginChange}
          />
          <Label for="email">Email</Label>
        </FormGroup>{" "}
        <FormGroup floating>
          <Input
            id="password"
            name="password"
            placeholder="Password"
            type="password"
            autoComplete="off"
            value={loginFormValues.password}
            onChange={loginChange}
          />
          <Label for="password">Password</Label>
        </FormGroup>{" "}
  
        {
          isLoading ? 
          (<Button className="login-button spinner" disabled>
         <FontAwesomeIcon icon={faSpinner} spin size="xl" style={{color: "#121212"}} />
        </Button>): 
        (<Button className="login-button normal" onClick={loginSubmit}>
          <span>Log in</span>
        </Button>)
        }
      </Form>
      <hr />
      <p className="or">Or sign in with</p>

      <div className="sign-in-buttons">
        <Button className="btn google-btn" onClick={googleLogin}>Google</Button>
        <Button className="btn github-btn" onClick={githubLogin}>Github</Button>
        <Button className="btn facebook-btn" onClick={facebookLogin}>Facebook</Button>
      </div>
      <hr />
      <div className="registeritems">
        <h6>Not registered ?</h6>
        <h6 className="signup" onClick={()=>{navigate("/register")}}>
          Sign up
        </h6>
      </div>
    </Container>
    
    <ToastContainer />
  </div>
  )
}

export default Login