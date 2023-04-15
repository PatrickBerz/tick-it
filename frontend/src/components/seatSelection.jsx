import 'bootstrap/dist/css/bootstrap.min.css';
import { Stack, Image, Form, Button, ListGroup } from 'react-bootstrap';
import { useState } from "react";
import {useLocation, Link } from 'react-router-dom';
import {ReactComponent as Playhouse} from './playhouseSeats.svg';

export const SeatSelection = () =>{
  //Load the previous state containing the venue name
  const location = useLocation();
  const state = location.state;

  const [passState, setState] = useState({case:'',event:'',venue:'', date:''});
  const [seatIDs, setSeatIDs] = useState("ERROR!");

  //checkout button initially disabled
  const [isDisabled, setDisabled] = useState(true);

  //Load the correct venue SVG for use in selecting seats
  const loadVenueSVG = () =>{
    if (state.venue == "playhouse"){
      return (
        <Playhouse style={{maxWidth:'100vh'}} onClick={checkSeat} />
      )
    } else {
      return (
        <p>Concert Hall here</p>
      )

    }
  }

  const selectedSeats = []; // stores the selected seats to be passed to checkout

  const handleClickSeat = (e) =>{
    console.log('Congrats! You clicked this seat: ', e.target.id)
    // If not active, turn the clicked seat to active by adding the active class
    // Add the seat to an array of selected seats
    if (!e.target.classList.contains("active")){
      //add active class to e target
      e.target.classList.add("active");
      //add this seat to an array of selected seats
      selectedSeats.push(e.target);
    } else {
      //remove active class from e target
      e.target.classList.remove("active");
      //remove this seat from the array of selected seats
      //not working right, rework this
      var i = selectedSeats.indexOf(e.target); //find it
      selectedSeats.splice(i, 1); //remove it without leaving holes in the array
    }
  }

  const checkSeat = (e) => {
    //Did user just click a seat? Was it taken?
    if (e.target.classList.contains("seat") && !e.target.classList.contains("taken")) {
      //Disable the checkout button! A change was made! They'll need to confirm choices again
      setDisabled(true);
      //Is a seat and not taken
      handleClickSeat(e)
    } else {
      //Is not a seat or is taken
      console.log('Click a free seat next time, bud')
    }
  };

  const generateSeatList = () => {
    var str = "";
    for (let i=0; i<selectedSeats.length; i++) {
        //concat a string
        str = str.concat(" " + selectedSeats[i].id)
    }
    //enable button
    setSeatIDs(str);
    setDisabled(false);
  }

  const createList = () => {
    return (
      selectedSeats.map((item) => (
                  
        <ListGroup.Item>{item}.id</ListGroup.Item>

      ))
    )
  }

    return (
        <div className='App-body'>
          <Stack direction='horizontal' style={{justifyContent:'center'}} gap={5}>

            {/**load the correct venue SVG for use*/}
            {loadVenueSVG()} 

            <div className="d-grid gap-2">

            {/**display a list of selected seats*/}
              <ListGroup>
                <ListGroup.Item><h2>Selected Seats</h2></ListGroup.Item>
                <ListGroup.Item><i>Press Refresh to update</i></ListGroup.Item>
                {createList()}
              </ListGroup>

              {/**Submit buttons*/}
              <Button variant="success" onClick={generateSeatList}>
                Refresh Selection
              </Button>

              <Button variant="primary" disabled={isDisabled}>
                <Link 
                  to={"/checkOut"}
                  style={{color:'white', textDecoration:'none'}} 
                  state={{event: state.event, venue: state.venue, seats: seatIDs}}>
                    Check Out
                </Link>
              </Button>
            </div>
          </Stack>
        </div>
      )
}