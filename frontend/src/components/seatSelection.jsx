import 'bootstrap/dist/css/bootstrap.min.css';
import { Stack, Image, Form, Button, ListGroup } from 'react-bootstrap';
import { useEffect, useState } from "react";
import {useLocation, Link } from 'react-router-dom';
import {ReactComponent as Playhouse} from './playhouseSeats.svg';
import {ReactComponent as ConcertHall} from './concertHall.svg';


export const SeatSelection = () =>{
  // Load previous state
  const location = useLocation();
  const state = location.state;

  // States
  const [passState, setState] = useState({case: state.case,event: state.event, venue: state.venue, date: state.date, seats: []}); // controls the state to be passed to checkout
  //const cart = []; // stores the currently selected seats (full objects)
  //const [seatIDs, setSeatIDs] = useState("ERROR!"); // controls the string of seats passed to checkout
  const [listData, setListData] = useState([]); // controls the visual list of seats
  const [isDisabled, setDisabled] = useState(true); // controls whether the checkout button is disabled

  /*
  * FUNCTION load the correct component depending on the venue state
  * RETURN the react component containing the correct SVG, or otherwise an error statement
  */
  const loadVenueSVG = () =>{
    if (state.venue == "Civic Center Playhouse"){
      return (
        <Playhouse style={{maxWidth:'100vh'}} onClick={handleClickMap} />
      )
    } else if (state.venue == "Civic Center Concert Hall") {
      return (
        <ConcertHall style={{maxWidth:'100vh'}} onClick={handleClickMap} />
      )
    } else {
      return (
        <div>
          <p style={{color: "white"}}>Error! Could not load venue. Please return to home and try again.</p>
          <Link to="../">
            <Button variant="primary">Return to Home</Button>
          </Link>
        </div>
      )
    }
  }

  /*
  * FUNCTION check which seats are taken and add the corresponding class
  */
 const checkTakenSeats = () => {
    //fetch
 }

 
  /*
  * FUNCTION if the cart is empty, disable the checkout button
  
  const checkIfCartEmpty = () => {
    if (listData.length == 0) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
 }*/

  /*
  * FUNCTION adds an item to the end of the list
  * PARAM the sseat (event.target) to be added
  */
  const handleAddToList = (seat) => {
    // Add the selected class to this seat SVG element
    seat.classList.add("selected");
    // Add this seat to the cart
    //cart.push(seat.id);
    setListData([...listData, seat.id]);
  }
  
  /*
  * FUNCTION removes an item from the list
  * PARAM the seat (event.target) to be removed
  */
  const handleRemoveFromList = (seat) => {
    // Remove the selected class from the SVG element
    seat.classList.remove("selected");
    // Remove this seat from the cart
    //var i = cart.indexOf(seat.id); // Find it
    //cart.splice(i, 1); // Remove it

    const newData = [...listData];
    var i = newData.indexOf(seat.id); // Find it
    newData.splice(i, 1); // Remove it
    setListData(newData);
  }

  /*
  const handleRemoveButton = (index) => {
    console.log("wants to remove this one: ", listData[index]);
    //handleRemoveFromList(listData[index]);
    var x = venue.getElementById(listData[index]);
    console.log("trying to remove this object: ", x);
  }*/

  /*
  * FUNCTION what happens when a seat is clicked
  * PARAM the event variable
  */
  const seatClicked = (e) =>{
    // If the seat is not already selected
    if (!e.target.classList.contains("selected")){
      // Add this seat to the list
      handleAddToList(e.target);
    } else {
      handleRemoveFromList(e.target);
    }
  }


  /*
  * FUNCTION
  const generateSeatList = () => {
    var str = "";
    for (let i=0; i<cart.length; i++) {
        //concat a string
        str = str.concat(" | " + cart[i].id)
    }
    setSeatIDs(str);
    console.log(listData);
    //enable checkout button
    setDisabled(false);
  }
  */

  /*
  * FUNCTION handles the onClick event when a user clicks on the svg map
  * PARAM the event variable
  */
  const handleClickMap = (e) => {
    // As long as what they clicked IS a seat, is NOT taken, and is NOT a season pass seat...
    if (e.target.classList.contains("seat") && !e.target.classList.contains("taken") && !e.target.classList.contains("season")) {
      // Make sure the checkout button is disabled until they confirm their choices again
      setDisabled(true);
      // Do clicking a seat stuff
      seatClicked(e);
    } else {
      // Otherwise, don't do anything
    }
  };

  /*
  * RETURN create visual components here
  */
  return (
      <div className='App-body'>
        <Stack direction='horizontal' style={{justifyContent:'center'}} gap={5}>

          {/**load the correct venue SVG for use*/}
          {loadVenueSVG()} 

          <div className="d-grid gap-2">
            {/**List of selected seats, updates automatically*/}
            <ListGroup>
              <ListGroup.Item><h2>Selected Seats</h2></ListGroup.Item>
              <ListGroup.Item><i>Click seat again to remove</i></ListGroup.Item>
              {listData.map((item, index) => (
                <ListGroup.Item key={index}>
                  {item}
                  {/*<Button className="ms-2 btn-sm" variant="danger" onClick={() => handleRemoveButton(index)}>
                    Remove
                  </Button>*/}
                </ListGroup.Item>
              ))}
            </ListGroup>

            {/**Submit buttons
            <Button variant="success" onClick={generateSeatList}>
              Refresh Selection
            </Button>*/}
            
            <Link 
              to={"/checkOut"}
              style={{color:'white', textDecoration:'none'}} 
              state={{event: state.event, venue: state.venue, seats: listData}}>
                <Button variant="primary">Check Out</Button>
            </Link>

          </div>

        </Stack>
      </div>
    )
}