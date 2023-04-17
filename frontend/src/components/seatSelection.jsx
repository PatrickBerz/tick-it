import 'bootstrap/dist/css/bootstrap.min.css';
import { Stack, Image, Form, Button, ListGroup } from 'react-bootstrap';
import { useEffect, useState } from "react";
import {useLocation, Link } from 'react-router-dom';
import {ReactComponent as Playhouse} from './playhouseSeats.svg';
import {ReactComponent as ConcertHall} from './concertHall.svg';


export const SeatSelection = () =>{
  //Load the previous state containing the venue name
  const location = useLocation();
  const state = location.state;

  const [passState, setState] = useState({case:'',event:'',venue:'', date:''});
  const cart = []; // stores the selected seats to be passed to checkout
  const [seatIDs, setSeatIDs] = useState("ERROR!");

  //checkout button initially disabled
  const [isDisabled, setDisabled] = useState(true);

  //Load the correct venue SVG for use in selecting seats
  const loadVenueSVG = () =>{
    if (state.venue == "Civic Center Playhouse"){
      return (
        <Playhouse style={{maxWidth:'100vh'}} onClick={checkSeat} />
      )
    } else {
      return (
        <ConcertHall style={{maxWidth:'100vh'}} onClick={checkSeat} />
      )
    }
  }

  const handleClickSeat = (e) =>{
    console.log('Congrats! You clicked this seat: ', e.target.id)
    // If not active, turn the clicked seat to active by adding the active class
    // Add the seat to an array of selected seats
    if (!e.target.classList.contains("active")){
      //add active class to e target
      e.target.classList.add("active");
      //add this seat to an array of selected seats
      cart.push(e.target);
    } else {
      //remove active class from e target
      e.target.classList.remove("active");
      //remove this seat from the array of selected seats
      var i = cart.indexOf(e.target); //find it
      cart.splice(i, 1); //remove it without leaving holes in the array
    }
  }

  const checkSeat = (e) => {
    //Did user just click a seat? Was it taken? Was it a season pass seat?
    if (e.target.classList.contains("seat") && !e.target.classList.contains("taken") && !e.target.classList.contains("season")) {
      //Disable the checkout button! A change was made! They'll need to confirm choices again
      setDisabled(true);
      //Is a seat and not taken and not season
      handleClickSeat(e)
    } else {
      //Is not a seat or is taken
      console.log('Click a free seat next time, bud')
    }
  };

  const generateSeatList = () => {
    var str = "";
    for (let i=0; i<cart.length; i++) {
        //concat a string
        str = str.concat(" | " + cart[i].id)
    }
    setSeatIDs(str);
    //enable button
    setDisabled(false);
  }

  const createList = () => {
    return (
      cart.map((item) => (
        <ListGroup.Item key={item}>{item}.id</ListGroup.Item>
      ))
    )
  }

  useEffect(()=>{
    })

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
                <div id="reloadThis">{createList()}</div>
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
