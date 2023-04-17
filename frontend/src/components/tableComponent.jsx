import 'bootstrap/dist/css/bootstrap.min.css'
import React from 'react'
import { Form, Stack, Button, Alert, Table, Modal, FormGroup, Row, Col } from 'react-bootstrap'

export default class DynamicTable extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            message: "",
            items: []
        }
    }
    handleBackButton = () => {
        window.location.href = "/adminPage"

    }
    handleExport() {
        console.log("yay export")

    }

    // newEventModal = () => {
    //     setShow(true)
    // };
    handleClose = () => {
        // setShow(false)
        // setAlert(undefined)

    }

    updateMessage(event) {
        this.setState({
            message: event.target.value
        });
    }

    handleClick() {
        var items = this.state.items;

        items.push(this.state.message);

        this.setState({
            items: items,
            message: ""
        });
    }

    handleItemChanged(i, event) {
        var items = this.state.items;
        items[i] = event.target.value;

        this.setState({
            items: items
        });
    }

    handleItemDeleted(i) {
        var items = this.state.items;

        items.splice(i, 1);

        this.setState({
            items: items
        });
    }

    renderRows() {
        var context = this;

        return this.state.items.map(function (o, i) {
            return (
                <tr key={"item-" + i}>
                    <td>
                        <input
                            type="text"
                            value={o}
                            onChange={context.handleItemChanged.bind(context, i)}
                        />
                    </td>
                    <td>
                        <button
                            onClick={context.handleItemDeleted.bind(context, i)}
                        >
                        
                            Delete
                        </button>
                    </td>
                </tr>
            );
        });
    }

    render() {
        return (
            <div>
            <div className='d-flex mb-2'>
                    <Button className='p-2' style={{
                        borderColor: '#FF4057',
                        backgroundColor: '#FF4057',
                    }}
                        >
                        Create Show
                    </Button>
                    <Button className='ms-2 p-2' style={{
                        borderColor: '#FF4057',
                        backgroundColor: '#FF4057',
                    }} // send file path
                        onClick={this.handleExport}>
                        Import Data 
                    </Button>
                    <Button className='ms-2 p-2' style={{
                        borderColor: '#FF4057',
                        backgroundColor: '#FF4057',
                    }} //0 or 1
                        onClick={this.handleExport}>
                        Export Data 
                    </Button>
                    
                    <Button className='ms-auto p-2' style={{
                        borderColor: '#FF4057',
                        backgroundColor: '#FF4057',
                    }}
                        onClick={this.handleBackButton}>
                        Back
                    </Button>
                </div>
                    <Table align='center' bordered responsive striped hover variant='dark' size='sm' style={{ maxHeight: '70%' }}>
                        <thead><tr><th style={{ textAlign: 'center', fontSize: '20px' }} colSpan={6}>
                            Shows
                        </th>
                        </tr>
                        </thead>
                        <thead>
                            <tr>
                                <th>Item</th>
                                <th>Performance</th>
                                <th></th>
                            </tr>
                        </thead>

                        <tbody>
                            {this.renderRows()}
                        </tbody>

                        {/* <tbody style={{ fontSize: '20px', color: "white" }}>
                        

                        <tr>
                            
                            <th style={{ textAlign: 'center' }}>Venue</th>
                            <th style={{ textAlign: 'center' }}>Date</th>
                            <th style={{ textAlign: 'center' }}>Seats Left</th>
                        </tr> */}

                        {/* {showData.map((item, index) => (
                            <tr key={index} style={{ alignItems: 'center' }}>
                                <td style={{ textAlign: 'center' }}>{item.show.performance}</td>
                                <td>{item.show.venue} </td>
                                <td>{item.show.date} </td>
                                <td>number </td>
                            </tr>
                        ))}

                    </tbody> */}
                    </Table>
                    <hr />
                    <input
                        type="text"
                        value={this.state.message}
                        onChange={this.updateMessage.bind(this)}
                    />
                    <button
                        onClick={this.handleClick.bind(this)}
                    >
                        Add Item
                    </button>
            </div>

        )
    }
}

