import { useState, useEffect, useContext } from 'react'
import { CurrentUser } from './contexts/CurrentUser';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Clock from './features/Clock';

function Navigation() {

    const { currentUser } = useContext(CurrentUser)

    let loginActions = (
        <div className="rightNav">
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link href="/register">Register</Nav.Link>
                <Nav.Link href="/login">Login</Nav.Link>
              </Nav>
            </Navbar.Collapse>
        </div>               
    )

    if (currentUser) {
        loginActions = (
            <li style={{ float: 'right' }}>
                Logged in as {currentUser.firstName} {currentUser.lastName}
            </li>
        )
    }

    return (
        <div className="leftNav">
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
          <Container>
            <div className="navbarBrand">
                <Navbar.Brand href="/">Local Guide</Navbar.Brand>
            </div>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link href="/foods">Food</Nav.Link>
                <Nav.Link href="/drinks">Drinks</Nav.Link>
                <Nav.Link href="/notes">Notes</Nav.Link>
              </Nav>

              
              {loginActions}
            </Navbar.Collapse>
           
          </Container>
          <Clock/>
        </Navbar>
        </div>
    )
}

export default Navigation;

