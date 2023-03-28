import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Stack,Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import React, {useState} from 'react';


export const AdminLogin = () =>{
    const [value, setValue] = useState('');
    
    const onFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log(value);
        setValue(value);
        const data = fetch('http://localhost:4000/password', {
            method: 'POST',
            body: JSON.stringify({value})
        });
        const items = data;
        console.log(items)
    }
    // const fetchData = async () => {
    //     const {data} = await 
    //     console.log(data);
    // }

    return (
        <Stack direction='vertical' style={{alignItems:'center'}} gap={1}>
            <div className='password-field' style={{marginTop:'150px'}}>
                <Form onSubmit={onFormSubmit}>
                    <Form.Control
                        type='password'
                        placeholder='Password'
                        onChange={(e) => setValue(e.target.value)}
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