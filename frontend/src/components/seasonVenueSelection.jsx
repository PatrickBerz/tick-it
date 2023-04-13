import 'bootstrap/dist/css/bootstrap.min.css';
import { Stack, Image, Form } from 'react-bootstrap';
import {useLocation, Link } from 'react-router-dom';

export const SeasonVenueSelection = () =>{
    //TODO: try catch
    const location = useLocation();
    const state = location.state;
    return (
        <div className='App-body'>
        <Stack direction='vertical' style={{alignItems:'center', marginTop:'30px'}} gap={1}>
          <div>
          <Form style={{color:'white'}}>Select a venue</Form>
            <p style={{color:'white'}}></p>
            </div>
            <div>
            
                <Link 
                to={"/seasonSeatSelection"}
                state={{venue: "Playhouse"}}>
                <button type="button">
                        Playhouse
                </button>
                </Link>
                <Link 
                to={"/seasonSeatSelection"}
                state={{venue: "Concert Hall"}}>
                <button type="button">
                        Concet Hall
                </button>
                </Link>
            </div>
        </Stack>
      </div>
    )
}