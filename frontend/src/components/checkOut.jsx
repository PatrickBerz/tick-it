import 'bootstrap/dist/css/bootstrap.min.css';
import { Stack, Image, Form, Button, ToggleButton, ToggleButtonGroup, ListGroup } from 'react-bootstrap';
import { useEffect, useState, useRef } from "react";
import {useLocation, Link } from 'react-router-dom';

export const CheckOut = () =>{
    // Load previous state
    const location = useLocation();
    const state = location.state; 

    //States
    const [payOnline, setPayOnline] = useState(true);
    const [listOfSeats, setListOfSeats] = useState(state.listData);
    const [userData, setUserData] = useState();
    const [price, setPrice] = useState('ERROR!');

    /*
    * FUNCTION show or hide the div for paying online
    */
    function onPickPayment(){ 
        var x = document.getElementById("showHide"); 

        /*Switch the value of payOnline*/
        if (payOnline){
            /*User clicked pay at door*/
            setPayOnline(false);
            x.style.display = "none";
        } else {
            /*User clicked pay online*/
            setPayOnline(true);
            x.style.display = "block";
        }
    }

    const placeOrder = () =>{
      let newPurchase =
      {
            purchase: {
              performanceName: state.event,
              venueName: state.venue,
              dateTime: state.dateTime
              //What all is needed?
          }
      }
  
      const promise = fetch('http://localhost:4000/', {
          method: 'POST',
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ newPurchase })
      })
      .then(
        response => response.json(),
        error => console.log('An error occured', error)
      )
      .then(res =>
        console.log("Do stuff") // load the next page, maybe?
      )
    }

  return (
      <div className='App-body'>
        <div style={{marginTop: '60px'}}>
            
        <Stack direction='horizontal' style={{alignItems:'start'}} gap={1}>
        {/**List of checkout information*/}
            <ListGroup className="col-xs-3 col-md-3 mx-auto">
              <ListGroup.Item><h2>Check Out</h2></ListGroup.Item>
              <ListGroup.Item><i style={{color: 'gray'}}>Event:</i></ListGroup.Item>
              <ListGroup.Item>{state.event}</ListGroup.Item>
              <ListGroup.Item><i style={{color: 'gray'}}>Time:</i></ListGroup.Item>
              <ListGroup.Item>{state.dateTime}</ListGroup.Item>
              <ListGroup.Item><i style={{color: 'gray'}}>Venue:</i></ListGroup.Item>
              <ListGroup.Item>{state.venue}</ListGroup.Item>
              <ListGroup.Item><i style={{color: 'gray'}}>Seats:</i></ListGroup.Item>
            {console.log("I'm trying to render this: ", state.seats)}
              {state.seats.map((item, index) => (
                <ListGroup.Item key={index}>
                  {item}
                  {/*<Button className="ms-2 btn-sm" variant="danger" onClick={() => handleRemoveButton(index)}>
                    Remove
                  </Button>*/}
                </ListGroup.Item>
              ))}
              <ListGroup.Item><i style={{color: 'gray'}}>Total Price:</i></ListGroup.Item>
              <ListGroup.Item>{price}</ListGroup.Item>
            </ListGroup>

          <Form className="col-xs-6 col-md-6 mt-4 mx-auto">
              {/*Row 1: First Name*/}
              <Form.Group className="mb-3 mx-auto" controlId="formFName">
                  <Form.Label style={{ color: 'white' }}>First Name</Form.Label>
                  <Form.Control type="text" placeholder="First Name" />
              </Form.Group>

              {/*Row 2: Last Name*/}
              <Form.Group className="mb-3 mx-auto" controlId="formLName">
                  <Form.Label style={{ color: 'white' }}>Last Name</Form.Label>
                  <Form.Control type="text" placeholder="Last Name" />
              </Form.Group>

              {/*Row 3: Email Address*/}
              <Form.Group className="mb-3 mx-auto" controlId="formEmailAddress">
                  <Form.Label style={{ color: 'white' }}>Email Address</Form.Label>
                  <Form.Control type="email" placeholder="Email Address" />
              </Form.Group>

              {/*Row 4: Phone Number*/}
              <Form.Group className="mb-3 mx-auto" controlId="formPhoneNumber">
                  <Form.Label style={{ color: 'white' }}>Phone Number</Form.Label>
                  <Form.Control type="phone" placeholder="Phone Number"/>
              </Form.Group>


              {/*Radio Button*/}
              
             
              <ToggleButtonGroup type="radio" name="options" defaultValue={1} onChange={onPickPayment}>
                  <ToggleButton id="tbg-radio-1" value={1}>
                  Pay Online
                  </ToggleButton>
                  <ToggleButton id="tbg-radio-2" value={2}>
                  Pay At The Door
                  </ToggleButton>
              </ToggleButtonGroup>

              
              {/*Showing is dependent on radio button value*/}

              <div id="showHide" className="mt-3">
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
                  <Form.Group className="mx-auto" controlId="formZIPCode">
                      <Form.Label style={{ color: 'white' }}>ZIP Code</Form.Label>
                      <Form.Control type="text" placeholder="ZIP Code" />
                  </Form.Group>
              </div>

              <br></br>
                <Link 
                to={"/orderConfirmation"}
                state={{event: state.event, seat: state.seat}}>
                <Button type="submit" className="mb-3 mx-auto" style={{marginTop:'30px'}} onClick={placeOrder}>Place Order</Button>
                </Link>
          </Form>
          </Stack>
      </div>
    </div>
  )
}