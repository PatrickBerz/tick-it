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

    //console.log(res)
    
    return (
        <div style={{fontSize:'30px', color:"white"}}>
           <h1>Ticket Records</h1> {
                JSON.stringify(data[0]["purchaser"])
                // data.map((data) => ( 
                //     <ol key = { data } >
                //         User_Name: { data.username }, 
                //         Full_Name: { data.name }, 
                //         User_Email: { data.email } 
                //         </ol>
                // ))
            }
        </div>
    )
}