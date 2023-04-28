import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Stack, Button, Alert, Table, Modal, Row, Col, ListGroup } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export const TicketStuff = () => {
    const [data, setData] = useState(null); // Controls purchase data
    const [formError, setFormError] = useState(null) // Controls form submission error
    const [addPModal, setAddModal] = useState(false) // Controls Add purchase modal
    const [showData, setShowData] = useState([]) // Controls all show data
    const [showModal, setShow] = useState(false) // Controls Edit modal
    const [alert, setAlert] = useState(undefined) // Controls error/success message

    // Control user-inputted form data
    const [formData, setFormData] = useState(
        {
            confNum: '',
            status: '',
        }
    )

    /**
     * FUNCTION close Edit modal 
     */
    const handleClose = () => {
        setShow(false)
        setAlert(undefined)
        setFormError(undefined)
    }
    
    /**
     * FUNCTION close Add Purchase modal
     */
    const handleCloseAdd = () => {
        setAddModal(false)
        setFormError(undefined)
    }

    /**
     * FUNCTION on Edit buttonclick, show the Edit modal
     * PARAM corresponding list item
     */
    const handleItemEdit = (item) => {
        setFormData({ confNum: item.confNum, status: item.tickets[0].ticketStatus })
        setShow(true)
    }

    /**
     * FUNCTION handle the Status field change
     * PARAM event
     */
    const handleStatusChange = (e) => {
        setFormData({
            ...formData,
            status: e.target.value
        })
    }
    
    /**
     * FUNCTION convert the date from ISO in GMT to CST
     * PARAM date in ISO
     */
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

    
    /**
     * FUNCTION Navigate back to the admin homepage
     */
    const handleBackButton = () => {
        window.location.href = "/adminPage"

    }

    /**
     * FUNCTION show the Add Purchase modal
     */
    const addPurchaseModal = () => {
        setAddModal(true)
    }

    /**
     * USEEFFECT on the first render, fetch all purchases from database
     */
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('http://localhost:4000/purchaseData')
            const newData = await response.json()
            console.log(JSON.stringify(newData))
            setData(newData)
        }
        fetchData();
    }, []);

    /**
     * FUNCTION handle submission of the status update form
     */
    const onFormSubmit = (e) => {
        e.preventDefault()
        setFormError(null)
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

    /**
     * FUNCTION on the first render, fetch all show data from the database
     */
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('http://localhost:4000/showData')
            const newData = await response.json()
            console.log(JSON.stringify(newData))
            setShowData(newData)
        }
        fetchData();
    }, []);


    /**
     * RETURN render page elements
     */
    if (data) {
        // If there is purchase data, render the normal page...
        return (
            <div className='d-flex' style={{ maxWidth: '100%', maxHeight: '100%', alignSelf: 'center', marginTop: '60px', paddingLeft: '25px', paddingRight: '25px' }}>
                <Stack direction='vertical' style={{ marginTop: '40px' }} gap={2}>
                    <div className='d-flex ' style={{ width: '95%', alignSelf: 'center' }}>

                        {/**Add Purchase Button */}
                        <Button className='p-2' style={{
                            borderColor: '#FF4057',
                            backgroundColor: '#FF4057',
                        }}
                            onClick={addPurchaseModal}>
                            Add Purchase
                        </Button>

                        {/**Back Button */}
                        <Button className='ms-auto p-2' style={{
                            borderColor: '#FF4057',
                            backgroundColor: '#FF4057',
                        }}
                            onClick={handleBackButton}>
                            Back
                        </Button>
                    </div>
                    <div className="square border border-secondary border-3 container" style={{ maxWidth: '95%', maxHeight: '35rem', padding: '20px', overflowY: 'auto', marginBottom: '30px', background: '#282634' }}>
                        
                        {/**Table of purchases */}
                        <Table bordered responsive striped hover variant='dark' size='sm' >
                            <thead><tr><th style={{ textAlign: 'center', fontSize: '20px' }} colSpan={7}>Ticket Purchases</th></tr></thead>
                            <tbody style={{ fontSize: '20px', color: "white" }}>
                                <tr>
                                    <th >Conf. #</th>
                                    <th>Purchaser</th>
                                    <th >Show</th>
                                    <th >Date/Time</th>
                                    <th >Seat(s)</th>
                                    <th >Ticket Status</th>
                                    <th >Edit</th>
                                </tr>


                                {data.map((item, index) => (
                                    <tr key={index}>
                                        <td>{item.confNum}</td>
                                        <td>{item.purchaser.name}</td>
                                        <td>{item.tickets[0].performance}</td>
                                        <td>{convertDate(item.perfDateTime)}</td>
                                        <td style={{ whiteSpace: 'pre-wrap' }}>{item.tickets.map((obj) => (
                                            obj.seat.section + " " + obj.seat.row + obj.seat.seatNum + "\n"
                                        )).join('')}</td>
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

                {/**Edit modal */}
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

                {/**Add Purchase modal */}
                <Modal show={addPModal} onHide={handleCloseAdd}>
                    <Modal.Header closeButton>
                        <Modal.Title>Select a show</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={onFormSubmit} id='newShowForm' >
                            {formError && <Alert variant='danger'>{formError}</Alert>
                            }
                            <Row className="mb-3">
                                <ListGroup as={Col} controlId="status">
                                    <Form.Label>Shows</Form.Label>
                                    <div style={{ maxHeight: '250px', overflowY: 'scroll' }}>

                                        {showData.map((option, index) => (
                                            <Link
                                                style={{textDecoration:'none'}}
                                                to={"/seatSelection"}
                                                state={{ case: "purchase", event: option.performanceName, venue: option.venueName, datetime: option.dateTime }}>
                                                <ListGroup.Item action key={index} value={JSON.stringify(option)} >
                                                    {option.performanceName} - ({convertDate(option.dateTime)})
                                                </ListGroup.Item>
                                            </Link>
                                        ))}
                                    </div>
                                </ListGroup>
                            </Row>
                        </Form>
                    </Modal.Body>
                </Modal>
            </div>
        )
    }
    else {
        // Otherwise, render an empty table...
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

/**
 * FUNCTION determine what the status of this ticket is
 */
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
        case 4:
            return "Cancelled"

    }
}