import { Form, Stack, Button, Alert, Table } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';


export const TicketStuff = () => {
    const [data, setData] = useState([]);

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
      fetchData();
    }, []);

    const ticket = [
        {
            "ticket":
            {
                "confNum": 0,
                "performance": "West Side Story",
                "seat":
                {
                    "section": "Orchestra",
                    "row": "B",
                    "seatNum": 12,
                    "acessible": false,
                    "inSeasonSection": false,
                    "defaultPrice": 29.99
                },
                "ticketStatus": 0,
                "price": 29.99,
                "purchaser":
                {
                    "first": "Susan",
                    "last": "brooks",
                    "address": "123 Sesame Street",
                    "phoneNum": "6064135244"
                },
            },

        },
        {
            "ticket":
            {
                "confNum": 1,
                "performance": "West Side Story",
                "seat":
                {
                    "section": "Orchestra",
                    "row": "B",
                    "seatNum": 13,
                    "acessible": false,
                    "inSeasonSection": false,
                    "defaultPrice": 29.99
                },
                "ticketStatus": 0,
                "price": 29.99,
                "purchaser":
                {
                    "first": "Susan",
                    "last": "brooks",
                    "address": "123 Sesame Street",
                    "phoneNum": "6064135244"
                },
            },

        },
        {
            "ticket":
            {
                "confNum": 3,
                "performance": "Magic Mike",
                "seat":
                {
                    "section": "Orchestra",
                    "row": "C",
                    "seatNum": 34,
                    "acessible": false,
                    "inSeasonSection": false,
                    "defaultPrice": 29.99
                },
                "ticketStatus": 0,
                "price": 29.99,
                "purchaser":
                {
                    "first": "Tom",
                    "last": "smith",
                    "address": "Easy Street",
                    "phoneNum": "6064135244"
                },
            },

        }
    ]

    
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
                    
                        {data.map((item, index) => (
                        <tr key={index} style={{alignItems:'center'}}>
                            <td style={{textAlign:'center'}}>{item.ticket.confNum}</td>
                            <td>{item.ticket.purchaser.first} </td>
                            <td>{item.ticket.purchaser.last} </td>
                            <td>{item.ticket.performance}</td>
                            <td style={{textAlign:'center'}}>{item.ticket.seat.seatNum}</td>
                            <td style={{textAlign:'center'}}>{item.ticket.paymentStatus}</td>
                        </tr>
                    ))}
                    
                </tbody>
            </Table>
           
        </div>
        
    )
}