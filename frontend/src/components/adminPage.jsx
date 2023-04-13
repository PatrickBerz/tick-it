import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Stack,Button, Alert } from 'react-bootstrap';
import React, {useState} from 'react';



export const AdminPage = () =>{
    
     function ListingsSubmit(){
        window.location.href="/eventListings"
    }
    function ticketStuffSubmit(){
        window.location.href="/ticketStuff"

    }
    return (
            <Stack direction='vertical' style={{color: 'white', alignItems:'center', marginTop:'80px' }} gap={1}>
                    <div style={{fontSize:'30px'}}>Welcome, Admin</div>
                    <Button onClick={ListingsSubmit} variant="primary"
                        style={{
                            marginTop:'30px', 
                            width: '160px', 
                            borderRadius:'15px',
                            borderColor: '#FF4057' , 
                            backgroundColor:'#FF4057'
                            }}>
                        Manage Listings
                    </Button>
                    <Button onClick={ticketStuffSubmit} variant="primary" type="submit" 
                        style={{
                            marginTop:'30px', 
                            width:'160px', 
                            borderRadius:'15px', 
                            borderColor: '#FF4057' , 
                            backgroundColor:'#FF4057' 
                            }}>
                        Ticket Stuff
                    </Button>
                    <Button variant="primary" type="submit" 
                        style={{
                            marginTop:'30px', 
                            width:'160px', 
                            borderRadius:'15px', 
                            borderColor: '#FF4057' , 
                            backgroundColor:'#FF4057'
                            }}>
                        Season Ticket stuff
                    </Button>
                    <Button variant="primary" type="submit" 
                        style={{
                            marginTop:'30px', 
                            width:'160px', 
                            borderRadius:'15px', 
                            borderColor: '#FF4057', 
                            backgroundColor:'#FF4057'
                            }}>
                        Policy Stuff
                    </Button>
            </Stack>
    )
}