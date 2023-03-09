import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Stack } from 'react-bootstrap';
import React from 'react';

export const SeasonPass = () =>{
    return (
        <div >
            <Stack direction='vertical' style={{alignItems:'center'}} gap={1}>
                <Form style={{color:'white'}}>SeasonPass</Form>
            </Stack>
        </div>
    )
}