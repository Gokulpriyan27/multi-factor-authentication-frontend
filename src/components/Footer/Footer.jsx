import "./Footer.scss"
import { Container, Navbar } from "reactstrap";

function Footer() {
  return (
    <Navbar color="dark" dark className="footer-wrapper">
      <Container className="footer-nav-wrapper">
        <p>Developed by Gokulpriyan</p>
      </Container>
    </Navbar>
  );
}

export default Footer;
