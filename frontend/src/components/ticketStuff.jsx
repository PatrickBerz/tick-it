import { Form, Stack,Button, Alert, Table } from 'react-bootstrap';
import React, {useState, useEffect} from 'react';


export const TicketStuff = () =>{
    // const [data,setData] = useState({});

    // useEffect(() => {
    //     fetch('http://localhost:4000/ticketData')
    //     .then((res) => res.json())
    //     .then(() => setData(data))
    //     .catch(err => console.log(err))
    // }, []);
    
    let data = [
        {"purchaser":
            {
                "name":"Susan",
            "address":"123 Sesame Street",
            "phoneNum":"6064135244"
            },
            "confNum":0,
            "tickets":
                {
                    "performance":"West Side Story",
                "seat":
                {
                    "section":"Orchestra",
                "row":"B",
                "seatNum":12,
                "acessible":false,
                "inSeasonSection":false,
                "defaultPrice":29.99},
                "ticketStatus":0,
                "price":29.99
            }
        },
        {
            "purchaser":
            {
                "name":"Hugh Janus",
                "address":"Easy street",
                "phoneNum":"6064135244"
            },
            "confNum":1,
            "tickets":
            {
                "performance":"The Last Airbender",
                "seat":
                {
                    "section":"Orchestra",
                    "row":"B",
                    "seatNum":24,
                    "acessible":false,
                    "inSeasonSection":false,
                    "defaultPrice":29.99},
                    "ticketStatus":0,
                    "price":29.99
                }
            }
        ]


    return (
        <div >
           <h1 style={{fontSize:'30px', color:"white"}}>Ticket Records</h1>
            <Table responsive striped hover variant='dark' size='sm'>
                <tbody style={{fontSize:'20px', color:"white"}}>
                    <tr>
                        <th>Confirmation #</th>
                        <th>Purchaser</th>
                        <th>Show</th>
                        <th>Seat(s)</th>
                        <th>paid?</th>
                    </tr>
                    {data.map((item, index) => (
                        <tr key={index}>
                            <td>{item.confNum}</td>
                            <td>{item.purchaser.name}</td>
                            <td>{item.tickets.performance}</td>
                            <td>{item.tickets.seat.seatNum}</td>
                            <td>{item.tickets.ticketStatus}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            {/* <Table striped bordered hover size='sm' style={{fontSize:'30px', color:"white"}}> 
                
            <thead>
                <tr>
                    <th>Purchaser Name</th>
                </tr>
            </thead>
            <tbody>
                {data.map((ticket, index)=> (
                <tr key={index}>
                <td>{data.purchaser.name}</td> 
                 </tr>
                ))}
            </tbody>
           </Table> */}
           {/* <ul>
            {data.map((item,index)=>(
                <li key={index}>
                <p> Performance: {item.name}</p>
                </li>
            ))}
           </ul> */}
        </div>
    )
}