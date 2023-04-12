import 'bootstrap/dist/css/bootstrap.min.css';
import logo from './logo-tran.png';
import VBCplaceholder from './VBC.jpg';
import { Stack, Alert, Image, Form, Card, Button, Modal, FormGroup } from 'react-bootstrap';
import {Route, Routes, Link } from 'react-router-dom';
import { useState } from 'react';

export const Home = () =>{
  const [showModal, setShow] = useState(false);

  const [value, setValue] = useState('');
  const [alert, setAlert] = useState(undefined);

  const confNumModal = () => setShow(true);
  const handleClose = () => {
    setShow(false)
    setAlert(undefined); 
  }
  
  const onFormSubmit = (e) => {
    e.preventDefault();
    setValue(value);
    console.log(value);
    
    const promise = fetch('http://localhost:4000/confNum', {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({value})
    });
    console.log(promise)
    promise.then(event => {
        if (event.status === 200) {
          setAlert({ label: 'success', type: 'success' })
          handleClose()
          window.location.href="/seatSelection"
        } else {
          setAlert({ label: `Error ${event.statusText}`, type: 'danger' })
        }
      })
}
  
  return (
        <div className='App-body'>
        <Stack direction='vertical' style={{alignItems:'center'}} gap={1}>
          <Image src={logo} className='App-logo-big' style={{marginTop:'-60px'}}></Image>
          <div>
            <Form.Control
            placeholder="Enter to search for event"
            id="searchInput"
            style={{marginTop:'-100px', width:'50vmin'}}
            />
          </div> 
          <div>
            
            <Stack className="mb-5 flex-wrap" direction='horizontal' style={{justifyContent:'center'}} gap={3}>
              <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={VBCplaceholder}/>
                <Card.Body>
                  <Card.Title>Small Event 1</Card.Title>
                  <Card.Text>
                    Civic Center Playhouse
                  </Card.Text>
                  <Stack direction='horizontal' gap={2}>
                  <Link 
                    to={"/seatSelection"}
                    state={{event: "SmallEvent1"}}>
                    <Button size='sm' variant="primary" >
                          Purchase Tickets
                    </Button>
                  </Link>
                    <Button size='sm' variant="primary" onClick={confNumModal}>
                          Exchange Tickets
                    </Button>
                    </Stack>
                </Card.Body>
              </Card>

              {/*Cards*/}
              
              <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={VBCplaceholder}/>
                <Card.Body>
                  <Card.Title>Small Event 2</Card.Title>
                  <Card.Text>
                    Civic Center Playhouse
                  </Card.Text>
                  <Stack direction='horizontal' gap={2}>
                  <Link 
                    to={"/seatSelection"}
                    state={{event: "SmallEvent2"}}>
                    <Button size='sm' variant="primary">
                          Purchase Tickets
                    </Button>
                  </Link>
                  <Button size='sm' variant="primary" onClick={confNumModal}>
                          Exchange Tickets
                    </Button>
                  </Stack>
                </Card.Body>
              </Card>

              <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={VBCplaceholder}/>
                <Card.Body>
                  <Card.Title>Large Event 1</Card.Title>
                  <Card.Text>
                    Civic Center Concert Hall
                  </Card.Text>
                  <Stack direction='horizontal' gap={2}>
                  <Link 
                    to={"/seatSelection"}
                    state={{event: "LargeEvent1"}}>
                    <Button size='sm' variant="primary">
                          Purchase Tickets
                    </Button>
                  </Link>
                  <Button size='sm' variant="primary" onClick={confNumModal}>
                          Exchange Tickets
                    </Button>
                  </Stack>
                </Card.Body>
              </Card>
            </Stack>
            <Modal show={showModal} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Enter Confirmation Number</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <p>Enter the Confirmation Number given to you with your purchase</p>
                <Form onSubmit={onFormSubmit}>
                  <FormGroup>
                  <Form.Control
                    type="name" 
                    placeholder="Confirmation Number" 
                    onChange={(e) => setValue(e.target.value)} 
                    value={value}
                    />
                  </FormGroup>
                  {alert &&
                        <Alert style={{ maxWidth: '200px', marginTop:5, paddingTop:'2px', maxHeight:'30px', }} key={alert.type} variant={alert.type}>
                        {alert.label}
                        </Alert>
                    }
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                <Button type='submit' variant="success" onClick={onFormSubmit}>
                  Enter
                </Button>
              </Modal.Footer>
            </Modal>
          </div>
        </Stack>
      </div>
    )
}