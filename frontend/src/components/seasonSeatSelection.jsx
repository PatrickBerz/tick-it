import 'bootstrap/dist/css/bootstrap.min.css';
import { Stack, Image, Form, Button, ListGroup } from 'react-bootstrap';
import { useEffect, useState, useRef } from "react";
import {useLocation, Link, useNavigate } from 'react-router-dom';
import {ReactComponent as Playhouse} from './playhouseSeatsSeason.svg';
import {ReactComponent as ConcertHall} from './concertHallSeason.svg';

export const SeasonSeatSelection = () => {
  // Load previous state
  const location = useLocation();
  const state = location.state;

  // States
  const [listData, setListData] = useState([]); // controls the visual list of seats
  const [isDisabled, setDisabled] = useState(true); // controls whether the checkout button is disabled
  const [takenSeatData, setTakenSeatData] = useState([]) // controls the taken seats from 

  // Used for referencing the svg again
  const playhouseRef = useRef(null);
  const concertHallRef = useRef(null);
  const navigate = useNavigate();

  /*
  * FUNCTION load the correct component depending on the venue state
  * RETURN the react component containing the correct SVG, or otherwise an error statement
  */
  const loadVenueSVG = () =>{
    if (state.venue == "Playhouse"){
      return (
        <Playhouse style={{maxWidth:'100vh', marginTop:'60px'}} onClick={handleClickMap} ref={playhouseRef} />
      )
    } else if (state.venue == "Concert Hall") {
      return (
        <ConcertHall style={{maxWidth:'100vh'}} onClick={handleClickMap} ref={concertHallRef} />
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
  // Cycle through the takenSeatData array, assemble the id strings, check against svg
  console.log("takenSeatData: ", takenSeatData)

  console.log("length of takenSeatData: ", takenSeatData.length); // DEBUG
  for (let i=0; i<takenSeatData.length; i++){
    
    // Use the JSON seat object to assemble a string representation of the seat id
    const thisSeatSection = takenSeatData[i].seatAssignment.section;
    const thisSeatRow = takenSeatData[i].seatAssignment.row;
    const thisSeatNum = takenSeatData[i].seatAssignment.seatNum;

    // Concat a string with the section, row, num to create the seat id
    var thisSeatID = "";
    thisSeatID = thisSeatID.concat(thisSeatSection, "-", thisSeatRow, "-", thisSeatNum);
    console.log("SEAT ID TO SEARCH SVG FOR: ", thisSeatID);

    
    if (state.venue=="Playhouse"){
      console.log("WOAH!");
      // Do stuff to grab the OG SVG
      const playhouseSvg = playhouseRef.current;
      const seatElement = playhouseSvg.getElementById(thisSeatID);
      // Mark this seat as taken
      if(seatElement){
        seatElement.classList.add("taken");
      }
    } else if (state.venue=="Concert Hall") {
      // Do stuff to grab the OG SVG
      const concertHallSvg = concertHallRef.current;
      const seatElement = concertHallSvg.getElementById(thisSeatID);
      // Mark this seat as taken
      if(seatElement){
        seatElement.classList.add("taken");
      }
    } else {
      //throw error
      console.log("DANGER, Will Robinson");
    }
  }
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
    navigate('/seasonPass', {state: {case: "season", venue: state.venue, seat: seat.id}})
    
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
  * FUNCTION handler for removing a list item using the button component
  const handleRemoveButton = (index) => {
    console.log("wants to remove this one: ", listData[index]); // DEBUG
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
  * FUNCTION handles the onClick event when a user clicks on the svg map
  * PARAM the event variable
  */
  const handleClickMap = (e) => {
    // As long as what they clicked IS a seat, is NOT taken, and IS a season pass seat...
    if (e.target.classList.contains("seat") && !e.target.classList.contains("taken") && e.target.classList.contains("season")) {
      // Make sure the checkout button is disabled until they confirm their choices again
      setDisabled(true);
      // Do clicking a seat stuff
      seatClicked(e);
    } else {
      // Otherwise, don't do anything
    }
  };
  
  /*
  * USEEFFECT only on the first render, grab the season tickets from backend
  */
  useEffect(() => {
    const fetchData = async () => {
        const response = await fetch('http://localhost:4000/seasonTickets')
        const newData = await response.json()
        console.log("newData: ", JSON.stringify(newData))
        setTakenSeatData(newData)
    }
    fetchData();
  }, []);

  /*
  * RETURN create visual components here
  */
  return (
      <div className='App-body'>
        <Stack direction='horizontal' style={{justifyContent:'center'}} gap={5}>

          {/**load the correct venue SVG for use*/}
          {loadVenueSVG()}
          {checkTakenSeats()}

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
            
            <Link 
              to={"/checkOut"}
              style={{color:'white', textDecoration:'none'}} 
              state={{ case: state.case, venue: state.venue }}>
                <Button variant="primary">Check Out</Button>
            </Link>

          </div>

        </Stack>
      </div>
    )
}