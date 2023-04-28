import { Component } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';


export default class Navigator extends Component{
    render(){
    return (
        <div>
            <Navbar  bg='dark' variant='dark' style={{maxHeight:'60px', display:'inline-flex-start-fill-sticky', fontSize:'23px', fontSizeAdjust:'inherit'}} fixed='top'>
                <Container >
                    <Navbar.Brand  as={Link} to={"/"} style={{color:'#FF4057', fontSize:'35px'}} >TickIt</Navbar.Brand>
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