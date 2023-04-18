import { Form, Stack, Button, Alert, Table, Modal, Row, Col } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';

export const TicketStuff = () => {
    const [data, setData] = useState(null);
    const [formError, setFormError] = useState(null)
    const [addPModal, setAddModal] = useState(false)
    const [showModal, setShow] = useState(false)
    const [alert, setAlert] = useState(undefined);
    const [passState, setState] = useState({ case: '', performanceName: '', venueName: '', dateTime: '' });


    const [formData, setFormData] = useState(
        {
            confNum: '',
            status: '',
        }
    )
    const handleClose = () => {
        setShow(false)
        setAlert(undefined)
        setFormError(undefined)
    }
    const handleCloseAdd = () => {
        setAddModal(false)
        setFormError(undefined)
    }
    

    const handleItemEdit = (item) => {
        setFormData({confNum:item.confNum , status: item.tickets[0].ticketStatus})
        setShow(true)
    }

    const handleStatusChange = e => {
        setFormData({
            ...formData,
            status:  e.target.value
        })
    }

    function handleStateChange(caseName) {
        setState({case:caseName, performanceName:'', venueName:'', dateTime:''})
    }

    const handleBackButton = () => {
        window.location.href = "/adminPage"

    }

    const addPurchaseModal = () => {
        setAddModal(true)
    };
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('http://localhost:4000/purchaseData')
            const newData = await response.json()
            console.log(JSON.stringify(newData))
            setData(newData)
        }
        fetchData();
    }, []);


    const onFormSubmit = (e) => {
        e.preventDefault()
        if (!formData.status) {
            setFormError('Please fill in all fields.');
            return;
        }

        setFormError(null);

        console.log(formData)


        const promise = fetch('http://localhost:4000/statusUpdate', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify( formData)
        });
        console.log(promise)
        promise.then(event => {
            if (event.status === 200) {
                setAlert({ label: 'success', type: 'success' })
                handleClose()
            } else {
                setAlert({ label: `${event.statusText}`, type: 'danger' })
            }
        })

        setFormData(
            {
                confNum:'',
                status: '',
            }
        )
        handleClose()
        setTimeout(() => { window.location.reload(); }, 500);
    }

    if (data) {
        console.log(JSON.stringify(data))
        return (
            <div className='d-flex' style={{ maxWidth: '100%', maxHeight: '100%', alignSelf: 'center', marginTop: '60px', paddingLeft: '25px', paddingRight: '25px' }}>
                <Stack direction='vertical' style={{ marginTop: '40px' }} gap={2}>

                    <div className='d-flex ' style={{ width: '95%', alignSelf: 'center' }}>
                        <Button className='p-2' style={{
                            borderColor: '#FF4057',
                            backgroundColor: '#FF4057',
                        }}
                            onClick={addPurchaseModal}>
                            Add Purchase
                        </Button>

                        <Button className='ms-auto p-2' style={{
                            borderColor: '#FF4057',
                            backgroundColor: '#FF4057',
                        }}
                            onClick={handleBackButton}>
                            Back
                        </Button>
                    </div>
                    <div className="square border border-secondary border-3 container" style={{ maxWidth: '95%', maxHeight: '45rem', padding: '20px', overflowY: 'auto', marginBottom: '30px', background: '#282634' }}>

                        <Table bordered responsive striped hover variant='dark' size='sm' >
                            <thead><tr><th style={{ textAlign: 'center', fontSize: '20px' }} colSpan={6}>Ticket Purchases</th></tr></thead>
                            <tbody style={{ fontSize: '20px', color: "white" }}>
                                <tr>
                                    <th >Conf. #</th>
                                    <th>Purchaser</th>
                                    <th >Show</th>
                                    <th >Seat(s)</th>
                                    <th >Ticket Status</th>
                                    <th >Edit</th>
                                </tr>


                                {data.map((item, index) => (
                                    <tr key={index}>
                                        <td>{item.confNum}</td>
                                        <td>{item.purchaser.name}</td>
                                        <td>{item.tickets[0].performance}</td>
                                        <td>{item.tickets.map((obj) => (
                                            obj.seat.row + obj.seat.seatNum + " "
                                        ))}</td>
                                        <td >{getTicketStatusText(item.tickets[0].ticketStatus)}</td>
                                        <td style={{ textAlign: 'center' }}>
                                            <Button
                                                size='sm'
                                                onClick={() => { handleItemEdit(item) }}>
                                                Edit
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </div>
                </Stack>
                <Modal show={showModal} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit Status</Modal.Title>
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
                                <Form.Group as={Col} controlId="status">
                                    <Form.Label>Status</Form.Label>
                                    <Form.Select type="select" min={0} max={3} value={formData.status} onChange={handleStatusChange} >
                                        <option value={0}>Unsold</option>
                                        <option value={1}>Reserved</option>
                                        <option value={2}>Paid</option>
                                        <option value={3}>Picked Up</option>
                                    </Form.Select>
                                </Form.Group>
                                <Form.Group as={Col}></Form.Group>
                            </Row>
                            
                            
                            <Button className='mt-2' variant="success" type="submit" >
                                Submit
                            </Button>

                        </Form>
                    </Modal.Body>
                </Modal>
                <Modal show={addPModal} onHide={handleCloseAdd}>
                    <Modal.Header closeButton>
                        <Modal.Title>Select a show</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={onFormSubmit} id='newShowForm' >
                            {formError && <Alert variant='danger'>{formError}</Alert>
                            }
                            <Row className="mb-3">
                                <Form.Group as={Col} controlId="status">
                                    <Form.Label>Shows</Form.Label>
                                    <Form.Control type="select" min={0} max={3} value={formData.status} onChange={e => {handleStateChange('purchase')}} />
                                </Form.Group>
                                <Form.Group as={Col}></Form.Group>
                            </Row>
                            
                            
                            <Button className='mt-2' variant="success" type="submit" >
                                Submit
                            </Button>

                        </Form>
                    </Modal.Body>
                </Modal>
            </div>
        )
    }
    else {
        return (
            <div className='d-flex' style={{ maxWidth: '100%', maxHeight: '100%', alignSelf: 'center', marginTop: '60px', paddingLeft: '25px', paddingRight: '25px' }}>
                <Stack direction='vertical' style={{ marginTop: '40px' }} gap={2}>

                    <div className='d-flex ' style={{ width: '95%', alignSelf: 'center' }}>
                        <Button className='p-2' style={{
                            borderColor: '#FF4057',
                            backgroundColor: '#FF4057',
                        }}
                            onClick={addPurchaseModal}>
                            Add Purchase
                        </Button>

                        <Button className='ms-auto p-2' style={{
                            borderColor: '#FF4057',
                            backgroundColor: '#FF4057',
                        }}
                            onClick={handleBackButton}>
                            Back
                        </Button>
                    </div>
                    <div className="square border border-secondary border-3 container" style={{ maxWidth: '95%', maxHeight: '45rem', padding: '20px', overflowY: 'auto', marginBottom: '30px', background: '#282634' }}>

                        <Table bordered responsive striped hover variant='dark' size='sm' >
                            <thead><tr><th style={{ textAlign: 'center', fontSize: '20px' }} colSpan={6}>Ticket Purchases</th></tr></thead>
                            <tbody style={{ fontSize: '20px', color: "white" }}>
                                <tr>
                                    <th >Conf. #</th>
                                    <th>Purchaser</th>
                                    <th >Show</th>
                                    <th >Seat(s)</th>
                                    <th >Ticket Status</th>
                                    <th >Edit</th>
                                </tr>
                                
                            </tbody>
                        </Table>
                    </div>
                </Stack>
                
            </div>
        )
    }

}

function getTicketStatusText(statusInt) {
    switch (statusInt) {
        case 0:
            return "Unsold"
        case 1:
            return "Reserved"
        case 2:
            return "Paid"
        case 3:
            return "Picked Up"

    }
}