import React, {Component } from 'react';
import {Navbar, Nav, Container} from 'react-bootstrap';
import {Route, Routes, Link } from 'react-router-dom';
import { SeasonPass } from './seasonPass';
import { Home } from './home';
import {AdminLogin} from "./adminLogin";

export default class Navigator extends Component{
    render(){
    return (
        <div>
            <Navbar bg='dark' variant='dark' style={{maxHeight:'50px'}} sticky='top'>
                <Container>
                    <Navbar.Brand as={Link} to={"/"} style={{color:'red'}} >TickIt</Navbar.Brand>
                        <Nav className="me-auto">
                            <Nav.Link as={Link} to={"/"} >Home</Nav.Link>
                            <Nav.Link as={Link} to={"/seasonPass"} >Season Pass</Nav.Link>
                            <Nav.Link as={Link} to={"/adminLogin"} >Admin Login</Nav.Link>
                        </Nav>
                </Container>
            </Navbar> 
            <div>
                <Routes>
                    <Route path='/' element={<Home/>}/>
                    <Route path='/adminLogin' element={<AdminLogin/>}/>
                    <Route path='/seasonPass' element={<SeasonPass/>}/>
                </Routes>
            </div>
        </div>  
        )
    }
}