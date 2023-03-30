import 'bootstrap/dist/css/bootstrap.min.css';
import { Stack, Image, Form } from 'react-bootstrap';
import {useLocation, Link } from 'react-router-dom';

export const CheckOut = () =>{
    //TODO: try catch
    const location = useLocation();
    const state = location.state;
    return (
        <div className='App-body'>
        <Stack direction='vertical' style={{alignItems:'center'}} gap={1}>
          <div>
          <Form style={{color:'white'}}>Check Out!</Form>
            <p style={{color:'white'}}>Event: {state.event}</p>
            <p style={{color:'white'}}>Seat: {state.seat}</p>
            </div>
            <div>
            
                <Link 
                to={"/orderConfirmation"}
                state={{event: state.event, seat: state.seat}}>
                <button type="button">
                        Place order
                </button>
                </Link>

            </div>
        </Stack>
      </div>
    )
}