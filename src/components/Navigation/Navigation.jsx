import "./Navigation.scss"
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button, Container, Navbar, NavbarBrand } from "reactstrap";
import axios from"axios"

function Navigation() {
  const { userid } = useParams();
  const navigate = useNavigate();

  const handleLogout=async()=>{
    try {
      const logResponse = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/auth/logout`,{withCredentials:true});
      if(logResponse.status===200){
        navigate("/");
      }
    } catch (error) {
        console.log(error)
    }
  }

  return (
    <Navbar color="dark" dark className="navbar-wrapper">
        <Container className="nav-wrapper">
        <Button color="danger" outline onClick={handleLogout}>Logout</Button>
        </Container>
    
    </Navbar>
  );
}

export default Navigation;
