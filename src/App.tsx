import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from './logo-tran.png';
import {Button, DropdownButton, Image, Stack, Navbar,Nav, Container, Form } from 'react-bootstrap';
import './App.css';
function App() {
  
  return (
    <div className="App">
      
      <Navbar bg='dark' variant='dark' style={{maxHeight:'50px'}} sticky='top'>
        <Container>
          <Navbar.Brand href="#home" >TickIt</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#features">Season Pass</Nav.Link>
            <Nav.Link href="#pricing">Admin Login</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <div className='App-body'>
        <Stack direction='vertical' style={{alignItems:'center'}} gap={1}>
          <Image src={logo} className='App-logo-big' style={{marginTop:'-60px'}}></Image>
          <div style={{borderColor:'black'}}>
            <Form.Control
            placeholder="Enter to search for event"
            id="searchInput"
            style={{marginTop:'-70px', width:'50vmin'}}
            />
          </div> 
          <div>
            <p style={{color:'white'}}>
              show events here
            </p>
          </div> 
        </Stack>
      </div>
    </div>
  );
}

export default App;
