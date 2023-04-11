import React, {Component } from 'react';
import {Navbar, Nav, Container} from 'react-bootstrap';
import {Route, Routes, Link } from 'react-router-dom';


export default class Navigator extends Component{
    render(){
    return (
        <div>
            <Navbar bg='dark' variant='dark' style={{maxHeight:'50px'}} sticky='top'>
                <Container>
                    <Navbar.Brand as={Link} to={"/"} style={{color:'#FF4057'}} >TickIt</Navbar.Brand>
                        <Nav className="me-auto">
                            <Nav.Link as={Link} to={"/"} >Home</Nav.Link>
                            <Nav.Link as={Link} to={"/seasonVenueSelection"} >Season Pass</Nav.Link>
                            <Nav.Link as={Link} to={"/adminLogin"} >Admin Login</Nav.Link>

                        </Nav>
                </Container>
            </Navbar> 
        </div>  
        )
    }
}