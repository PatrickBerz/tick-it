import { Form, Stack,Button, Alert } from 'react-bootstrap';
import React, {useState, useEffect} from 'react';


export const TicketStuff = () =>{
    const [data,setData] = useState({});

    useEffect(() => {
        fetch('http://localhost:4000/ticketData')
        .then(res => res.json())
        .then(data => setData(data))
        .catch(err => console.log(err))
    }, []);
    
    return (
        <div style={{fontSize:'30px', color:"white"}}>
           <h1>Ticket Records</h1>
           <ul>
            {data.map((item,index)=>(
                <li key={index}>
                <p> Performance: {item.name}</p>
                </li>
            ))}
           </ul>
        </div>
    )
}