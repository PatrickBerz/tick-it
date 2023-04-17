import 'bootstrap/dist/css/bootstrap.min.css';
import logo from './logo-tran.png';
import VBCplaceholder from './VBC.jpg';
import { Stack, Alert, Image, Form, Card, Button, Modal, FormGroup } from 'react-bootstrap';
import { Route, Routes, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import '../styles.css';

export const Home = () => {
  const [showModal, setShow] = useState(false);
  const [passState, setState] = useState({ case: '', performanceName: '', venueName: '', dateTime: '' });
  const [value, setValue] = useState('');
  const [alert, setAlert] = useState(undefined);
  const [showData, setShowData] = useState([])



  const handleSelectShow = (item) => {
    setState({ case: "exchange", performance: item.item.performanceName, venue: item.venueName, dateTime: item.show.dateTime });
  };

  const confNumModal = () => {
    setShow(true)
  };
  const handleClose = () => {
    setShow(false)
    setAlert(undefined);
  }


  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('http://localhost:4000/showData')
      const newData = await response.json()
      console.log(JSON.stringify(newData))
      setShowData(newData)
    }
    fetchData();
  }, []);




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
  if (showData) {
    return (
      <div className='App-body '>
        <Stack direction='vertical' style={{ alignItems: 'center' }} gap={0}>
          <Image src={logo} className='App-logo-big' style={{ marginTop: '-30px' }}></Image>
          <div className="square border border-secondary border-3 container" style={{ maxWidth: '95%', maxHeight: '45rem', padding: '35px', overflowY: 'auto', marginBottom: '30px', marginTop: '-70px', background: '#282634' }}>
            <Stack className="mb-5 flex-wrap" direction='horizontal' style={{ justifyContent: 'center' }} gap={3}>
              {showData.map((item, index) => (
                <Card key={index} style={{ width: '18rem', height: '22rem' }}>
                  <Card.Img height={'50%'} variant="top" src={VBCplaceholder} />
                  <Card.Body>
                    <Card.Title>{item.performanceName}</Card.Title>
                    <Card.Text >
                      {item.venueName} <br /> {item.dateTime}
                    </Card.Text>
                    <Stack direction='horizontal' gap={2}>
                      <Link
                        to={"/seatSelection"}
                        state={{ case: "purchase", event: item.performanceName, venue: item.venueName, datetime: item.dateTime }}>
                        <Button size='sm' variant="primary" >
                          Purchase Tickets
                        </Button>
                      </Link>
                      <Button size='sm' variant="primary" onClick={() => {
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
                      type="name"
                      placeholder="Confirmation Number"
                      onChange={(e) => setValue(e.target.value)}
                      value={value}
                    />

                  </FormGroup>
                  <div className='d-inline-flex'>
                    <Button className="me-2 mt-1" type='submit' variant="success" style={{ width: '60px', height: '35px' }} onClick={onFormSubmit}>
                      Enter
                    </Button>
                    {alert &&
                      <Alert style={{ maxWidth: '200px', marginTop: 5, paddingTop: '2px', maxHeight: '30px', }} key={alert.type} variant={alert.type}>
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
                  <Link to={"/seatSelection"} style={{ color: 'white', textDecoration: 'none' }} state={{ case: passState.case, event: passState.performanceName, venue: passState.venueName, date: passState.dateTime }}>
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
  else {
    return (
      <div className='App-body '>
        <Stack direction='vertical' style={{ alignItems: 'center' }} gap={0}>
          <Image src={logo} className='App-logo-big' style={{ marginTop: '-30px' }}></Image>
          <div className="square border border-secondary border-3 container" style={{ maxWidth: '95%', maxHeight: '45rem', padding: '35px', overflowY: 'auto', marginBottom: '30px', marginTop: '-70px', background: '#282634' }}>
            <Stack className="mb-5 flex-wrap" direction='horizontal' style={{ justifyContent: 'center' }} gap={3}>
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
                  <div className='d-inline-flex'>
                    <Button className="me-2 mt-1" type='submit' variant="success" style={{ width: '60px', height: '35px' }} onClick={onFormSubmit}>
                      Enter
                    </Button>
                    {alert &&
                      <Alert style={{ maxWidth: '200px', marginTop: 5, paddingTop: '2px', maxHeight: '30px', }} key={alert.type} variant={alert.type}>
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
                  <Link to={"/seatSelection"} style={{ color: 'white', textDecoration: 'none' }} state={{ case: passState.case, event: passState.event, venue: passState.venue, date: passState.date }}>
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
}