import 'bootstrap/dist/css/bootstrap.min.css';
import { Stack, Button, ListGroup } from 'react-bootstrap';
import { useEffect, useState, useRef } from "react";
import { useLocation, Link } from 'react-router-dom';
import { ReactComponent as Playhouse } from './seatmaps/playhouseSeats.svg';
import { ReactComponent as ConcertHall } from './seatmaps/concertHall.svg';


export const SeatSelection = () => {
  // Load previous state
  const location = useLocation();
  const state = location.state;

  const [listData, setListData] = useState([]); // controls the visual list of seats
  const [takenSeatData, setTakenSeatData] = useState([]) // controls the taken seats from 

  // Used for referencing the SVGs
  const playhouseRef = useRef(null);
  const concertHallRef = useRef(null);

  /*
  * FUNCTION load the correct component depending on the venue state
  * RETURN the react component containing the correct SVG, or otherwise an error statement
  */
  const loadVenueSVG = () => {
    if (state.venue == "Playhouse") {
      return (
        <Playhouse style={{ maxWidth: '100vh', marginTop: '60px' }} onClick={handleClickMap} ref={playhouseRef} />
      )
    } else if (state.venue == "Concert Hall") {
      return (
        <ConcertHall style={{ maxWidth: '100vh' }} onClick={handleClickMap} ref={concertHallRef} />
      )
    } else {
      return (
        <div>
          <p style={{ color: "white" }}>Error! Could not load venue. Please return to home and try again.</p>
          <Link to="../">
            <Button variant="primary">Return to Home</Button>
          </Link>
        </div>
      )
    }
  }

  /*
  * FUNCTION check whether there is a seat currently selected
  * RETURN Boolean
  */
  const isSelected = () => {
    if (listData.length === 0){
      return true // a seat is selected, enable checkout button
    }
    else{
      return false // no seats are selected, disable checkout button
    }
  }

  /*
  * FUNCTION check whether this is an exchange or purchase
  * RETURN the correct checkout link element depending on the case
  */
  const checkCase = () => {
    if (state.case === 'exchange') {
      return (
        <Link className='mt-2'
          to={"/exchangeCheckOut"}
          style={{ color: 'white', textDecoration: 'none' }}
          state={{
            confNum:state.confNum, case: state.case, event: state.event, venue: state.venue, dateTime: state.datetime,
            name: state.name, email: state.email, phoneNum: state.phoneNum, oldSeats: state.oldSeats, seats: listData
          }}>
          <Button hidden={isSelected()} variant="primary">Check Out</Button>
        </Link>
      )
    }
    else if (state.case == 'purchase') {
      return (
        <Link className='mt-2'
          to={"/checkOut"}
          style={{ color: 'white', textDecoration: 'none' }}
          state={{
            case: state.case, event: state.event, venue: state.venue, dateTime: state.datetime, seats: listData
          }}>
          <Button hidden={isSelected()} variant="primary">Check Out</Button>
        </Link>
      )
    }
  }

  /*
  * FUNCTION check which seats are taken and add the corresponding class
  */
  const checkTakenSeats = () => {
    // Cycle through the takenSeatData array, assemble the id strings, check against svg
    for (let i = 0; i < takenSeatData.length; i++) {

      // Use the JSON seat object to assemble a string representation of the seat id
      const thisSeatSection = takenSeatData[i].section;
      const thisSeatRow = takenSeatData[i].row;
      const thisSeatNum = takenSeatData[i].seatNum;

      // Concat a string with the section, row, num to create the seat id
      var thisSeatID = "";
      thisSeatID = thisSeatID.concat(thisSeatSection, "-", thisSeatRow, "-", thisSeatNum);

      // Do stuff to grab the OG SVG
      if (state.venue == "Playhouse") {
        const playhouseSvg = playhouseRef.current;
        const seatElement = playhouseSvg.getElementById(thisSeatID);
        // Mark this seat as taken
        seatElement.classList.add("taken");
      } else if (state.venue == "Concert Hall") {
        const concertHallSvg = concertHallRef.current;
        const seatElement = concertHallSvg.getElementById(thisSeatID);
        // Mark this seat as taken
        seatElement.classList.add("taken");
      } else {
        //console.log("Error: Could not load taken seats"); // DEBUG
      }
    }
  }

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
    const newData = [...listData];
    var i = newData.indexOf(seat.id); // Find it
    newData.splice(i, 1); // Remove it
    setListData(newData);
  }

  /*
  * FUNCTION what happens when a seat is clicked
  * PARAM the event variable
  */
  const seatClicked = (e) => {
    // If the seat is not already selected
    if (!e.target.classList.contains("selected")) {
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
    // As long as what they clicked IS a seat, is NOT taken, and is NOT a season pass seat...
    if (e.target.classList.contains("seat") && !e.target.classList.contains("taken") && !e.target.classList.contains("season")) {
      // Do clicking a seat stuff
      seatClicked(e);
    } else {
      // Otherwise, don't do anything
    }
  };


  /*
  * USEEFFECT only runs on first render
  */
  useEffect(() => {
    const fetchData = async () => {

      // Create a JSON object of the current performance to send to backend server
      let currentPerformance =
      {
        performance: {
          performanceName: state.event,
          venueName: state.venue,
          dateTime: state.datetime
        }
      }

      // Fetch the taken seats of the current performance from database
      const promise = fetch('http://localhost:4000/currentPerformance', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPerformance })
      })
        .then(
          response => response.json(),
          error => console.log('An error occured', error)
        )
        .then(res =>
          setTakenSeatData(res)
        )
    }
    fetchData();
  }, []);

  /*
  * RETURN create visual components
  */
  return (
    <div className='App-body'>
      <Stack direction='horizontal' style={{ justifyContent: 'center', alignItems: 'start', marginTop: '10px' }} gap={5}>

        {/** Load the correct SVG and check for taken seats*/}
        {loadVenueSVG()}
        {checkTakenSeats()}

        <div className="d-grid gap-2" style={{ marginTop: "50px" }}>
          {/**List of selected seats, updates automatically*/}
          <ListGroup>
            <ListGroup.Item><h2>Selected Seats</h2></ListGroup.Item>
            <ListGroup.Item><i>Click seat again to remove</i></ListGroup.Item>
            <div style={{ maxHeight: '400px', overflowY: 'scroll' }}>
              {listData.map((item, index) => (
                <ListGroup.Item key={index}>
                  {item}
                </ListGroup.Item>
              ))}
            </div>
            {/**Load checkout button based on case (purchase/exchange) */}
            {checkCase()}
          </ListGroup>
        </div>
      </Stack>
    </div>
  )
}