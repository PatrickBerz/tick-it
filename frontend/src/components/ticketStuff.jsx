import { Form, Stack, Button, Alert, Table } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';

export const TicketStuff = () =>{
    const [data,setData] = useState(null);

    const fetchData = () => {
      fetch(`http://localhost:4000/ticketData`)
        .then((response) => response.json())
        .then((data) => {
          //console.log(data);
          setData(data);
          console.log(data);
        })
        .catch((err) => {
          console.log(err.message);
        });
    };
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('http://localhost:4000/ticketData')
            const newData = await response.json()
            console.log(JSON.stringify(newData))
            setData(newData)
        }
        fetchData();
    }, []);

    if (data) {
        console.log(JSON.stringify(data))
        return (
            <div style={{maxWidth:'100%', maxHeight:'100%', alignSelf:'center'}}>
                <Table align='center' bordered responsive striped hover variant='dark' size='sm' style={{maxWidth:'90%', maxHeight:'70%', marginTop:'100px'}}>
                    <thead><tr><th style={{textAlign:'center', fontSize:'20px'}} colSpan={5}>Ticket Orders</th></tr></thead>
                        <tbody style={{ fontSize: '20px', color: "white"}}>
                        <tr>
                            <th style={{textAlign:'center'}}>Conf. #</th>
                            <th style={{textAlign:'center'}}>Purchaser</th>
                            <th style={{textAlign:'center'}}>Show</th>
                            <th style={{textAlign:'center'}}>Seat(s)</th>
                            <th style={{textAlign:'center'}}>Ticket Status</th>
                        </tr>
                        
                        
                        {data.map((item, index) => (
                            <tr key={index} style={{alignItems:'center'}}>
                            <td style={{textAlign:'center'}}>{item.confNum}</td>
                            <td>{item.purchaser.name}</td>
                            <td>{item.tickets[0].performance}</td>
                            <td style={{textAlign:'center'}}>{item.tickets.map((obj) => (
                                obj.seat.row + obj.seat.seatNum + " "
                            ))}</td>
                            <td style={{textAlign:'center'}}>{getTicketStatusText(item.tickets[0].ticketStatus)}</td>
                        </tr>
                        ))}
                    </tbody>
                </Table>
            
            </div>
        )
    }
    else {
        return null;
    }

}  

function getTicketStatusText(statusInt){
    switch(statusInt){
        case 0:
            return "Unsold"
        case 1:
            return "Reserved"
        case 2:
            return "Paid"
        case 3:
            return "Picked Up"

    }
}