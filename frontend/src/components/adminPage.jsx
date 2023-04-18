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
    function seasonPassSubmit(){
        window.location.href="/seasonPassStuff"
    }
    function policyStuffSubmit(){
        window.location.href="/policyStuff"
    }
    return (
            <Stack direction='vertical' style={{color: 'white', alignItems:'center', marginTop:'60px' }} gap={1}>
                    <div style={{fontSize:'30px', marginTop:'80px' }}>Welcome, Admin</div>
                    <Button size='lg' onClick={ListingsSubmit} variant="primary"
                        style={{
                            marginTop:'60px', 
                            width:'180px', 
                            borderRadius:'15px',
                            borderColor: '#FF4057' , 
                            backgroundColor:'#FF4057'
                            }}>
                        Manage Listings
                    </Button>
                    <Button size='lg' onClick={ticketStuffSubmit} variant="primary" type="submit" 
                        style={{
                            marginTop:'40px', 
                            width:'180px', 
                            borderRadius:'15px', 
                            borderColor: '#FF4057' , 
                            backgroundColor:'#FF4057' 
                            }}>
                        Ticket Stuff
                    </Button>
                    <Button size='lg' onClick={seasonPassSubmit} variant="primary" type="submit" 
                        style={{
                            marginTop:'40px', 
                            width:'180px', 
                            borderRadius:'15px', 
                            borderColor: '#FF4057' , 
                            backgroundColor:'#FF4057'
                            }}>
                        Season Passes
                    </Button>
                    <Button size='lg' onClick={policyStuffSubmit} variant="primary" type="submit" 
                        style={{
                            marginTop:'40px', 
                            width:'180px', 
                            borderRadius:'15px', 
                            borderColor: '#FF4057', 
                            backgroundColor:'#FF4057'
                            }}>
                        Policy Stuff
                    </Button>
            </Stack>
    )
}