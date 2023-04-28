import { Form, Stack, Button, Alert, Table, Modal, Row, Col,InputGroup } from 'react-bootstrap';
import { useState, useEffect } from 'react';

export const PolicyStuff = () => {
    const [data, setData] = useState(null) // Controls default prices
    const [showModal, setShow] = useState(false) // Controls Edit modal
    const [alert, setAlert] = useState(undefined) // Controls success/error message
    const [formError, setFormError] = useState(null) // Controls form submission error

    // Controls user-inputted form data
    const [formData, setFormData] = useState(
        {
            venueName: '',
            sectionName: '',
            sectionPrice: ''
        }
    )

    /**
     * FUNCTION close Edit modal
     */
    const handleClose = () => {
        setShow(false)
        setAlert(undefined)
    }
    
    /**
     * FUNCTION navigate to admin homepage
     */
    const handleBackButton = () => {
        window.location.href = "/adminPage"
    }
    
    /**
     * FUNCTION when the field is changed by the user, update the price data
     */
    const handleTextChange = e => {
        setFormData({
            ...formData,
            sectionPrice: e.target.value
        })
    }

    /**
     * FUNCTION on buttonclick, show the Edit modal
     * PARAMS identifiers of this table cell
     */
    const handleItemEdit = (vName, item, value) => {
        setFormData({ venueName: vName, sectionName: item, sectionPrice: value })
        setShow(true)
    };

    /**
     * FUNCTION handle form submission in Edit modal
     */
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

        const promise = fetch('http://localhost:4000/newDefault', {
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

    /**
     * USEEFFECT on first render, fetch the default prices for each venue
     */
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('http://localhost:4000/venueDefaults')
            const newData = await response.json()
            console.log(JSON.stringify(newData))
            setData(newData)
        }
        fetchData();
    }, []);

    /**
     * RETURN render page elements
     */
    if (data) {
        // If there is data to load...
        return (
            <div className='d-flex' style={{ maxWidth: '100%', maxHeight: '100%', alignSelf: 'center', marginTop: '60px', paddingLeft: '25px', paddingRight: '25px' }}>
                <Stack direction='vertical' style={{ marginTop: '40px' }} gap={2}>
                    <div className='d-flex ' style={{ width: '80%', alignSelf: 'center' }}>

                        {/**Back button */}
                        <Button className='ms-auto p-2' style={{
                            borderColor: '#FF4057',
                            backgroundColor: '#FF4057',
                        }}
                            onClick={handleBackButton}>
                            Back
                        </Button>
                    </div>

                    <div className='d-flex justify-content-between square border border-secondary border-3 container' gap={4} style={{ maxWidth: '80%', maxHeight: '35rem', padding: '40px', overflowY: 'auto', marginBottom: '30px', background: '#282634' }}>
                        {/**Table of Playhouse defualt prices */}
                        <Table bordered striped hover variant='dark' size='lg' style={{ width: '500px' }}>
                            <thead><tr><th style={{ textAlign: 'center', fontSize: '20px' }} colSpan={3}>Playhouse</th></tr></thead>
                            <tbody style={{ fontSize: '20px', color: "white" }}>
                                <tr>
                                    <th >Seat Section</th>
                                    <th >Price</th>
                                    <th style={{ textAlign: 'center' }}>Options</th>
                                </tr>
                                {Object.keys(data[1]).map((item, index) => (
                                    <tr key={index} >
                                        <td >{item}</td>
                                        <td>${data[1][item]}</td>
                                        <td style={{ textAlign: 'center' }}>
                                            <Button
                                                size='sm'
                                                onClick={() => { handleItemEdit("Playhouse", item, data[1][item]) }}>
                                                Edit
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>

                        {/**Table of Concert Hall defualt prices */}
                        <Table bordered responsive striped hover variant='dark' size='lg' style={{ width: '500px' }}>
                            <thead><tr><th style={{ textAlign: 'center', fontSize: '20px' }} colSpan={3}>Concert Hall</th></tr></thead>
                            <tbody style={{ fontSize: '20px', color: "white" }}>
                                <tr>
                                    <th >Seat Section</th>
                                    <th >Price</th>
                                    <th style={{ textAlign: 'center' }}>Options</th>
                                </tr>
                                {Object.keys(data[0]).map((item, index) => (
                                    <tr key={index} >
                                        <td >{item}</td>
                                        <td>{data[0][item]}</td>
                                        <td style={{ textAlign: 'center' }}>
                                            <Button
                                                size='sm'
                                                onClick={() => { handleItemEdit("Concert Hall", item, data[0][item]) }}>
                                                Edit
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </div>
                </Stack>

                {/**Edit Modal */}
                <Modal size='sm' show={showModal} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit Default Price</Modal.Title>
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
                                <Form.Group as={Col}  controlId="textValue">
                                    <InputGroup size='sm'>
                                        <Form.Label >{formData.venueName}</Form.Label>
                                        <InputGroup.Text className='ms-2'>$</InputGroup.Text>
                                        <Form.Control className='me-5' type="number" min={0} step={'0.01'} value={formData.sectionPrice} onChange={handleTextChange} />
                                    </InputGroup>
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
        // Otherwise, return a blank page (should not occur)
        return null;
    }

}