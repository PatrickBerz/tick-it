import 'bootstrap/dist/css/bootstrap.min.css';
import logo from './logo-tran.png';
import VBCplaceholder from './VBC.jpg';
import { Stack, Alert, Image, Form, Card, Button, Modal, FormGroup } from 'react-bootstrap';
import { Route, Routes, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import '../styles.css';

export const Home = () => {
  const [showModal, setShow] = useState(false);
  const [passState, setState] = useState({ case: '', performance: '', venueName: '', dateTime: '', name:'', phoneNum:'', email:'', seats:[] });
  const [value, setValue] = useState('');
  const [alert, setAlert] = useState(undefined);
  const [showData, setShowData] = useState([])
  const [exchangeData, setExchange] = useState([])


  const handleSelectShow = (item) => {
    setState(
      {
        case: "exchange",
        performance: item.performanceName,
        venue: item.venueName,
        dateTime: item.dateTime,
        name: exchangeData.Purchase
        
      }
    )
  }

  const confNumModal = () => {
    setShow(true)
  }
  
  const handleClose = () => {

    setShow(false)
    setAlert(undefined);
  }

    const convertDate = (item) => {
        const oldDate = new Date(item)
        //Shift time 300 minutes (5 hours) to get it out of GMT
        const date = new Date(oldDate.getTime() + 300 * 60000);
        const options = {
            month: 'numeric',
            day: 'numeric',
            year: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            hour12: true
        }

        const formattedDate = new Intl.DateTimeFormat('en-US', options).format(date)
        //const formattedDate = date.toLocaleDateString('en-US', options)
        return formattedDate
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
        setDisabled(false);
        return event.json()
      } else {
        setAlert({ label: `Error ${event.statusText}`, type: 'danger' })
      }
    }).then(purchaseData => {
      setState(
        {
          ...passState,
          name:purchaseData.purchaser.name,
          phoneNum:purchaseData.purchaser.phoneNum,
          email:purchaseData.purchaser.address,
          seats:purchaseData.tickets
        }
        )
      //setExchange({purchaseData})
      console.log(passState)
    }).catch(error => {
      console.error(error)
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
                      {item.venueName} <br /> {convertDate(item.dateTime)}
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
                  <Link to={"/seatSelection"} style={{ color: 'white', textDecoration: 'none' }} state={{ case: passState.case, event: passState.performanceName, venue: passState.venueName, datetime: passState.dateTime, name:passState.name, phoneNum: passState.phoneNum,email:passState.email, seats:passState.seats}}>
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
          </div>
        </Stack>
      </div>
    )
  }
}