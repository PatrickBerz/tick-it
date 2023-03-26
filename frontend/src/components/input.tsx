import * as React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Stack,Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import {useState} from 'react';

export const AdminLogin = () =>{

    const [value, setValue] = useState(),
        
        onInput = ({target:{value}}) => setValue(value),
        onFormSubmit = e => {
            e.preventDefault()
            console.log(value)
            setValue()
        }

    return (
        <Stack direction='vertical' style={{alignItems:'center'}} gap={1}>
            <div className='password-field' style={{marginTop:'150px'}}>
                <Form onSubmit={onFormSubmit}>
                    <Form.Control
                        type='password'
                        placeholder='Password'
                        onChange={onInput}
                        value = {value}
                    >
                    </Form.Control>
                    <Button variant="primary" type="submit" style={{marginTop:'10px'}}>
                    Submit
                    </Button>
                </Form>
                
            </div>
        </Stack>
    )
}