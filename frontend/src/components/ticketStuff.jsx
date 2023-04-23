import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Stack, Button, Alert, Table, Modal, Row, Col } from 'react-bootstrap';
import React, { useState, useEffect} from 'react';
import { Link, useLocation } from 'react-router-dom';



export const TicketStuff = () => {
    const [data, setData] = useState(null);
    const [formError, setFormError] = useState(null)
    const [addPModal, setAddModal] = useState(false)
    const [showData, setShowData] = useState([])
    const [showModal, setShow] = useState(false)
    const [alert, setAlert] = useState(undefined)

    const [passState, setState] = useState({ case: '', event: '', venueName: '', dateTime: '' });


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
        setFormData({ confNum: item.confNum, status: item.tickets[0].ticketStatus })
        setShow(true)
    }

    const handleStatusChange = e => {
        setFormData({
            ...formData,
            status: e.target.value
        })
    }
    const convertDate = (item) => {
        const oldDate = new Date(item)
        //Shift time 300 minutes (5 hours) to get it out of GMT
        const date = new Date(oldDate.getTime() + 300 * 60000);
        const options = {
            month: 'numeric',
            day: 'numeric',
            year: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            hour12: true
        }

        const formattedDate = new Intl.DateTimeFormat('en-US', options).format(date)
        //const formattedDate = date.toLocaleDateString('en-US', options)
        return formattedDate
    }

    function handleStateChange (value) {
        const showToPass = JSON.parse(value)
        console.log(showToPass.performanceName)
        setState({ case: 'purchase', event: showToPass.performanceName, venueName:showToPass.venueName, dateTime: showToPass.dateTime })
        console.log(passState)
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
        //console.log(JSON.stringify(passState))
        // if (!passState.performanceName) {
        //     setFormError('Please fill in all fields.');
        //     return;
        // }


        setFormError(null);

        console.log(formData)


        const promise = fetch('http://localhost:4000/statusUpdate', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData)
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
                confNum: '',
                status: '',
            }
        )
        handleClose()
        setTimeout(() => { window.location.reload(); }, 500);
    }
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('http://localhost:4000/showData')
            const newData = await response.json()
            console.log(JSON.stringify(newData))
            setShowData(newData)
        }
        fetchData();
    }, []);


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
                    <div className="square border border-secondary border-3 container" style={{ maxWidth: '95%', maxHeight: '35rem', padding: '20px', overflowY: 'auto', marginBottom: '30px', background: '#282634' }}>

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
                                    <div style={{maxHeight:'200px', overflowY:'scroll'}}>
                                    <Form.Select required style={{ overflowY: "scroll" }} type="select" value={passState.performanceName} onChange={(e) => handleStateChange(e.target.value)}>
                                        <option>Select Show...</option>
                                        {showData.map((option, index) => (
                                            <option key={index} value={JSON.stringify(option)} >{option.performanceName}</option>
                                        ))}
                                    </Form.Select>
                                    </div>

                                </Form.Group>
                                
                            </Row>
                            <Link
                                to={"/seatSelection"}
                                state={{ case: "purchase", event: passState.event, venue: passState.venueName, datetime: passState.dateTime }}>
                                {console.log({ case: "purchase", event: passState.event, venue: passState.venueName, datetime: passState.dateTime })}
                                <Button disabled={!passState.event} size='sm' variant="primary" >
                                    Purchase Tickets
                                </Button>
                            </Link>

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