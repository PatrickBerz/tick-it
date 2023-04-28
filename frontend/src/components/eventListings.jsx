import 'bootstrap/dist/css/bootstrap.min.css'
import { Form, Stack, Button, Alert, Table, Modal, InputGroup, Row, Col } from 'react-bootstrap'
import { useState, useEffect } from 'react'

export const EventListings = () => {

    // Controls modal form data
    const [formData, setFormData] = useState({
        performanceName: '',
        venueName: '',
        date: '',
        time: '',
        sectionName:'',
        sectionPrice:''
    });

    const [showModal, setShow] = useState(false) // Controls new event modal
    const [formError, setFormError] = useState(null) // Controls form submission error message
    const [showData, setShowData] = useState([]) // Controls array of show data
    const [alert, setAlert] = useState(undefined); // Controls error/success message

    const [playhouseSections, setPlayhouseSections] = useState([]) // Controls playhouse sections
    const [concertHallSections, setConcertHallSections] = useState([]) // Controls concert hall sections

    /**
     * FUNCTION handle price change of playhouse sections
     * PARAM the section id
     * PARAM new price
     */
    function handlePhPriceChange(section, value) {
        setPlayhouseSections(prevState => ({
            ...prevState,
            [section]: parseFloat(value) 

        }))
    }

    /**
     * FUNCTION handle price change of concert hall sections
     * PARAM the section id
     * PARAM new price
     */
    function handleChPriceChange(section, value) {
        setConcertHallSections(prevState => ({
            ...prevState,
            [section]: parseFloat(value) 

        }))
    }

    /**
     * FUNCTION on buttonclick, navigate back to admin homepage
     */
    const handleBackButton = () => {
        window.location.href = "/adminPage"
    }

    /**
     * FUNCTION on buttonclick, show the new event modal
     */
    const newEventModal = () => {        
        setShow(true)
    }
    
    /**
     * FUNCTION close the new event modal
     */
    const handleClose = () => {
        setShow(false)
        setAlert(undefined)
        setFormData({
            performanceName: '',
            venueName: '',
            date: '',
            time: ''
        })
    }

    /**
     * FUNCTION handle event name field update
     */
    const handleTextChange = e => {
        setFormData({
            ...formData,
            performanceName: e.target.value
        })
    }
    
    /**
     * FUNCTION handle venue selection field update
     */
    const handleSelectChange = e => {
        setFormData({
            ...formData,
            venueName: e.target.value
        })
    }
    
    /**
     * FUNCTION handle date field update
     */
    const handleDateChange = e => {
        setFormData({
            ...formData,
            date: e.target.value
        })
    }
    
    /**
     * FUNCTION handle time field update
     */
    const handleTimeChange = e => {
        setFormData({
            ...formData,
            time: e.target.value
        })
    }
    
    /**
     * FUNCTION handle when a show is deleted on buttonclick
     */
    const handleItemDeleted = (item) => {
        let showDelete =
        {
            performance: {
                performanceName: item.performanceName,
                venueName: item.venueName,
                dateTime: item.dateTime
            }
        }
        const promise = fetch('http://localhost:4000/deleteShow', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ showDelete })
        });
        promise.then(event => {
            if (event.status === 200) {
                setAlert({ label: 'success', type: 'success' })
                handleClose()
            } else {
                setAlert({ label: `${event.statusText}`, type: 'danger' })
            }

        })
        setTimeout(() => { window.location.reload(); }, 500);
    }

    /**
     * FUNCTION convert ISO to pretty CST
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
        return formattedDate
    }


    /**
     * FUNCTION convert datetime to ISO datetime
     */
    function toISODate(dateStr, timeStr) {
        const [year, month, day] = dateStr.split("-");
        const [hour, minute] = timeStr.split(":");

        const paddedMonth = (month.length === 1) ? `0${month}` : month;
        const paddedDay = (day.length === 1) ? `0${day}` : day;
        const paddedHour = (hour.length === 1) ? `0${hour}` : hour;
        const paddedMinute = (minute.length === 1) ? `0${minute}` : minute;

        return `${year}-${paddedMonth}-${paddedDay}T${paddedHour}:${paddedMinute}:00.000Z`;
    }

    /**
     * FUNCTION handle submission of new show form (in new show modal)
     * PAREM event
     */
    const onFormSubmit = (e) => {
        e.preventDefault()
        if (!formData.performanceName || !formData.venueName || !formData.date || !formData.time) {
            setFormError('Please fill in all fields.');
            return;
        }

        setFormError(null);

        let dateTime = toISODate(formData.date, formData.time)

        let newShow =
        {
            performance: {
                performanceName: formData.performanceName,
                venueName: formData.venueName,
                dateTime: dateTime,
                sections: formData.venueName === 'Playhouse' ? playhouseSections : concertHallSections
            }

        }

        const promise = fetch('http://localhost:4000/newShow', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ newShow })
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

        setFormData({
            performanceName: '',
            venueName: '',
            dateTime: ''
        })
        handleClose()
        setTimeout(() => { window.location.reload(); }, 500);
    }
    
    /**
     * USEEFFECT on first render, fetch the playhouse sections from database
     */
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('http://localhost:4000/phSections')
            const phData = await response.json()
            setPlayhouseSections(phData)
        }
        fetchData();
    }, []);
    
    /**
     * USEEFFECT on first render, fetch the concert hall sections from database
     */
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('http://localhost:4000/chSections')
            const chData = await response.json()
            console.log(JSON.stringify(chData))
            setConcertHallSections(chData)
        }
        fetchData();
    }, []);

    /**
     * USEEFFECT on first render, fetch the show list from database
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
    if (showData) {
        // If the show data is loaded
        return (
            <div className='d-flex' style={{ maxWidth: '100%', maxHeight: '100%', alignSelf: 'center', marginTop: '60px', paddingLeft: '25px', paddingRight: '25px' }}>
                <Stack direction='vertical' style={{ marginTop: '40px' }} gap={2}>
                    <div className='d-flex ' style={{ width: '95%', alignSelf: 'center' }}>

                        {/**Create Show button */}
                        <Button className='p-2' style={{
                            borderColor: '#FF4057',
                            backgroundColor: '#FF4057',
                        }}
                            onClick={newEventModal}>
                            Create Show
                        </Button>

                        {/**Back button*/}
                        <Button className='ms-auto p-2' style={{
                            borderColor: '#FF4057',
                            backgroundColor: '#FF4057',
                        }}
                            onClick={handleBackButton}>
                            Back
                        </Button>
                    </div>
                    <div className="square border border-secondary border-3 container" style={{ maxWidth: '95%', maxHeight: '35rem', padding: '20px', overflowY: 'auto', marginBottom: '30px', background: '#282634' }}>

                        {/**Table of event listings/performances*/}
                        <Table bordered responsive striped hover variant='dark' size='sm' >
                            <thead><tr><th style={{ textAlign: 'center', fontSize: '20px' }} colSpan={6}>
                                Performances
                            </th>
                            </tr>
                            </thead>
                            <tbody style={{ fontSize: '20px', color: "white" }}>
                                <tr>
                                    <th >Performance Name</th>
                                    <th >Venue</th>
                                    <th >Date</th>
                                    <th >Seats in Venue</th>
                                    <th></th>
                                </tr>
                                {showData.map((item, index) => (
                                    <tr key={index}>
                                        <td>{item.performanceName}</td>
                                        <td>{item.venueName} </td>
                                        <td>{convertDate(item.dateTime)} </td>
                                        <td>{item.tickets.length} </td>
                                        <td style={{ textAlign: 'center' }}>
                                            <Button
                                                size='sm'
                                                onClick={() => { handleItemDeleted(item) }}>
                                                Delete
                                            </Button>
                                        </td>
                                    </tr>
                                ))}

                            </tbody>
                        </Table>
                    </div>
                </Stack>

                {/**New Show Modal*/}
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
                                    <Form.Label style={{ fontSize: '18px' }}>Event Name</Form.Label>
                                    <Form.Control required type="text" value={formData.performanceName} placeholder="Enter event name" onChange={handleTextChange} />
                                </Form.Group>
                            </Row>
                            <Row className="mb-3">
                                <Form.Group as={Col} controlId="selectVenue">
                                    <Form.Label style={{ fontSize: '18px' }}>Pick Venue </Form.Label>
                                    <Form.Select required value={formData.venueName} onChange={handleSelectChange} >
                                        <option value="">Select an option</option>
                                        <option value="Playhouse">Playhouse</option>
                                        <option value="Concert Hall">Concert Hall</option>
                                    </Form.Select>
                                </Form.Group>

                                <Form.Group as={Col} controlId="dateValue">
                                    <Form.Label style={{ fontSize: '18px' }}>Date</Form.Label>
                                    <Form.Control type='date' required placeholder="MM/DD/YYYY" min={new Date().toISOString().slice(0,10)} value={formData.date} onChange={handleDateChange} />
                                </Form.Group>

                            </Row>
                            <Row>
                                <Form.Group as={Col} controlId="timeValue" >
                                    <Form.Label style={{ fontSize: '18px' }}>Time</Form.Label>
                                    <Form.Control type='time' required value={formData.time}  onChange={handleTimeChange} />
                                </Form.Group>
                                <Form.Group as={Col}></Form.Group>
                            </Row>
                            <Form.Group>
                                <Form.Label column sm='2' className='mb-0' style={{ fontSize: '18px' }}>Sections</Form.Label>
                            </Form.Group>
                            {formData.venueName == "Playhouse" && (
                                Object.keys(playhouseSections).map((section, index) => (
                                    <Form.Group controlId='selectVenue' className='mt-2' as={Row} key={index}>
                                        <Row>
                                            <Form.Label column sm='2' >{section}</Form.Label>
                                            <Col sm='4'>
                                                <InputGroup size='sm'>
                                                    <InputGroup.Text>$</InputGroup.Text>
                                                    <Form.Control type="number" step={"0.01"} value={playhouseSections[section]} placeholder="Price" onChange={e => { handlePhPriceChange(section, e.target.value) }} />
                                                </InputGroup>
                                            </Col>
                                        </Row>
                                    </Form.Group>
                                ))
                            )}
                            {formData.venueName == "Concert Hall" && (
                                Object.keys(concertHallSections).map((section, index) => (
                                    <Form.Group controlId='selectVenue' className='mt-2' as={Row} key={index}>

                                        <Row>
                                            <Form.Label column sm='2' >{section}</Form.Label>
                                            <Col sm='4'>
                                                <InputGroup size='sm'>
                                                    <InputGroup.Text>$</InputGroup.Text>
                                                    <Form.Control type="number" step={"0.01"} value={concertHallSections[section]} placeholder="Price" onChange={e => { handleChPriceChange(section, e.target.value) }} />
                                                </InputGroup>
                                            </Col>
                                        </Row>
                                    </Form.Group>
                                ))
                            )}
                            <Button className='mt-3' variant="primary" type="submit" >
                                Submit
                            </Button>
                        </Form>
                    </Modal.Body>
                </Modal>
            </div>
        )
    }
    else {
        // Otherwise, if the shows don't load...
        return (
            <div className='d-flex' style={{ maxWidth: '100%', maxHeight: '100%', alignSelf: 'center', marginTop: '60px', paddingLeft: '25px', paddingRight: '25px' }}>
                <Stack direction='vertical' style={{ marginTop: '40px' }} gap={2}>
                    <div className='d-flex ' style={{ width: '95%', alignSelf: 'center' }}>
                        <Button className='p-2' style={{
                            borderColor: '#FF4057',
                            backgroundColor: '#FF4057',
                        }}
                            onClick={newEventModal}>
                            Create Show
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
                            <thead><tr><th style={{ textAlign: 'center', fontSize: '20px' }} colSpan={6}>
                                Performances
                            </th>
                            </tr>
                            </thead>
                            <tbody style={{ fontSize: '20px', color: "white" }}>
                                <tr>
                                    <th >Performance Name</th>
                                    <th >Venue</th>
                                    <th >Date</th>
                                    <th >Seats Left</th>
                                    <th></th>
                                </tr>
                            </tbody>
                        </Table>
                    </div>
                    <div className="square border border-secondary border-3 container" style={{ maxWidth: '95%', maxHeight: '45rem', padding: '20px', overflowY: 'auto', marginBottom: '30px', background: '#282634' }}>

                        <Table bordered responsive striped hover variant='dark' size='sm' >
                            <thead><tr><th style={{ textAlign: 'center', fontSize: '20px' }} colSpan={6}>
                                Performances
                            </th>
                            </tr>
                            </thead>
                            <tbody style={{ fontSize: '20px', color: "white" }}>
                                <tr>
                                    <th >Performance Name</th>
                                    <th >Venue</th>
                                    <th >Date</th>
                                    <th >Seats Left</th>
                                    <th></th>
                                </tr>
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
                                    <Form.Label>Event Name</Form.Label>
                                    <Form.Control required type="text" value={formData.performanceName} placeholder="Enter event name" onChange={handleTextChange} />
                                </Form.Group>
                            </Row>
                            <Row className="mb-3">
                                <Form.Group as={Col} controlId="selectValue">
                                    <Form.Label>Pick Venue </Form.Label>
                                    <Form.Select required value={formData.venueName} onChange={handleSelectChange} >
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
                            <Row>
                                <Form.Group as={Col} controlId="dateValue">
                                    <Form.Label>Date</Form.Label>
                                    <Form.Control type='time' required placeholder="MM/DD/YYYY" value={formData.time} onChange={handleTimeChange} />
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

}