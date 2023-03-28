import 'bootstrap/dist/css/bootstrap.min.css';
import { Stack, Image, Form } from 'react-bootstrap';
import {useLocation, Link } from 'react-router-dom';

export const SeatSelection = () =>{
    //TODO: try catch
    const location = useLocation();
    const state = location.state;
    return (
        <div className='App-body'>
        <Stack direction='vertical' style={{alignItems:'center'}} gap={1}>
          <div>
          <Form style={{color:'white'}}>Select a seat!</Form>
            <p style={{color:'white'}}>Event: {state.event}</p>
            </div>
            <div>
            
                <Link 
                to={"/checkOut"}
                state={{event: state.event, seat: "Seat1"}}>
                <button type="button">
                        Seat 1
                </button>
                </Link>
                
                <Link 
                to={"/checkOut"}
                state={{event: state.event, seat: "Seat2"}}>
                <button type="button">
                        Seat 2
                </button>
                </Link>
                
                <Link 
                to={"/checkOut"}
                state={{event: state.event, seat: "Seat3"}}>
                <button type="button">
                        Seat 3
                </button>
                </Link>

            </div>
        </Stack>
      </div>
    )
}