import 'bootstrap/dist/css/bootstrap.min.css';
import { Stack, Form, Button, ToggleButton, ToggleButtonGroup, ListGroup } from 'react-bootstrap';
import { useEffect, useState } from "react";
import {useLocation, Link, useNavigate } from 'react-router-dom';

export const SeasonPassCheckout = () =>{
  // Load previous state
  const location = useLocation();
  const state = location.state; 

  // Controls whether to show the pay online fields
  const [payOnline, setPayOnline] = useState(true); 

  // Controls the user-inputted data
  const [userData, setUserData] = useState({
    fName: '',
    lName: '',
    addr: '',
    userPhoneNum: '',
    ticketStatus: 2
  }); 

  // Controls the price displayed on the screen
  const [price, setPrice] = useState('ERROR!'); 

  // Controls the selected discount
  const [discounts, setDiscounts] = useState("None"); 

  var parsedSeats = null; // Contains the seats that are being purchased

  const navigate = useNavigate(); // Used for navigating inside a function

  /*
  * FUNCTION shows or hides the pay online fields
  */
  function onPickPayment() { 
    // Grab the element
    var x = document.getElementById("showHide"); 
    // Check payOnline
    if (payOnline){
        // User clicked pay at door
        setPayOnline(false);
        x.style.display = "none";
        setUserData({
          ...userData,
          ticketStatus: 1
        })
    } else {
        // User clicked pay online
        setPayOnline(true);
        x.style.display = "block";
        setUserData({
          ...userData,
          ticketStatus: 2
        })
    }
  }

  /*
  * FUNCTION handles setting the discount when the discount radio is selected
  */
  const onPickDiscount = (val) => {
    setDiscounts(val);
    console.log("Value: ", val);    
  }

  /*
  * FUNCTION handles first name field changing
  */
  const handleFNameChange = e => {
    setUserData({
        ...userData,
        fName: e.target.value
    })
  }

  /*
  * FUNCTION handles last name field changing
  */
  const handleLNameChange = e => {
    setUserData({
        ...userData,
        lName: e.target.value
    })
  }

  /*
  * FUNCTION handles email address field changing
  */
  const handleAddrChange = e => {
    setUserData({
        ...userData,
        addr: e.target.value
    })
  }

  /*
  * FUNCTION handles phone number field changing
  */
  const handlePhNumChange = e => {
    setUserData({
        ...userData,
        userPhoneNum: e.target.value
    })
  }

  /*
  * FUNCTION send the purchase to the backend on buttonclick
  */
  const placeOrder = () => {
    
    // Create a JSON object of the new purchase
    let newSeasonPass =
    {
        name: userData.fName + " " + userData.lName,
        address: userData.addr,
        phoneNum: userData.userPhoneNum,
        venue: state.venue,
        seatAssignment: {
            section: parsedSeats.section,
            row: parsedSeats.row,
            seatNum: parsedSeats.seatNum,
            price: price
        }
    }

    const promise = fetch('http://localhost:4000/newSeasonTicket', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ newSeasonPass })
    })
    .then(
      response => response.json(),
      error => console.log('An error occured', error),
      navigate('/seasonPassConfirmation', {case: state.case, venue: state.venue})
    )
  }

  /*
  * FUNCTION parse the seats (array of strings/ids) into seat JSON objects
  */
  const parseSeats = () => {
    // Split this ID into its components
    let components = state.seat.split('-'); 

    // Create seat JSON object
    const seat =
    {
        section: components[0],
        row: components[1],
        seatNum: components[2]
    }
    parsedSeats = seat;
  }

  /*
  * FUNCTION handle user pressing the submit button
  */
  const handleSubmit = (event) => {
    event.preventDefault();
    if (userData.fname === '' || userData.lname=='' || userData.address=='' || userData.phone=='') {
      // If user did not fill out all the required fields, alert them
      alert('Please fill out all required fields.');
    } else {
      // Otherwise, place the order
      placeOrder()
    }
  }

  /*
  * USEEFFECT calculate the price of the order every time the discount button is pressed
  */
  useEffect(() => {
    
    const fetchData = async () => {

      // Create the JSON object to send back to be used in calculating price
      let sendData =
      {
        venueName: state.venue,
        discounts: discounts
      }
  
      const promise = fetch('http://localhost:4000/calculateSeasonPrice', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sendData })
      })
      .then(
        response => response.json(),
        error => console.log('An error occured', error)
      )
      .then(res =>
        setPrice(res.toFixed(2))
      )
    }
    fetchData();
  }, [discounts]);


  /*
  * RETURN generate page elements
  */
  return (
      <div className='App-body'>
        {parseSeats()}
        <div style={{marginTop: '60px'}}>
            
        <Stack direction='horizontal' style={{alignItems:'start'}} gap={1}>
        {/**List of checkout information*/}
        <div className="mx-auto">
            <ListGroup style={{position: 'fixed'}}>
              <ListGroup.Item><h2>Check Out</h2></ListGroup.Item>
              <ListGroup.Item><i style={{color: 'gray'}}>Venue:</i></ListGroup.Item>
              <ListGroup.Item>{state.venue}</ListGroup.Item>
              <ListGroup.Item><i style={{color: 'gray'}}>Seat:</i></ListGroup.Item>
                <ListGroup.Item>{state.seat}</ListGroup.Item>
              <ListGroup.Item><i style={{color: 'gray'}}>Total Price:</i></ListGroup.Item>
                <ListGroup.Item>{price}</ListGroup.Item>
            </ListGroup>
            </div>
          
          <Form className="col-xs-6 col-md-6 mt-4 mx-auto"  onSubmit={handleSubmit}>
              <h2 style={{ color: 'white' }}>Purchaser Information</h2>
              <hr style={{ borderTop: '3px solid white'}}></hr>
              {/*Row 1: First Name*/}
              <Form.Group className="mb-3 mx-auto" controlId="formFName">
                  <Form.Label style={{ color: 'white' }}>First Name</Form.Label>
                  <Form.Control required type="text" onChange={handleFNameChange} placeholder="First Name" />
              </Form.Group>

              {/*Row 2: Last Name*/}
              <Form.Group className="mb-3 mx-auto" controlId="formLName">
                  <Form.Label style={{ color: 'white' }}>Last Name</Form.Label>
                  <Form.Control required type="text" onChange={handleLNameChange} placeholder="Last Name" />
              </Form.Group>

              {/*Row 3: Email Address*/}
              <Form.Group className="mb-3 mx-auto" controlId="formEmailAddress">
                  <Form.Label style={{ color: 'white' }}>Email Address</Form.Label>
                  <Form.Control required type="email" onChange={handleAddrChange} placeholder="Email Address" />
              </Form.Group>

              {/*Row 4: Phone Number*/}
              <Form.Group className="mb-3 mx-auto" controlId="formPhoneNumber">
                  <Form.Label style={{ color: 'white' }}>Phone Number</Form.Label>
                  <Form.Control required type="number" min={1000000000} onChange={handlePhNumChange} placeholder="Phone Number"/>
              </Form.Group>

              {/*Discounts*/}
              <h2 style={{ color: 'white' }}>Applicable Discounts</h2>
              <p style={{ color: 'white' }}><i>Note that theater staff may ask for your ID at check-in.</i></p>
              <hr style={{ borderTop: '3px solid white'}}></hr>
              <ToggleButtonGroup className="mb-4" type="radio" name="discounts" defaultValue="None" onChange={onPickDiscount}>
                  <ToggleButton id="tbg-radio-discounts-1" value="None">
                  None
                  </ToggleButton>
                  <ToggleButton id="tbg-radio-discounts-2" value="Senior">
                  Senior
                  </ToggleButton>
                  <ToggleButton id="tbg-radio-discounts-3" value="Military">
                  Military
                  </ToggleButton>
                  <ToggleButton id="tbg-radio-discounts-4" value="First Responders">
                  First Responders
                  </ToggleButton>
              </ToggleButtonGroup>

              {/*Radio Button for online or in person*/}
              
             
              <h2 style={{ color: 'white' }}>Method of Payment</h2>
              <hr style={{ borderTop: '3px solid white'}}></hr>
              <ToggleButtonGroup className="mb-4" type="radio" name="options" defaultValue={1} onChange={onPickPayment}>
                  <ToggleButton id="tbg-radio-1" value={1}>
                  Pay Online
                  </ToggleButton>
                  <ToggleButton id="tbg-radio-2" value={2}>
                  Pay At The Door
                  </ToggleButton>
              </ToggleButtonGroup>

              {/*Showing is dependent on radio button value*/}

              <div id="showHide" className="mt-3">
                  <h2 style={{ color: 'white' }}>Card Information</h2>
                  <hr style={{ borderTop: '3px solid white'}}></hr>
                  {/*Row 5: Name on Card*/}
                  <Form.Group className="mb-3 mx-auto" controlId="formNameOnCard">
                      <Form.Label style={{ color: 'white' }}>Name On Card</Form.Label>
                      <Form.Control type="text"  placeholder="Name On Card" />
                  </Form.Group>
                  {/*Row 6: Credit/Debit Number*/}
                  <Form.Group className="mb-3 mx-auto" controlId="formCardNumber">
                      <Form.Label style={{ color: 'white' }}>Credit/Debit Card Number</Form.Label>
                      <Form.Control type="number" min={1000000000000000} max={9999999999999999}  placeholder="16-digit Credit/Debit Card Number" />
                  </Form.Group>
                  {/*Row 7: Expiration*/}
                  <Form.Group className="mb-3 mx-auto" controlId="formExpirationDate">
                      <Form.Label style={{ color: 'white' }}>Expiration Date</Form.Label>
                      <Form.Control type="text" pattern='[0-9][1-9]/[0-9][0-9]'  placeholder="MM/YY" />
                  </Form.Group>
                  {/*Row 8: Sec. Code*/}
                  <Form.Group className="mb-3 mx-auto" controlId="formSecCode">
                      <Form.Label style={{ color: 'white' }}>Security Code</Form.Label>
                      <Form.Control type="number" min={100} max={999}  placeholder="Security Code" />
                  </Form.Group>
                  {/*Row 9: ZIP Code*/}
                  <Form.Group className="mb-3 mx-auto" controlId="formZIPCode">
                      <Form.Label style={{ color: 'white' }}>ZIP Code</Form.Label>
                      <Form.Control type="number" min={10000} max={99999}  placeholder="ZIP Code" />
                  </Form.Group>
              </div>
              <br></br>
              <Button type="submit" className="mb-3 mx-auto" style={{marginTop:'30px'}}>
                Place Order</Button>
          </Form>
          </Stack>
      </div>
    </div>
  )
}