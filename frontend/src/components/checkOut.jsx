import 'bootstrap/dist/css/bootstrap.min.css';
import { Stack, Image, Form, Button, ToggleButton, ToggleButtonGroup, ListGroup } from 'react-bootstrap';
import { useEffect, useState } from "react";
import {useLocation, Link, useNavigate } from 'react-router-dom';

export const CheckOut = () =>{
  // Load previous state
  const location = useLocation();
  const state = location.state; 

  //States
  const [payOnline, setPayOnline] = useState(true); // Controls whether to show the pay online fields
  const [userData, setUserData] = useState({
    fName: '',
    lName: '',
    addr: '',
    userPhoneNum: '',
    ticketStatus: 2
  }); // Controls the user-inputted data
  const [price, setPrice] = useState('ERROR!'); // Controls the price displayed on the screen
  //const [parsedSeats, setParsedSeats] = useState([]) // Controls the JSON seat objects generated by parsing state.seats
  const [discounts, setDiscounts] = useState("None"); // Controls the selected discount

  const parsedSeats = [];
 const navigate = useNavigate();

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

  const onPickDiscount = (val) => {
    setDiscounts(val);
    console.log("Value: ", val);    
  }

  const handleFNameChange = e => {
    setUserData({
        ...userData,
        fName: e.target.value
    })
}

const handleLNameChange = e => {
  setUserData({
      ...userData,
      lName: e.target.value
  })
}

const handleAddrChange = e => {
  setUserData({
      ...userData,
      addr: e.target.value
  })
}

const handlePhNumChange = e => {
  setUserData({
      ...userData,
      userPhoneNum: e.target.value
  })
}

  /*
  * FUNCTION send the purchase to the backend
 */
  const placeOrder = () => {
    let newPurchase =
    {
        venueName: state.venue,
        showName: state.event,
        attendee: {
          name: userData.fName + " " + userData.lName,
          address: userData.addr,
          phoneNum: userData.userPhoneNum            
        },
        tickets: parsedSeats,
        dateTime: state.dateTime,
        ticketStatus: userData.ticketStatus
    }

    const promise = fetch('http://localhost:4000/newPurchase', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ newPurchase })
    })
    .then(
      response => response.json(),
      error => console.log('An error occured', error),
      console.log("Do stuff?"),
      navigate('/orderConfirmation', {state:{case: state.case, event: state.event, venue: state.venue, dateTime: state.datetime, seats: state.seats, userData: userData, price: price }})
    )
    .then(res =>
      console.log("Do stuff!")
      //navigate('/orderConfirmation', {case: state.case, event: state.event, venue: state.venue, dateTime: state.datetime, seats: state.seats, userData: userData })
    )
      console.log("Promise: ", promise) // determine whether was successful or not
  } /**/

  /*
  * FUNCTION parse the seats (array of strings/ids) into seat JSON objects
  */
  const parseSeats = () => {

    let max = state.seats.length;

    // Iterate through array of seat IDs
    for (let i=0; i<max; i++){

      // Split this ID into its components
      let components = state.seats[i].split('-'); 
      //console.log("THE COMPONENTS OF THIS SEAT: ", components)

      // Create seat JSON object
      const seat =
      {
        section: components[0],
        row: components[1],
        seatNum: components[2]
      }

      // Append the seat JSON object to the parsedSeats
      //setParsedSeats([...parsedSeats, seat]);
      parsedSeats.push(seat)
    }
    //console.log("Here's the parsed seats list: ", parsedSeats);
  }

 // const history = useHistory();
  const handleSubmit = (event) => {
    event.preventDefault();
    if (userData.fname === '' || userData.lname=='' || userData.address=='' || userData.phone=='') {
      alert('Please fill out all required fields.');
    } else {
      // Handle form submission logic
      placeOrder()
    }
  }

  /*
  * USEEFFECT only on the first render
  */
  useEffect(() => {
    
    const fetchData = async () => {

      // Create the JSON object to send back
      let sendData =
      {
        showName: state.event,
        venueName: state.venue,
        dateTime: state.dateTime,
        ticketList: {
          parsedSeats //array of seat JSON objects
        },
        discounts: discounts
      }
  
      const promise = fetch('http://localhost:4000/calculatePrice', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sendData })
      })
      .then(
        response => response.json(),
        error => console.log('An error occured', error)
      )
      .then(res =>
        //console.log("This is what I found!: ", res)
        setPrice(res.toFixed(2))
      )
    }
    fetchData();
    //setTimeout(() => { fetchData(); }, 500);*/
  }, [discounts]);


  return (
      <div className='App-body'>
        {parseSeats()}
        <div style={{marginTop: '60px'}}>
            
        <Stack direction='horizontal' style={{alignItems:'start'}} gap={1}>
        {/**List of checkout information*/}
        <div className="col-xs-12 col-md-3 mx-auto px-5">
            <ListGroup>
              <ListGroup.Item><h2>Check Out</h2></ListGroup.Item>
              <ListGroup.Item><i style={{color: 'gray'}}>Event:</i></ListGroup.Item>
              <ListGroup.Item>{state.event}</ListGroup.Item>
              <ListGroup.Item><i style={{color: 'gray'}}>Time:</i></ListGroup.Item>
              <ListGroup.Item>{state.dateTime}</ListGroup.Item>
              <ListGroup.Item><i style={{color: 'gray'}}>Venue:</i></ListGroup.Item>
              <ListGroup.Item>{state.venue}</ListGroup.Item>
              <ListGroup.Item><i style={{color: 'gray'}}>Seats:</i></ListGroup.Item>
              <div style={{maxHeight:'250px', overflowY:'scroll'}}>
              {state.seats.map((item, index) => (
                <ListGroup.Item key={index}>
                  {item}
                  {/*<Button className="ms-2 btn-sm" variant="danger" onClick={() => handleRemoveButton(index)}>
                    Remove
                  </Button>*/}
                </ListGroup.Item>
              ))}
              </div>
              <ListGroup.Item><i style={{color: 'gray'}}>Total Price:</i></ListGroup.Item>
                <ListGroup.Item>{price}</ListGroup.Item>
            </ListGroup>
            </div>

          
          <Form className="col-xs-12 col-md-7 mt-4 mx-auto"  onSubmit={handleSubmit}>
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
                  <Form.Control required type="phone" onChange={handlePhNumChange} placeholder="Phone Number"/>
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
                      <Form.Control type="text" placeholder="Name On Card" />
                  </Form.Group>
                  {/*Row 6: Credit/Debit Number*/}
                  <Form.Group className="mb-3 mx-auto" controlId="formCardNumber">
                      <Form.Label style={{ color: 'white' }}>Credit/Debit Card Number</Form.Label>
                      <Form.Control type="text" placeholder="16-digit Credit/Debit Card Number" />
                  </Form.Group>
                  {/*Row 7: Expiration*/}
                  <Form.Group className="mb-3 mx-auto" controlId="formExpirationDate">
                      <Form.Label style={{ color: 'white' }}>Expiration Date</Form.Label>
                      <Form.Control type="text" placeholder="MM/YY" />
                  </Form.Group>
                  {/*Row 8: Sec. Code*/}
                  <Form.Group className="mb-3 mx-auto" controlId="formSecCode">
                      <Form.Label style={{ color: 'white' }}>Security Code</Form.Label>
                      <Form.Control type="text" placeholder="Security Code" />
                  </Form.Group>
                  {/*Row 9: ZIP Code*/}
                  <Form.Group className="mb-3 mx-auto" controlId="formZIPCode">
                      <Form.Label style={{ color: 'white' }}>ZIP Code</Form.Label>
                      <Form.Control type="text" placeholder="ZIP Code" />
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