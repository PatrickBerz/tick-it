import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles.css';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Stack, Alert, Image, Form, Card, Button, Modal, FormGroup, Row, ListGroup, Col, } from 'react-bootstrap';
import logo from './images/logo-tran.png';
import VBCplaceholder from './images/VBC.jpg';

export const Home = () => {

  // Controls whether modals are shown
  const [showConfModal, setConfModal] = useState(false) // Confirmation number modal (exchange tickets)
  const [pickShow, setPickShow] = useState(false) // Pick show modal (exchange tickets)

  // Controls misc. data
  const [showData, setShowData] = useState([]) // All shows from database (array)
  const [value, setValue] = useState('') // User-provided confirmation number (string)
  const [isDisabled, setDisabled] = useState(true) // Continue button is disabled by default (boolean)
  const [alert, setAlert] = useState(undefined) // Sets error/success alert for Conf Num validation
  const [formError, setFormError] = useState(null)

  // Controls data to be passed to next page
  const [passState, setState] = useState({
    confNum:'' ,
    case: '', 
    performance: '', 
    venueName: '', 
    dateTime: '', 
    name: '', 
    phoneNum: '', 
    email: '', 
    seats: [] 
  })

  /**
   * FUNCTION opens the confirmation number modal
   */
  const confNumModal = () => {
    setConfModal(true)
  }

  /**
   * FUNCTION closes the confirmation number modal
   */
  const handleClose = () => {
    setConfModal(false)
    setAlert(undefined);
  }

  /**
   * FUNCTION opens the pick show modal
   */
  const handleContinue = () => {
    setPickShow(true)
    setDisabled(true) //re-disable continue button
  }

  /**
   * FUNCTION closes the show pick modal
   */
  const handleCloseAdd = () => {
    setPickShow(false)
    setFormError(undefined)
  }

  /**
   * FUNCTION convert an ISO date from GMT to CST
   * PARAMETER ISO date in GMT
   * RETURN ISO date in CST
   */
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
    return formattedDate
  }

  /**
   * FUNCTION checks whether the confirmation number is valid (AKA exists in the database)
   */
  const onFormSubmit = (e) => {
    e.preventDefault();
    setValue(value);
    // console.log("CONF NUMBER: ", value); // DEBUG

    const promise = fetch('http://localhost:4000/confNum', {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ value })
    });
    promise.then(event => {
      if (event.status === 200) {
        // If the user entered a valid conf num (error code 200)...
        setAlert({ label: 'success', type: 'success' }) // Show a success alert
        setDisabled(false); // Enable the continue button
        return event.json()
      } 
      else {
        // Otherwise...
        setAlert({ label: `Error ${event.statusText}`, type: 'danger' }) // Show error message
      }
    }).then(purchaseData => {
      // Grab the purchaser data associated with this confnum
      // This data was sent by the backend during the above fetch
      setState(
        {
          confNum: value,
          case: 'exchange', // User is trying to make an exchange
          name: purchaseData.purchaser.name,
          phoneNum: purchaseData.purchaser.phoneNum,
          email: purchaseData.purchaser.address,
          seats: purchaseData.tickets
        }
      )
    }).catch(error => {
      console.error(error)
    })
  }

  /**
   * USEEFFECT runs on the first render to fetch all show data from database
   */
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('http://localhost:4000/showData')
      const newData = await response.json()
      //console.log("Recieved this show data: ", JSON.stringify(newData)) // DEBUG
      setShowData(newData)
    }
    fetchData();
  }, []);
  
  /**
   * RENDER elements on the page
   */
  if (showData) {
    // If there is existing showdata from the backend...
    return (
      <div className='App-body '>
        <Stack direction='vertical' style={{ alignItems: 'center' }} gap={0}>

          {/**TickIt Logo */}
          <Image src={logo} className='App-logo-big' style={{ marginTop: '30px' }}></Image>

          {/**Exchange Tickets button */}
          <div className='d-flex' style={{ width: '95%', marginBottom: '80px', justifyContent: 'right' }}>
            <Button className='me-2' variant="primary" onClick={() => {confNumModal()}}>
              Exchange Tickets
            </Button>
          </div>

          {/**Container for show cards */}
          <div className="square border border-secondary border-3 container" style={{ maxWidth: '95%', maxHeight: '45rem', padding: '35px', overflowY: 'auto', marginBottom: '30px', marginTop: '-70px', background: '#282634' }}>
            
            {/**Flex rows of show cards */}
            <Stack className="mb-5 flex-wrap" direction='horizontal' style={{ justifyContent: 'center' }} gap={3}>

              {/**Map the showData from the backend to individual cards */}
              {showData.map((item, index) => (
                <Card key={index} style={{ width: '18rem', height: '22rem' }}>
                  <Card.Img height={'50%'} variant="top" src={VBCplaceholder} />
                  <Card.Body>
                    <Card.Title>{item.performanceName}</Card.Title>
                    <Card.Text >
                      {item.venueName} <br /> {convertDate(item.dateTime)}
                    </Card.Text>
                      <Link
                        to={"/seatSelection"}
                        state={{ case: "purchase", event: item.performanceName, venue: item.venueName, datetime: item.dateTime }}>
                        <Button size='sm' variant="primary" >
                          Purchase Tickets
                        </Button>
                      </Link>
                  </Card.Body>
                </Card>
              ))}
            </Stack>

            {/**Confirmation number modal */}
            <Modal show={showConfModal} onHide={handleClose}>
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
                <Button id="continueButton" variant="primary" disabled={isDisabled} onClick={handleContinue}>
                  Continue
                </Button>
              </Modal.Footer>
            </Modal>

            {/**Select a show modal for exchanges */}
            <Modal show={pickShow} onHide={handleCloseAdd}>
              <Modal.Header closeButton>
                <Modal.Title>Select a show</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form onSubmit={onFormSubmit} id='newShowForm' >
                  {formError && <Alert variant='danger'>{formError}</Alert>}
                  <Row className="mb-3">
                    <ListGroup as={Col} controlid="status">
                      <Form.Label>Shows</Form.Label>
                      <div style={{ maxHeight: '250px', overflowY: 'scroll' }}>

                        {showData.map((option, index) => (
                          <Link
                            style={{ textDecoration: 'none' }}
                            to={"/seatSelection"}
                            state={{ case: "exchange", confNum:passState.confNum, event: option.performanceName, venue: option.venueName, datetime: option.dateTime, name:passState.name, email: passState.email, phoneNum:passState.phoneNum, oldSeats: passState.seats }}>
                            <ListGroup.Item action key={index} value={JSON.stringify(option)} >
                              {option.performanceName} - ({convertDate(option.dateTime)})
                            </ListGroup.Item>
                          </Link>
                        ))}
                      </div>
                    </ListGroup>
                  </Row>
                </Form>
              </Modal.Body>
            </Modal>
          </div>
        </Stack>
      </div>
    )
  }
  else {
    // Otherwise, when there is no existing showdata from the backend...
    return (
      <div className='App-body '>
        <Stack direction='vertical' style={{ alignItems: 'center' }} gap={0}>
          {/**TickIt Logo */}
          <Image src={logo} className='App-logo-big' style={{ marginTop: '-30px' }}></Image>
          {/**Container for show cards (empty) */}
          <div className="square border border-secondary border-3 container" style={{ maxWidth: '95%', maxHeight: '45rem', padding: '35px', overflowY: 'auto', marginBottom: '30px', marginTop: '-70px', background: '#282634' }}>
          </div>
        </Stack>
      </div>
    )
  }
}