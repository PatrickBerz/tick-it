import 'bootstrap/dist/css/bootstrap.min.css';
import { Stack, Button, ListGroup } from 'react-bootstrap';
import { useEffect, useState, useRef } from "react";
import {useLocation, Link, useNavigate } from 'react-router-dom';
import {ReactComponent as Playhouse} from './seatmaps/playhouseSeatsSeason.svg';
import {ReactComponent as ConcertHall} from './seatmaps/concertHallSeason.svg';

export const SeasonSeatSelection = () => {
  // Load previous state
  const location = useLocation();
  const state = location.state;

  const [takenSeatData, setTakenSeatData] = useState([]) // Controls the list of taken seats

  // Used for referencing the svg again
  const playhouseRef = useRef(null);
  const concertHallRef = useRef(null);

  // Used for navigating inside a function
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
  for (let i=0; i<takenSeatData.length; i++){
    
    // Use the JSON seat object to assemble a string representation of the seat id
    const thisSeatSection = takenSeatData[i].seatAssignment.section;
    const thisSeatRow = takenSeatData[i].seatAssignment.row;
    const thisSeatNum = takenSeatData[i].seatAssignment.seatNum;

    // Concat a string with the section, row, num to create the seat id
    var thisSeatID = "";
    thisSeatID = thisSeatID.concat(thisSeatSection, "-", thisSeatRow, "-", thisSeatNum);
    
    if (state.venue=="Playhouse"){
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
      //console.log("Error: Could not load taken seats"); // DEBUG
    }
  }
 }

  /*
  * FUNCTION adds an item to the end of the list
  * PARAM the seat (event.target) to be added
  */
  const handleAddToList = (seat) => {
    // Add the selected class to this seat SVG element
    navigate('/seasonPassCheckout', {state: {case: "season", venue: state.venue, seat: seat.id}})
  }

  /*
  * FUNCTION what happens when a seat is clicked
  * PARAM the event variable
  */
  const seatClicked = (e) =>{
      handleAddToList(e.target);
  }

  /*
  * FUNCTION handles the onClick event when a user clicks on the svg map
  * PARAM the event variable
  */
  const handleClickMap = (e) => {
    // As long as what they clicked IS a seat, is NOT taken, and IS a season pass seat...
    if (e.target.classList.contains("seat") && !e.target.classList.contains("taken") && e.target.classList.contains("season")) {
      // Do clicking a seat stuff
      seatClicked(e);
    } else {
      // Otherwise, don't do anything
    }
  };
  
  /*
  * USEEFFECT only on the first render to grab the taken season tickets from backend
  */
  useEffect(() => {
    const fetchData = async () => {
        const response = await fetch('http://localhost:4000/seasonTickets')
        const newData = await response.json()
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
              <ListGroup.Item><h2>Select a Season Pass seat</h2></ListGroup.Item>
              <ListGroup.Item><i>Click a seat to checkout</i></ListGroup.Item>
            </ListGroup>
          </div>
        </Stack>
      </div>
    )
}