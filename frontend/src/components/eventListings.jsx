import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Stack,Button, Alert, Table, Modal, FormGroup } from 'react-bootstrap';
import React, {useState} from 'react';

export const EventListings = () =>{
    const [showModal, setShow] = useState(false);
    const [alert, setAlert] = useState(undefined);
    const [value, setValue] = useState('');


    const confNumModal = () => {
        setShow(true)
    };
    const handleClose = () => {
        setShow(false)
        setAlert(undefined); 
    }
    const onFormSubmit = (e) => {
        e.preventDefault();
        setValue(value);
        console.log(value);
        
        const promise = fetch('http://localhost:4000/confNum', {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({value})
        });
        console.log(promise)
        promise.then(event => {
            if (event.status === 200) {
              setAlert({ label: 'success', type: 'success' })
              
            } else {
              setAlert({ label: `Error ${event.statusText}`, type: 'danger' })
            }
          })
        }

    // Perf name, venue name, date/time, array of tickets
    return (
        <div className='border border-light-2' style={{maxWidth:'100%', maxHeight:'100%', alignSelf:'center', marginTop:'60px', paddingLeft:'25px', paddingRight:'25px'}}>
        <Stack direction='vertical' style={{marginTop:'40px'}} gap={2}>
            <div >
                <Button style={{
                        borderColor: '#FF4057', 
                        backgroundColor:'#FF4057',
                        }} 
                        onClick={confNumModal}>
                    Create Event
                </Button>
            </div>
            <Table align='center' bordered responsive striped hover variant='dark' size='sm' style={{maxHeight:'70%'}}>
                <thead><tr><th style={{textAlign:'center', fontSize:'20px'}} colSpan={6}>
                    Ticket Orders 
                    </th>
                    </tr>
                </thead>
                    <tbody style={{ fontSize: '20px', color: "white"}}>
                    <tr>
                        <th style={{textAlign:'center'}}>Performance</th>
                        <th style={{textAlign:'center'}}>Venue</th>
                        <th style={{textAlign:'center'}}>Date</th>
                        <th style={{textAlign:'center'}}>Seats Left</th>
                    </tr>
                    
                        {/* {data.map((item, index) => (
                        <tr key={index} style={{alignItems:'center'}}>
                            <td style={{textAlign:'center'}}>{item.ticket.confNum}</td>
                            <td>{item.ticket.purchaser.first} </td>
                            <td>{item.ticket.purchaser.last} </td>
                            <td>{item.ticket.performance}</td>
                            <td style={{textAlign:'center'}}>{item.ticket.seat.seatNum}</td>
                            <td style={{textAlign:'center'}}>{item.ticket.paymentStatus}</td>
                        </tr>
                    ))} */}
                    
                </tbody>
            </Table>
       </Stack>
       <Modal show={showModal} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Enter Confirmation Number</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <p>Enter the Confirmation Number given to you with your purchase</p>
                <Form onSubmit={onFormSubmit}>
                  <FormGroup>
                  <Form.Control
                    type="name" 
                    placeholder="Confirmation Number" 
                    onChange={(e) => setValue(e.target.value)} 
                    value={value}
                    />
                  </FormGroup>
                  {alert &&
                        <Alert style={{ maxWidth: '200px', marginTop:5, paddingTop:'2px', maxHeight:'30px', }} key={alert.type} variant={alert.type}>
                        {alert.label}
                        </Alert>
                    }
                </Form>
                <Button  className="me-0" type='submit' variant="success" onClick={onFormSubmit}>                
                  Enter 
                </Button>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                
              </Modal.Footer>
            </Modal>
    </div>
    
    )   
}