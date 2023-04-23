import 'bootstrap/dist/css/bootstrap.min.css';
import { Stack, Image, Form, Button } from 'react-bootstrap';
import {useLocation, Link } from 'react-router-dom';

export const OrderConfirmation = () =>{
    //TODO: try catch
    const {state} = useLocation();
    const price = state.price
    //const state = location.state;
    console.log(price);
    return (
        <div className='App-body'>
        <Stack direction='vertical' style={{alignItems:'center'}} gap={1}>
          <div>
          <h1 style={{color:'white', marginTop: '60px'}}>Order Confirmed!</h1>        
          <h2 style={{color:'white', marginTop: '10px'}}>Total: {price}</h2>

          <p style={{color:'white'}}><i>Please check in at least 15 minutes before your show time.</i></p>
            </div>
            <div>
            
                <Link 
                to={"/"}>
                <Button type="button" variant="primary">
                    Return to Home
                </Button>
                </Link>

            </div>
        </Stack>
      </div>
    )
}