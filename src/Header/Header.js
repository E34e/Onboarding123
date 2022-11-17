import '../jnanabhumi.css';  
import { useEffect } from "react";
import * as jnb from "react-bootstrap";   
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { AiOutlineLogout } from 'react-icons/ai';
import Container from 'react-bootstrap/Container';
const Header = () => {
   
 


  return (

    <><Navbar collapseOnSelect expand="lg" bg="white" sticky="top" variant="light">
      <Container >
        <Navbar.Brand href="/" style={{ color: 'green', fontWeight: 'bold' }}><img src="../img/logo.png " width="200px" alt="Jnanabhumi" /></Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
          <jnb.Nav.Link href="/">Home</jnb.Nav.Link>
              <jnb.Nav.Link href="/">GOs</jnb.Nav.Link>
            <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
              <NavDropdown.Item href="/">List 1 </NavDropdown.Item>
              <NavDropdown.Item href="/">List 2 </NavDropdown.Item>
              <NavDropdown.Item href="/">List 3 </NavDropdown.Item>
                 </NavDropdown>
         
      

          </Nav>
          <Nav  >

            <NavDropdown title="Settings" id="collasible-nav-dropdown" >
              <NavDropdown.Item href="/">Change Password</NavDropdown.Item>
              <NavDropdown.Item href="/"><AiOutlineLogout style={{ fontSize: '18px' }} /> Signout </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar> </>
  );
}
export default Header;
