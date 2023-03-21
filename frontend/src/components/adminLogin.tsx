import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Stack,Button } from 'react-bootstrap';
import { useRef, useState } from 'react';
import React from 'react';

export const AdminLogin = () =>{


    return (
        <Stack direction='vertical' style={{alignItems:'center'}} gap={1}>
            <div className='password-field' style={{marginTop:'150px'}}>
                <Form.Control
                type='password'
                id='passwordField'
                name='passInput'
                value={''}
                placeholder='Password'
                >
                </Form.Control>
                <Button variant="primary" type="submit" style={{marginTop:'10px'}}>
                    Submit
                </Button>
            </div>
        </Stack>
    )
}