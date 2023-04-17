import { Form, Stack, Button, Alert, Table, Modal, Row, Col } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';

export const SeasonPassStuff = () => {
    const [data, setData] = useState(null);
    const [showModal, setShow] = useState(false)
    const [alert, setAlert] = useState(undefined);
    const [formError, setFormError] = useState(null)

    const [formData, setFormData] = useState(
        {
            name: '',
            address: '',
            phoneNum: '',
            section: '',
            row: '',
            seatNum: ''
        }
    )
    const handleClose = () => {
        setShow(false)
        setAlert(undefined)
    }
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('http://localhost:4000/seasonTickets')
            const newData = await response.json()
            console.log(JSON.stringify(newData))
            setData(newData)
        }
        fetchData();
    }, []);

    const handleBackButton = () => {
        window.location.href = "/adminPage"

    }
    function handleExport() {
        console.log("yay export")

    }
    const handleItemEdit = (item) => {
        setFormData({ name: item.name, address: item.address, phoneNum: item.phoneNum, section: item.seatAssignment.section, row: item.seatAssignment.row, seatNum: item.seatAssignment.seatNum })
        setShow(true)
    }

    const handleNameChange = e => {
        setFormData({
            ...formData,
            name: e.target.value
        })
    }
    const handleAddressChange = e => {
        setFormData({
            ...formData,
            address: e.target.value
        })
    }
    const handlePhoneNumChange = e => {
        setFormData({
            ...formData,
            phoneNum: e.target.value
        })
    }
    const handleSectionChange = e => {
        setFormData({
            ...formData,
            section: e.target.value
        })
    }
    const handleRowChange = e => {
        setFormData({
            ...formData,
            row: e.target.value
        })
    }
    const handleSeatChange = e => {
        setFormData({
            ...formData,
            seatNum: e.target.value
        })
    }
    const onFormSubmit = (e) => {
        e.preventDefault()
        if (!formData.name) {
            setFormError('Please fill in all fields.');
            return;
        }

        setFormError(null);


        let passUpdate =
        {
            name: formData.name,
            address: formData.address,
            phoneNum: formData.phoneNum,
            section: formData.section,
            row: formData.row,
            seatNum: formData.seatNum
        }

        console.log(passUpdate)


        const promise = fetch('http://localhost:4000/holderUpdate', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ passUpdate })
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
                name: '',
                address: '',
                phoneNum: '',
                section: '',
                row: '',
                seatNum: ''
            }
        )
        handleClose()
        setTimeout(() => { window.location.reload(); }, 500);


    }


    if (data) {
        console.log(JSON.stringify(data))
        return (
            <div className='border border-light-2' style={{ maxWidth: '100%', maxHeight: '100%', alignSelf: 'center', marginTop: '60px', paddingLeft: '25px', paddingRight: '25px' }}>

                <Stack direction='vertical' style={{ marginTop: '40px' }} gap={2}>
                    <div className='d-flex ' style={{ width: '95%', alignSelf: 'center' }}>
                        <Button className=' p-2' style={{
                            borderColor: '#FF4057',
                            backgroundColor: '#FF4057',
                        }} // send file path
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
                    <div className="square border border-secondary border-3 container" style={{ maxWidth: '95%', maxHeight: '45rem', padding: '20px', overflowY: 'auto', marginBottom: '30px', background: '#282634' }}>
                        <Table bordered responsive striped hover variant='dark' size='sm' style={{ maxHeight: '70%' }}>
                            <thead><tr><th style={{ textAlign: 'center', fontSize: '20px' }} colSpan={5}>Season Pass Holders</th></tr></thead>
                            <tbody style={{ fontSize: '20px', color: "white" }}>
                                <tr>
                                    <th >Name</th>
                                    <th >Address</th>
                                    <th>Phone #</th>
                                    <th>Seat</th>
                                    <th>Options</th>
                                </tr>


                                {data.map((item, index) => (
                                    <tr key={index} style={{ alignItems: 'center' }}>
                                        <td >{item.name}</td>
                                        <td>{item.address}</td>
                                        <td >{item.phoneNum}</td>
                                        <td>{item.seatAssignment.section} {item.seatAssignment.row}{item.seatAssignment.seatNum}</td>
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
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control required type="text" value={formData.name} onChange={handleNameChange} />
                                </Form.Group>
                            </Row>
                            <Row className="mb-3">
                                <Form.Group as={Col} controlId="selectValue">
                                    <Form.Label>Address </Form.Label>
                                    <Form.Control type='text' required value={formData.address} onChange={handleAddressChange} />
                                </Form.Group>

                                <Form.Group as={Col} controlId="dateValue">
                                    <Form.Label>Phone #</Form.Label>
                                    <Form.Control type='text' required value={formData.phoneNum} onChange={handlePhoneNumChange} />
                                </Form.Group>

                            </Row>
                            <Row>
                                <Form.Group as={Col} controlId="dateValue">
                                    <Form.Label>Section</Form.Label>
                                    <Form.Control type='text' required value={formData.section} onChange={handleSectionChange} />
                                </Form.Group>
                                <Form.Group as={Col} controlId="dateValue">
                                    <Form.Label>Row</Form.Label>
                                    <Form.Control type='text' required value={formData.row} onChange={handleRowChange} />
                                </Form.Group>
                                <Form.Group as={Col} controlId="dateValue">
                                    <Form.Label>Seat #</Form.Label>
                                    <Form.Control type='text' required value={formData.seatNum} onChange={handleSeatChange} />
                                </Form.Group>
                            </Row>
                            <Button className='mt-2' variant="primary" type="submit" >
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
            <div style={{ maxWidth: '100%', maxHeight: '100%', alignSelf: 'center' }}>
                <Stack direction='vertical' style={{ marginTop: '40px' }} gap={2}>
                    <div className='d-flex mb-2'>
                        <Button className=' p-2' style={{
                            borderColor: '#FF4057',
                            backgroundColor: '#FF4057',
                        }} // send file path
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
                    <Table align='center' bordered responsive striped hover variant='dark' size='sm' style={{ maxWidth: '90%', maxHeight: '70%', marginTop: '100px' }}>
                        <thead><tr><th style={{ textAlign: 'center', fontSize: '20px' }} colSpan={5}>Ticket Orders</th></tr></thead>
                        <tbody style={{ fontSize: '20px', color: "white" }}>
                            <tr>
                                <th >Name</th>
                                <th>Address</th>
                                <th >Phone #</th>
                                <th >Seat</th>

                            </tr>
                        </tbody>
                    </Table>
                </Stack>

            </div>
        );
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