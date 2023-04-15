import 'bootstrap/dist/css/bootstrap.min.css'
import { Form, Stack, Button, Alert, Table, Modal, FormGroup, Row, Col } from 'react-bootstrap'
import React, { useState } from 'react'

export const EventListings = () => {
    const [formData, setFormData] = useState({
        performance: '',
        venue: '',
        date: ''
    });

    const [showModal, setShow] = useState(false)
    const [formError, setFormError] = useState(null)
    const [showData, setShowData] = useState([])
    const [alert, setAlert] = useState(undefined);

    const handleBackButton = () => {
        window.location.href = "/adminPage"

    }
    function handleExport() {
        console.log("yay export")

    }

    const newEventModal = () => {
        setShow(true)
    };
    const handleClose = () => {
        setShow(false)
        setAlert(undefined)

    }

    const handleTextChange = e => {
        setFormData({
            ...formData,
            performance: e.target.value
        })
    }
    const handleSelectChange = e => {
        setFormData({
            ...formData,
            venue: e.target.value
        })
    }
    const handleDateChange = e => {
        setFormData({
            ...formData,
            date: e.target.value
        })
    }

    const onFormSubmit = (e) => {
        e.preventDefault()
        if (!formData.performance || !formData.venue || !formData.date) {
            setFormError('Please fill in all fields.');
            return;
        }

        setFormError(null);

        console.log('form data', formData)

        setShowData([
            ...showData,
            {
                show: {
                    performance: formData.performance,
                    venue: formData.venue,
                    date: formData.date
                }
            }
        ])
        handleClose()
        //console.log('show data', showData.show.performance)

        // const promise = fetch('http://localhost:4000/showData', {
        //     method: 'POST',
        //     headers: { "Content-Type": "application/json" },
        //     body: JSON.stringify([showData])
        // });
        // console.log(promise)
        // promise.then(event => {
        //     if (event.status === 200) {
        //         setAlert({ label: 'success', type: 'success' })
        //         handleClose()
        //     } else {
        //         setAlert({ label: `${event.statusText}`, type: 'danger' })
        //     }
        // })

        setFormData({
            performance: '',
            venue: '',
            date: ''
        })

    }


    // Perf name, venue name, date/time, array of tickets
    return (
        <div className='border border-light-2' style={{ maxWidth: '100%', maxHeight: '100%', alignSelf: 'center', marginTop: '60px', paddingLeft: '25px', paddingRight: '25px' }}>
            <Stack direction='vertical' style={{ marginTop: '40px' }} gap={2}>
                <div className='d-flex mb-2'>
                    <Button className='p-2' style={{
                        borderColor: '#FF4057',
                        backgroundColor: '#FF4057',
                    }}
                        onClick={newEventModal}>
                        Create Show
                    </Button>
                    <Button className='ms-2 p-2' style={{
                        borderColor: '#FF4057',
                        backgroundColor: '#FF4057',
                    }}
                        onClick={handleExport}>
                        Import Data 
                    </Button>
                    <Button className='ms-2 p-2' style={{
                        borderColor: '#FF4057',
                        backgroundColor: '#FF4057',
                    }} //0 or 1
                        onClick={handleExport}>
                        Export Data 
                    </Button>
                    
                    <Button className='ms-auto p-2' style={{
                        borderColor: '#FF4057',
                        backgroundColor: '#FF4057',
                    }}
                        onClick={handleBackButton}>
                        Back
                    </Button>
                </div>
                <Table align='center' bordered responsive striped hover variant='dark' size='sm' style={{ maxHeight: '70%' }}>
                    <thead><tr><th style={{ textAlign: 'center', fontSize: '20px' }} colSpan={6}>
                        Shows
                    </th>
                    </tr>
                    </thead>
                    <tbody style={{ fontSize: '20px', color: "white" }}>
                        <tr>
                            <th style={{ textAlign: 'center' }}>Performance</th>
                            <th style={{ textAlign: 'center' }}>Venue</th>
                            <th style={{ textAlign: 'center' }}>Date</th>
                            <th style={{ textAlign: 'center' }}>Seats Left</th>
                        </tr>

                        {showData.map((item, index) => (
                            <tr key={index} style={{ alignItems: 'center' }}>
                                <td style={{ textAlign: 'center' }}>{item.show.performance}</td>
                                <td>{item.show.venue} </td>
                                <td>{item.show.date} </td>
                                <td>number </td>
                            </tr>
                        ))}

                    </tbody>
                </Table>

            </Stack>

            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Enter Event Data</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={onFormSubmit} id='newShowForm' >
                        {alert &&
                            <Alert style={{ maxWidth: '200px', marginTop: 5, paddingTop: '2px', maxHeight: '30px', }} key={alert.type} variant={alert.type}>
                                {alert.label}
                            </Alert>
                        }
                        {formError && <Alert variant='danger'>{formError}</Alert>
                        }
                        <Row className="mb-3">
                            <Form.Group controlId="textValue">
                                <Form.Label>Event Name</Form.Label>
                                <Form.Control required type="text" value={formData.performance} placeholder="Enter event name" onChange={handleTextChange} />
                            </Form.Group>
                        </Row>
                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="selectValue">
                                <Form.Label>Pick Venue </Form.Label>
                                <Form.Select required value={formData.venue} onChange={handleSelectChange} >
                                    <option value="">Select an option</option>
                                    <option value="Playhouse">Playhouse</option>
                                    <option value="Concert Hall">Concert Hall</option>
                                </Form.Select>
                            </Form.Group>


                            <Form.Group as={Col} controlId="dateValue">
                                <Form.Label>Date</Form.Label>
                                <Form.Control type='date' required placeholder="MM/DD/YYYY" value={formData.date} onChange={handleDateChange} />
                            </Form.Group>

                        </Row>
                        <Button variant="primary" type="submit" >
                            Submit
                        </Button>

                    </Form>
                </Modal.Body>
            </Modal>
        </div>

    )
}