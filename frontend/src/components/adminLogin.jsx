import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Stack, Button, Alert, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import React, { useState } from 'react';


export const AdminLogin = () => {
    const [value, setValue] = useState('');
    const [alert, setAlert] = useState(undefined);

    const onFormSubmit = (e) => {
        e.preventDefault();
        setValue(value);
        console.log(value);

        const promise = fetch('http://localhost:4000/password', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ value })
        });
        console.log(promise)
        promise.then(event => {
            if (event.status === 200) {
                setAlert({ label: 'success', type: 'success' })
                window.location.href = "/adminPage"
            } else {
                setAlert({ label: `Error ${event.statusText}`, type: 'danger' })
            }
        })
    }


    return (

        <div className="d-flex justify-content-center" style={{ marginTop: '60px', padding: '40px' }}>
            <div className='square border border-secondary border-3' style={{marginTop:'60px' ,padding: '40px',background: '#282634' }}>
                <Form className='d-flex square '  onSubmit={onFormSubmit} style={{ padding: '20px'}}>
                    
                    <Stack  >
                        <Form.Label style={{ color: 'white' }}>Enter Admin Password</Form.Label>
                        <Form.Control
                            type='password'
                            placeholder='Password'
                            onChange={(e) => setValue(e.target.value)}
                            style={{ maxWidth: '200px' }}
                        >
                        </Form.Control>


                        {alert &&
                            <Alert style={{ maxWidth: '200px', marginTop: 5, paddingTop: '2px', maxHeight: '30px', }} key={alert.type} variant={alert.type}>
                                {alert.label}
                            </Alert>
                        }
                    </Stack>
                    <Button variant="primary" type="submit" style={{ marginLeft: '5px', marginTop: '32px', height: '38px' }}>
                        Submit
                    </Button>
                </Form>
            </div>
        </div>
    )
}