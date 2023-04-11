import 'bootstrap/dist/css/bootstrap.min.css';
import logo from './logo-tran.png';
import VBCplaceholder from './VBC.jpg';
import { Stack, Image, Form, Card, Button } from 'react-bootstrap';
import {Route, Routes, Link } from 'react-router-dom';
import { visitFunctionBody } from 'typescript';

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
            
            <Stack className="mb-5" direction='horizontal' style={{justifyContent:'center'}} gap={3}>
              <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={VBCplaceholder}/>
                <Card.Body>
                  <Card.Title>Small Event 1</Card.Title>
                  <Card.Text>
                    Civic Center Playhouse
                  </Card.Text>
                  <Link 
                    to={"/seatSelection"}
                    state={{event: "SmallEvent1"}}>
                    <Button variant="primary">
                          Purchase Tickets
                    </Button>
                  </Link>
                </Card.Body>
              </Card>

              {/*Cards*/}
              
              <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={VBCplaceholder}/>
                <Card.Body>
                  <Card.Title>Small Event 2</Card.Title>
                  <Card.Text>
                    Civic Center Playhouse
                  </Card.Text>
                  <Link 
                    to={"/seatSelection"}
                    state={{event: "SmallEvent2"}}>
                    <Button variant="primary">
                          Purchase Tickets
                    </Button>
                  </Link>
                </Card.Body>
              </Card>

              <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={VBCplaceholder}/>
                <Card.Body>
                  <Card.Title>Large Event 1</Card.Title>
                  <Card.Text>
                    Civic Center Concert Hall
                  </Card.Text>
                  <Link 
                    to={"/seatSelection"}
                    state={{event: "LargeEvent1"}}>
                    <Button variant="primary">
                          Purchase Tickets
                    </Button>
                  </Link>
                </Card.Body>
              </Card>
            </Stack>
          </div>
        </Stack>
      </div>
    )
}