import { Form, Stack, Button, Alert, Table, Modal, Row, Col, ToggleButton, ToggleButtonGroup } from 'react-bootstrap';
import { useState, useEffect } from 'react';

export const SeasonPassStuff = () => {
    const [data, setData] = useState(null); // Controls season pass data
    const [showModal, setShow] = useState(false) // Controls Edit modal
    const [alert, setAlert] = useState(undefined); // Controls success/error message

    const [formError, setFormError] = useState(null) // Controls form submission error
    const [importModal, setImportModal] = useState(false) // Controls Import modal
    const [exportModal, setExportModal] = useState(false) // Controls Export modal
    const [exportConfModal, setExportConfModal] = useState(false) // Controls Export confirmation modal
    const [format, setFormat] = useState("json") // Controls export format
    const [fileContents, setFileContents] = useState(null) // Controls imported file contents
    
    /**
     * USEEFFECT on first page render, fetch season passholder information
     */
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('http://localhost:4000/seasonTickets')
            const newData = await response.json()
            console.log(JSON.stringify(newData))
            setData(newData)
        }
        fetchData();
    }, []);

    // Control user-submitted form data
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
    
    /**
     * FUNCTION handle close of Edit modal
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
     * FUNCTION handle change of file type 
     */
    const handleFileChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            if (file.type === 'text/csv' || file.type === 'application/json') {
                const reader = new FileReader()
                reader.readAsText(file)
                reader.onload = (e) => {
                    const contents = e.target.result
                    console.log(contents)

                    setFileContents(contents)
                }
            } else {
                console.log("Please upload valid file type")
            }
        }
    }
    
    /**
     * FUNCTION send imported file contents to database
     */
    const handleImportSubmit = (e) => {
        e.preventDefault()
        const promise = fetch('http://localhost:4000/importPath', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ fileContents })
        });
        console.log(promise)
        promise.then(event => {
            if (event.status === 200) {
                console.log({ label: 'success', type: 'success' })
                setImportModal(false)
            } else {
                console.log({ label: `${event.statusText}`, type: 'danger' })
            }
        })

        setFileContents(null)
        setImportModal(false)

        setTimeout(() => { window.location.reload(); }, 500);
    }

    /**
     * FUNCTION open Import modal
     */
    function handleImportModal() {
        setImportModal(true)
    }
    
    /**
     * FUNCTION close Import modal
     */
    function handleCloseImport() {
        setImportModal(false)
    }
    
    /**
     * FUNCTION on buttonclick, tell backend server to export data of a certain filetype
     */
    function handleExport() {
        let choice = { fileType: format}
        const promise = fetch('http://localhost:4000/exportPath', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ choice })
        });
    }
    
    /**
     * FUNCTION open Export modal
     */
    function handleOpenExport() {
        setExportModal(true)
    }

    /**
     * FUNCTION close Export modal
     */
    function handleCloseExport() {
        handleExport()
        setExportModal(false)
        setExportConfModal(true)
    }
    
    /**
     * FUNCTION close Export confirmation modal
     */
    function handleCloseExportConf() {
        setExportConfModal(false)
    }
    
    /**
     * FUNCTION handle selecting a radio button
     * PARAM value of the selected radio button
     */
    const onPickFormat = (val) => {
        setFormat(val);
    }

    /**
     * FUNCTION handle edit of season passholder
     */
    const handleItemEdit = (item) => {
        setFormData({ name: item.name, address: item.address, phoneNum: item.phoneNum, section: item.seatAssignment.section, row: item.seatAssignment.row, seatNum: item.seatAssignment.seatNum })
        setShow(true)
    }

    /**
     * FUNCTION handle update of name field
     */
    const handleNameChange = e => {
        setFormData({
            ...formData,
            name: e.target.value
        })
    }
    
    /**
     * FUNCTION handle update of address field
     */
    const handleAddressChange = e => {
        setFormData({
            ...formData,
            address: e.target.value
        })
    }
    
    /**
     * FUNCTION handle update of phone number field
     */
    const handlePhoneNumChange = e => {
        setFormData({
            ...formData,
            phoneNum: e.target.value
        })
    }

    /**
     * FUNCTION handle submission of Edit modal form
     */
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

    /**
     * RETURN render page elements
     */
    if (data) {
        // If there is data to load...
        return (
            <div className='d-flex' style={{ maxWidth: '100%', maxHeight: '100%', alignSelf: 'center', marginTop: '60px', paddingLeft: '25px', paddingRight: '25px' }}>
                <Stack direction='vertical' style={{ marginTop: '40px' }} gap={2}>
                    <div className='d-flex ' style={{ width: '95%', alignSelf: 'center' }}>

                        {/**Import button */}
                        <Button className=' p-2' style={{
                            borderColor: '#FF4057',
                            backgroundColor: '#FF4057',
                        }} // send file path
                            onClick={handleImportModal}>
                            Import Data
                        </Button>
                        
                        {/**Export button */}
                        <Button className='ms-2 p-2' style={{
                            borderColor: '#FF4057',
                            backgroundColor: '#FF4057',
                        }} //0 or 1
                            onClick={handleOpenExport}>
                            Export Data
                        </Button>

                        {/**Back button */}
                        <Button className='ms-auto p-2' style={{
                            borderColor: '#FF4057',
                            backgroundColor: '#FF4057',
                        }}
                            onClick={handleBackButton}>
                            Back
                        </Button>
                    </div>
                    <div className="square border border-secondary border-3 container" style={{ maxWidth: '95%', maxHeight: '45rem', padding: '20px', overflowY: 'auto', marginBottom: '30px', background: '#282634' }}>
                        
                        {/**Table of season passholders */}
                        <Table bordered responsive striped hover variant='dark' size='sm'>
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

                {/**Edit Modal */}
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
                                    <Form.Control type='number' pattern='[0-9]' required value={formData.phoneNum} onChange={handlePhoneNumChange} />
                                </Form.Group>

                            </Row>
                            <Row>
                                <Form.Group as={Col} controlId="sectionValue">
                                    <Form.Label>Section</Form.Label>
                                    <Form.Control plaintext readOnly defaultValue={formData.section} />
                                </Form.Group>
                                <Form.Group as={Col} controlId="rowValue">
                                    <Form.Label>Row</Form.Label>
                                    <Form.Control plaintext readOnly defaultValue={formData.row} />
                                </Form.Group>
                                <Form.Group as={Col} controlId="seatValue">
                                    <Form.Label>Seat #</Form.Label>
                                    <Form.Control plaintext readOnly defaultValue={formData.seatNum} />
                                </Form.Group>
                            </Row>
                            <Button className='mt-2' variant="success" type="submit" >
                                Submit
                            </Button>

                        </Form>
                    </Modal.Body>
                </Modal>
                
                {/**Import Modal */}
                <Modal show={importModal} onHide={handleCloseImport}>
                    <Modal.Header closeButton></Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={handleImportSubmit}>
                            <Form.Group controlId="formFile">
                                <Form.Label>Select a file</Form.Label>
                                <Form.Control type='file' accept='.json' onChange={handleFileChange}></Form.Control>
                                <Form.Text className='text-muted'>Only JSON is allowed</Form.Text>
                            </Form.Group>
                            <Button type='submit' variant='success' onClick={() => console.log(fileContents)}>Submit</Button>
                        </Form>
                    </Modal.Body>
                </Modal>
                
                {/**Export Modal */}
                <Modal show={exportModal} onHide={handleCloseExport}>
                    <Modal.Header closeButton>
                        <Modal.Title>Export to a file</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Text className="text-center">Please select the format you would like to export in.</Form.Text>
                            <br></br>
                            <br></br>
                            <ToggleButtonGroup className="mb-4 text-center" type="radio" name="format" defaultValue="json" onChange={onPickFormat}>
                                <ToggleButton id="tbg-radio-format-1" value="json">
                                JSON
                                </ToggleButton>
                                <ToggleButton id="tbg-radio-format-2" value="csv">
                                CSV
                                </ToggleButton>
                            </ToggleButtonGroup>
                            <br></br>
                            <Button className="text-center" variant='success' onClick={() => handleCloseExport()}>Export</Button>
                        </Form>
                    </Modal.Body>
                </Modal>
                
                {/**Export confirmation Modal */}
                <Modal show={exportConfModal} onHide={handleCloseExportConf}>
                    <Modal.Header closeButton>
                        <Modal.Title>Export to a file</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Text className="text-center">Export complete! Please check your TickIt directory.</Form.Text>
                            <br></br>
                            <br></br>
                            <Button className="text-center" variant='danger' onClick={() => handleCloseExportConf()}>Close</Button>
                        </Form>
                    </Modal.Body>
                </Modal>
            </div>
        )
    }
    else {
        // Otherwise, load an empty table...
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