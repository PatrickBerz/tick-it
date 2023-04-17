import { Form, Stack, Button, Alert, Table, Modal, Row } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';

export const PolicyStuff = () => {
    const [data, setData] = useState(null);
    const [showModal, setShow] = useState(false)
    const [alert, setAlert] = useState(undefined);
    const [formError, setFormError] = useState(null)

    const [formData, setFormData] = useState(
        {
            venueName: '',
            sectionName: '',
            sectionPrice: ''
        }
    )

    const handleClose = () => {
        setShow(false)
        setAlert(undefined)
    }
    const handleBackButton = () => {
        window.location.href = "/adminPage"
    }
    function handleExport() {
        console.log("yay export")

    }
    const handleTextChange = e => {
        setFormData({
            ...formData,
            sectionPrice:  e.target.value
        })
    }

    const handleItemEdit = (item) => {
        setFormData({venueName:item.confNum, sectionName:item.sectionName}) 
        setShow(true)
    };

    const onFormSubmit = (e) => {
        e.preventDefault()
        if (!formData.sectionPrice) {
            setFormError('Please fill in all fields.');
            return;
        }

        setFormError(null);


        let newPrice =
        {
            venueName: formData.venueName,
            section: formData.sectionName,
            sectionPrice: formData.sectionPrice
        }

        console.log(newPrice)


        const promise = fetch('http://localhost:4000/', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ newPrice })
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
                venueName: "",
                sectionName: "",
                sectionPrice: ""
            }
        )
        handleClose()
        setTimeout(() => { window.location.reload(); }, 500);


    }

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('http://localhost:4000/purchaseData')
            const newData = await response.json()
            console.log(JSON.stringify(newData))
            setData(newData)
        }
        fetchData();
    }, []);


    if (data) {
        console.log(JSON.stringify(data))
        return (
            <div className='border border-light-2' style={{ maxWidth: '100%', maxHeight: '100%', alignSelf: 'center', marginTop: '60px', paddingLeft: '25px', paddingRight: '25px' }}>
                <Stack direction='vertical' style={{ marginTop: '40px' }} gap={2}>



                    <div className='d-flex ' style={{ width: '80%', alignSelf: 'center' }}>

                        <Button className='p-2' style={{
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

                    <Stack className='d-flex justify-content-between square border border-secondary border-3 container' direction='horizontal' gap={4} style={{ maxWidth: '80%', maxHeight: '45rem', padding: '20px', overflowY: 'auto', marginBottom: '30px', background: '#282634' }}>
                        <Table bordered responsive striped hover variant='dark' size='lg' style={{ minWidth: '500px' }}>
                            <thead><tr><th style={{ textAlign: 'center', fontSize: '20px' }} colSpan={3}>Playhouse</th></tr></thead>
                            <tbody style={{ fontSize: '20px', color: "white" }}>
                                <tr>
                                    <th >Seat Section</th>
                                    <th >Price</th>
                                    <th style={{ textAlign: 'center' }}>Options</th>
                                </tr>


                                {data.map((item, index) => (
                                    <tr key={index} >
                                        <td >{item.confNum}</td>
                                        <td>{item.purchaser.name}</td>
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
                        <Table bordered responsive striped hover variant='dark' size='lg' style={{ minWidth: '500px' }}>
                            <thead><tr><th style={{ textAlign: 'center', fontSize: '20px' }} colSpan={3}>Concert Hall</th></tr></thead>
                            <tbody style={{ fontSize: '20px', color: "white" }}>
                                <tr>
                                    <th >Seat Section</th>
                                    <th >Price</th>
                                    <th style={{ textAlign: 'center' }}>Options</th>
                                </tr>


                                {data.map((item, index) => (
                                    <tr key={index} >
                                        <td >{item.confNum}</td>
                                        <td>{item.purchaser.name}</td>
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
                    </Stack>

                </Stack>
                <Modal show={showModal} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Enter New Default Price</Modal.Title>
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
                                    <Form.Label>{formData.venueName}</Form.Label>
                                    <Form.Control required type="text" value={formData.sectionPrice} placeholder="Enter new price" onChange={handleTextChange} />
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
    else {
        return null;
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