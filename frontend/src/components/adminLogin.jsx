import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Stack,Button, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import React, {useState} from 'react';


export const AdminLogin = () =>{
    const [value, setValue] = useState('');
    const [alert, setAlert] = useState(undefined);
    
    const onFormSubmit = (e) => {
        e.preventDefault();
        setValue(value);
        console.log(value);
        
        const promise = fetch('http://localhost:4000/password', {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({value})
        });
        console.log(promise)
        promise.then(event => {
            if (event.status === 200) {
              setAlert({ label: 'success', type: 'success' })
            } else {
              setAlert({ label: `Error ${event.status}`, type: 'danger' })
            }
          })
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
                        style ={{maxWidth:'200px'}}
                    >
                    </Form.Control>
                    {alert &&
                        <Alert style={{ maxWidth: '200px', marginTop:5, paddingTop:'2px', maxHeight:'30px', }} key={alert.type} variant={alert.type}>
                        {alert.label}
                        </Alert>
                    }
                    <Button variant="primary" type="submit" style={{marginTop:'5px'}}>
                    Submit
                    </Button>
                </Form>
                
            </div>
        </Stack>
    )
}