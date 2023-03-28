import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Form, Stack } from 'react-bootstrap';
import {useLocation, Link } from 'react-router-dom';
import React from 'react';

export const SeasonPass = () =>{
    return (
        <div >
            <Stack direction='vertical' style={{alignItems:'center'}} gap={1}>
                <Form style={{color:'white'}}>Become A Passholder!</Form>
                <Stack direction='horizontal' style={{justifyContent:'center'}} gap={1}>
                    <Form style={{color:'white'}}>First Name</Form>
                    
                    <div className='fname-field'>
                        <Form.Control
                        name='fname'
                        placeholder='First Name'
                        >
                        </Form.Control>
                    </div>
                </Stack>
                <Stack direction='horizontal' style={{justifyContent:'center'}} gap={1}>
                    <Form style={{color:'white'}}>Last Name</Form>
                    
                    <div className='lname-field'>
                        <Form.Control
                        name='lname'
                        placeholder='Last Name'
                        >
                        </Form.Control>
                    </div>
                </Stack>
                <Stack direction='horizontal' style={{justifyContent:'center'}} gap={1}>
                    <Form style={{color:'white'}}>Email Address</Form>
                    
                    <div className='email-field'>
                        <Form.Control
                        name='email'
                        placeholder='email@email.com'
                        >
                        </Form.Control>
                    </div>
                </Stack>
                <Stack direction='horizontal' style={{justifyContent:'center'}} gap={1}>
                    <Form style={{color:'white'}}>Phone Number</Form>
                    
                    <div className='phone-field'>
                        <Form.Control
                        name='phone'
                        placeholder='(xxx) xxx-xxxx'
                        >
                        </Form.Control>
                    </div>
                </Stack>
                
                <Button variant="primary" type="submit" style={{marginTop:'10px'}}>
                    Purchase Season Pass
                </Button>
            </Stack>
        </div>
    )
}