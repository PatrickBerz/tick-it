import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Stack,Button, Alert, Table } from 'react-bootstrap';
import React, {useState} from 'react';

export const Listings = () =>{
    

    return (
        <div style={{maxWidth:'100%', maxHeight:'100%', alignSelf:'center'}}>
        <Table align='center' bordered responsive striped hover variant='dark' size='sm' style={{maxWidth:'90%', maxHeight:'70%', marginTop:'100px'}}>
            <thead><tr><th style={{textAlign:'center', fontSize:'20px'}} colSpan={6}>Ticket Orders</th></tr></thead>
                <tbody style={{ fontSize: '20px', color: "white"}}>
                <tr>
                    <th style={{textAlign:'center'}}>Performance</th>
                    <th style={{textAlign:'center'}}>Venue</th>
                    <th style={{textAlign:'center'}}>Date</th>
                    <th style={{textAlign:'center'}}>Seats Sold?</th>
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
       
    </div>
    
    )   
}