import 'bootstrap/dist/css/bootstrap.min.css';
import logo from './logo-tran.png';
import { Stack, Image, Form } from 'react-bootstrap';

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
        </Stack>
      </div>
    )
}