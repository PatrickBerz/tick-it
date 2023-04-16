import 'bootstrap/dist/css/bootstrap.min.css';
import logo from './logo-tran.png';
import VBCplaceholder from './VBC.jpg';
import { Stack, Alert, Image, Form, Card, Button, Modal, FormGroup } from 'react-bootstrap';
import { Route, Routes, Link } from 'react-router-dom';
import { useState } from 'react';
import '../styles.css';

export const Home = () =>{
  const [showModal, setShow] = useState(false);
  const [passState, setState] = useState({case:'',event:'',venue:'', date:''});
  const [value, setValue] = useState('');
  const [alert, setAlert] = useState(undefined);

  const [selectedShow, setSelectedShow] = useState(null);

  const handleSelectShow = (item) => {
    setState({case:"exchange",event:item.show.performance, venue:item.show.venue, date:item.show.date});
  };

  const confNumModal = () => {
    setShow(true)
  };
  const handleClose = () => {
    setShow(false)
    setAlert(undefined);
  }
  
  const data = [
    {
      "show":
      {
        "performance": "West Side Story",
        "venue": "Civic Center Playhouse",
        "date": "4/12/2023"
      }
    },
    {
      "show":
      {
        "performance": "Titanic 2",
        "venue": "Civic Center Playhouse",
        "date": "4/13/2023"
      }
    },
    {
      "show":
      {
        "performance": "Die Hardest",
        "venue": "Civic Center Concert Hall",
        "date": "4/14/2023"
      },
    },
    {
      "show":
      {
        "performance": "How I Met Your Mother Abridged",
        "venue": "Civic Center Concert Hall",
        "date": "4/15/2023"
      },
    },
    {
      "show":
      {
        "performance": "West Side Story",
        "venue": "Civic Center Playhouse",
        "date": "4/12/2023"
      }
    },
    {
      "show":
      {
        "performance": "Titanic 2",
        "venue": "Civic Center Playhouse",
        "date": "4/13/2023"
      }
    },
    {
      "show":
      {
        "performance": "Die Hardest",
        "venue": "Civic Center Concert Hall",
        "date": "4/14/2023"
      },
    },
    {
      show:
      {
        performance: "How I Met Your Mother Abridged",
        venue: "Civic Center Concert Hall",
        date: "4/15/2023"
      },
    },

  ]


  const [isDisabled, setDisabled] = useState(true);

  const onFormSubmit = (e) => {
    e.preventDefault();
    setValue(value);
    console.log(value);

    const promise = fetch('http://localhost:4000/confNum', {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ value })
    });
    console.log(promise)
    promise.then(event => {
      if (event.status === 200) {
        setAlert({ label: 'success', type: 'success' })
        //handleClose()
        //window.location.href="/seatSelection"
        var x = document.getElementById("continueButton");
        //un-disable var x
        setDisabled(false);
      } else {
        setAlert({ label: `Error ${event.statusText}`, type: 'danger' })
      }
    })
  }

  return (
    <div className='App-body '>
      <Stack direction='vertical' style={{ alignItems: 'center' }} gap={0}>
        <Image src={logo} className='App-logo-big' style={{ marginTop: '-30px' }}></Image>
        <div className="square border border-secondary border-3 container" style={{ maxWidth: '95%', maxHeight: '45rem', padding: '35px', overflowY: 'auto', marginBottom: '30px', marginTop: '-70px', background: '#282634' }}>
          <Stack className="mb-5 flex-wrap" direction='horizontal' style={{ justifyContent: 'center' }} gap={3}>
            {data.map((item, index) => (
              <Card key={index} style={{ width: '18rem', height: '22rem' }}>
                <Card.Img height={'50%'} variant="top" src={VBCplaceholder} />
                <Card.Body>
                  <Card.Title>{item.show.performance}</Card.Title>
                  <Card.Text >
                    {item.show.venue} <br /> {item.show.date}
                  </Card.Text>
                  <Stack direction='horizontal' gap={2}>
                  <Link 
                    to={"/seatSelection"}
                    state={{case:"purchase",event:item.show.performance,venue:item.show.venue, date:item.show.date}}>
                    <Button size='sm' variant="primary" >
                          Purchase Tickets
                    </Button>
                  </Link>
                    <Button size='sm' variant="primary" onClick={() =>{
                    confNumModal()
                    handleSelectShow(item)
                    }}>
                      Exchange Tickets
                    </Button>
                  </Stack>
                </Card.Body>
              </Card>
            ))}
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
                    type="text"
                    placeholder="Confirmation Number"
                    onChange={(e) => setValue(e.target.value)}
                    value={value}
                    />
                  
                  </FormGroup>
                  <div className='d-inline-flex'>
                  <Button className="me-2 mt-1" type='submit' variant="success" style={{width:'60px', height:'35px'}} onClick={onFormSubmit}>                
                  Enter 
                  </Button>
                  {alert &&
                        <Alert style={{ maxWidth: '200px', marginTop:5, paddingTop:'2px', maxHeight:'30px', }} key={alert.type} variant={alert.type}>
                        {alert.label}
                        </Alert>
                    }
                    
                  </div>
                </Form>
                
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                  <Button id="continueButton" variant="primary" disabled={isDisabled}>
                    <Link to={"/seatSelection"} style={{color:'white', textDecoration:'none'}} state={{case:passState.case ,event:passState.event, venue:passState.venue, date:passState.date}}>                
                        Continue 
                    </Link>
                  </Button>
                
              </Modal.Footer>
            </Modal>
          </div>
        </Stack>
      </div>
    )
}