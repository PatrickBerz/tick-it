import 'bootstrap/dist/css/bootstrap.min.css';
import { Stack, Image, Form, Button } from 'react-bootstrap';
import {useLocation, Link } from 'react-router-dom';

export const SeasonVenueSelection = () =>{
    return (
        <div className='App-body'>
        <Stack direction='vertical' style={{alignItems:'center', marginTop:'60px'}} gap={5}>
          <div>
            <h1 style={{color:'white', marginTop:'60px', textAlign: "center"}}>Select a venue</h1>
            <p style={{color:'white', textAlign: "center"}}><i>Season Pass tickets may be renewed annually</i></p>
            </div>
            <div>
              
              <Stack direction='horizontal' gap={5}>
            
                <Link 
                to={"/seasonSeatSelection"}
                state={{venue: "Playhouse"}}>
                <Button type="button" variant="primary">
                        Playhouse
                </Button>
                </Link>
                <Link 
                to={"/seasonSeatSelection"}
                state={{venue: "Concert Hall"}}>
                <Button type="button" variant="primary">
                        Concert Hall
                </Button>
                </Link>

                </Stack>
            </div>
        </Stack>
      </div>
    )
}