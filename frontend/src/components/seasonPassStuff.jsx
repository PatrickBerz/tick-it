import { Form, Stack, Button, Alert, Table } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';

export const SeasonPassStuff = () => {
    const [data, setData] = useState(null);
    const [showModal, setShow] = useState(false)

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

    const newEventModal = () => {
        setShow(true)
    };

    if (data) {
        console.log(JSON.stringify(data))
        return (
            <div className='border border-light-2' style={{ maxWidth: '100%', maxHeight: '100%', alignSelf: 'center', marginTop: '60px', paddingLeft: '25px', paddingRight: '25px' }}>

                <Stack direction='vertical' style={{ marginTop: '40px' }} gap={2}>
                    <div className='d-flex mb-2'>
                        <Button className='p-2' style={{
                            borderColor: '#FF4057',
                            backgroundColor: '#FF4057',
                        }}
                            onClick={newEventModal}>
                            Add Pass
                        </Button>
                        <Button className='ms-2 p-2' style={{
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
                    <Table bordered responsive striped hover variant='dark' size='sm' style={{ maxHeight: '70%' }}>
                        <thead><tr><th style={{ textAlign: 'center', fontSize: '20px' }} colSpan={5}>Season Pass Holders</th></tr></thead>
                        <tbody style={{ fontSize: '20px', color: "white" }}>
                            <tr>
                                <th style={{ textAlign: 'center' }}>Name</th>
                                <th style={{ textAlign: 'center' }}>Address</th>
                                <th style={{ textAlign: 'center' }}>Phone #</th>
                                <th style={{ textAlign: 'center' }}>Seat</th>
                            </tr>


                            {data.map((item, index) => (
                                <tr key={index} style={{ alignItems: 'center' }}>
                                    <td style={{ textAlign: 'center' }}>{item.name}</td>
                                    <td>{item.address}</td>
                                    <td >{item.phoneNum}</td>
                                    <td>{item.seatAssignment.section} {item.seatAssignment.row}{item.seatAssignment.seatNum}</td>

                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Stack>
            </div>
        )
    }
    else {
        return (
            <div style={{ maxWidth: '100%', maxHeight: '100%', alignSelf: 'center' }}>
                <Table align='center' bordered responsive striped hover variant='dark' size='sm' style={{ maxWidth: '90%', maxHeight: '70%', marginTop: '100px' }}>
                    <thead><tr><th style={{ textAlign: 'center', fontSize: '20px' }} colSpan={5}>Ticket Orders</th></tr></thead>
                    <tbody style={{ fontSize: '20px', color: "white" }}>
                        <tr>
                            <th style={{ textAlign: 'center' }}>Name</th>
                            <th style={{ textAlign: 'center' }}>Address</th>
                            <th style={{ textAlign: 'center' }}>Phone #</th>
                            <th style={{ textAlign: 'center' }}>Seat</th>
                        </tr>
                    </tbody>
                </Table>

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