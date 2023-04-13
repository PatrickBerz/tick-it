import 'bootstrap/dist/css/bootstrap.min.css';
import logo from './logo-tran.png';
import VBCplaceholder from './VBC.jpg';
import { Stack, Alert, Image, Form, Card, Button, Modal, FormGroup } from 'react-bootstrap';
import {Route, Routes, Link } from 'react-router-dom';
import { useState } from 'react';

export const Home = () =>{

  const [showModal, setShow] = useState(false);
  const [passState, setState] = useState({event:'',venue:''});
  const [value, setValue] = useState('');
  const [alert, setAlert] = useState(undefined);
  

  const confNumModal = () => setShow(true);
  const handleClose = () => {
    setShow(false)
    setAlert(undefined); 
  }

  const data = [
    {
      "show":
      {
          "performance": "West Side Story",
          "venue" : "Civic Center Playhouse",
          "date": "4/12/2023"
      }   
    },
    {
      "show":
      {
          "performance": "Titanic 2",
          "venue" : "Civic Center Playhouse",
          "date": "4/13/2023"
      }   
    },
    {
      "show":
      {
          "performance": "Die Hardest",
          "venue" : "Civic Center Concert Hall",
          "date": "4/14/2023"
      },   
    },
    {
      "show":
      {
          "performance": "How I Met Your Mother Abridged",
          "venue" : "Civic Center Concert Hall",
          "date": "4/15/2023"
      },   
    },
    {
      "show":
      {
          "performance": "West Side Story",
          "venue" : "Civic Center Playhouse",
          "date": "4/12/2023"
      }   
    },
    {
      "show":
      {
          "performance": "Titanic 2",
          "venue" : "Civic Center Playhouse",
          "date": "4/13/2023"
      }   
    },
    {
      "show":
      {
          "performance": "Die Hardest",
          "venue" : "Civic Center Concert Hall",
          "date": "4/14/2023"
      },   
    },
    {
      "show":
      {
          "performance": "How I Met Your Mother Abridged",
          "venue" : "Civic Center Concert Hall",
          "date": "4/15/2023"
      },   
    },
    
  ]

  
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
            style={{marginTop:'-70px', width:'50vmin'}}
            />
          </div> 
          <div className="square border border-secondary border-3" style={{maxWidth:'95%', maxHeight:'45rem' , padding:'35px',overflowY:'scroll', marginBottom:'30px', background:'#282634'}}>            
          <Stack className="mb-5 flex-wrap" direction='horizontal' style={{justifyContent:'center'}} gap={3}>
            {data.map((item, index) => (
              <Card style={{ width: '18rem', height:'22rem'}}>
                <Card.Img height={'50%'} variant="top" src={VBCplaceholder}/>
                <Card.Body>
                  <Card.Title>{item.show.performance}</Card.Title>
                  <Card.Text >
                    {item.show.venue} <br /> {item.show.date}
                  </Card.Text>
                  <Stack direction='horizontal' gap={2}>
                  <Link 
                    to={"/seatSelection"}
                    state={{case:"purchase",event:"small event",venue: "Civic Center Playhouse"}}>
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
            ))}
              {/*  */}

              {/* cards */}
              
              {/* <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={VBCplaceholder}/>
                <Card.Body>
                  <Card.Title>Small Event 2</Card.Title>
                  <Card.Text>
                    Civic Center Playhouse
                  </Card.Text>
                  <Stack direction='horizontal' gap={2}>
                  <Link 
                    to={"/seatSelection"}
                    state={{case:"purchase",event:"small event2",venue: "Civic Center Playhouse"}}>
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
                    state={{case:"purchase",event:"large event",venue: "Civic Center Concert Hall"}}>
                    <Button size='sm' variant="primary">
                          Purchase Tickets
                    </Button>
                  </Link>
                  <Button size='sm' variant="primary" onClick={() => {
                    confNumModal()
                    setState({event:"large event",venue: "Civic Center Concert Hall"})
                    }}> 
                          Exchange Tickets
                    </Button>
                  </Stack>
                </Card.Body>
              </Card> */}
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
                <Link to={"/seatSelection"} state={passState}>
                <Button type='submit' variant="success" onClick={onFormSubmit}>
                  Enter 
                </Button>
                </Link>
              </Modal.Footer>
            </Modal>
          </div>
        </Stack>
      </div>
    )
}