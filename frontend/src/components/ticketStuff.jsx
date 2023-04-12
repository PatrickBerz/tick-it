import { Form, Stack,Button, Alert } from 'react-bootstrap';
import React, {Table, useState, useEffect} from 'react';


export const TicketStuff = () =>{
    const [data,setData] = useState({});

    

    useEffect(() => {
        fetch('http://localhost:4000/ticketData')
        .then(res => res.json())
        .then(data => setData(data))
        .catch(err => console.log(err))
    }, []);

    //console.log(res)
    
    return (
        <div style={{maxWidth:'100%', maxHeight:'100%', alignSelf:'center'}}>
            <Table align='center' bordered responsive striped hover variant='dark' size='sm' style={{maxWidth:'90%', maxHeight:'70%', marginTop:'100px'}}>
                <thead><tr><th style={{textAlign:'center', fontSize:'20px'}} colSpan={6}>Ticket Orders</th></tr></thead>
                    <tbody style={{ fontSize: '20px', color: "white"}}>
                    <tr>
                        <th style={{textAlign:'center'}}>Conf. #</th>
                        <th style={{textAlign:'center'}} colSpan={2}>Purchaser</th>
                        <th style={{textAlign:'center'}}>Show</th>
                        <th style={{textAlign:'center'}}>Seat(s)</th>
                        <th style={{textAlign:'center'}}>paid?</th>
                    </tr>
                    
                    
                </tbody>
            </Table>
           
        </div>
    )
}