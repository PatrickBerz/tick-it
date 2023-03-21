import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Stack,Button } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import React from 'react';

export const AdminLogin = () =>{
    useEffect( ()=> {
        fetchItems();
    },[]);

    const [items,setItems] = useState([]);

    const fetchItems = async() => {
        const data = await fetch('/password');
        const items = await data.json();
        setItems(items);
    }

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