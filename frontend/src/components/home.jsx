import 'bootstrap/dist/css/bootstrap.min.css';
import logo from './logo-tran.png';
import { Stack, Image, Form } from 'react-bootstrap';
import {Route, Routes, Link } from 'react-router-dom';

export const Home = () =>{
    return (
        <div className='App-body'>
        <Stack direction='vertical' style={{alignItems:'center'}} gap={1}>
          <Image src={logo} className='App-logo-big' style={{marginTop:'-60px'}}></Image>
          <div>
            <Form.Control
            placeholder="Enter to search for event"
            id="searchInput"
            style={{marginTop:'-70px', width:'50vmin'}}
            />
          </div> 
          <div>
            <p style={{color:'white'}}>
              show events here
            </p>
          </div> 
          <div>

            <Link 
              to={"/seatSelection"}
              state={{event: "SmallEvent1"}}>
              <button type="button">
                    Small Event 1
              </button>
            </Link>

            <Link 
              to={"/seatSelection"}
              state={{event: "SmallEvent2"}}>
              <button type="button">
                    Small Event 2
              </button>
            </Link>
            
            <Link 
              to={"/seatSelection"}
              state={{event: "LargeEvent1"}}>
              <button type="button">
                    Large Event 1
              </button>
            </Link>
          </div>
        </Stack>
      </div>
    )
}