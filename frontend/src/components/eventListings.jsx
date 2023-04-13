import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Stack,Button, Alert, Table } from 'react-bootstrap';
import React, {useState} from 'react';

export const EventListings = () =>{
    
    // Perf name, venue name, date/time, array of tickets
    return (
        <div style={{maxWidth:'100%', maxHeight:'100%', alignSelf:'center'}}>
        <Stack direction='vertical' gap={2}>
            <div className='d-flex-inline' style={{margin:'40px'}}>
                
            </div>
            <Table align='center' bordered responsive striped hover variant='dark' size='sm' style={{maxWidth:'90%', maxHeight:'70%'}}>
                <thead><tr><th style={{textAlign:'center', fontSize:'20px'}} colSpan={6}>
                    Ticket Orders 
                    <Button className='border-2-light' variant="dark">
                        Create Event
                    </Button></th>
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
    </div>
    
    )   
}