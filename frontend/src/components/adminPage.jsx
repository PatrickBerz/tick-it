import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Stack,Button, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import React, {useState} from 'react';


export const AdminPage = () =>{
    

    return (
        <Stack direction='vertical' style={{alignItems:'center'}} gap={1}>
            <Form style={{color:'white'}}>Admin page</Form>
            <Button>stuff</Button>
        </Stack>
    )
}