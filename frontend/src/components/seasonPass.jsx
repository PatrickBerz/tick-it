import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Form, ToggleButton, ToggleButtonGroup, Card, Stack } from 'react-bootstrap';
import {useLocation, Link } from 'react-router-dom';
import React, { useState } from 'react';

export const SeasonPass = () =>{

    var payOnline = true;

    function onPickPayment(){
        var x = document.getElementById("showHide");

        /*Switch the value of payOnline*/
        if (payOnline){
            /*User clicked pay at door*/
            console.log("hide!");
            payOnline = false;
            x.style.display = "none";
        } else {
            /*User clicked pay online*/
            console.log("show!");
            payOnline = true;
            x.style.display = "block";
        }
    }

    return (
        <div>
            <h1 className="col-md-4 mt-4 mx-auto" style={{ color: 'white' }}>Buy a Season Pass ticket!</h1>

            <Form className="col-md-4 mt-4 mx-auto">
                {/*Row 1: First Name*/}
                <Form.Group className="mb-3 mx-auto" controlId="formFName">
                    <Form.Label style={{ color: 'white' }}>First Name</Form.Label>
                    <Form.Control type="fname" placeholder="First Name" />
                </Form.Group>

                {/*Row 2: Last Name*/}
                <Form.Group className="mb-3 mx-auto" controlId="formLName">
                    <Form.Label style={{ color: 'white' }}>Last Name</Form.Label>
                    <Form.Control type="lname" placeholder="Last Name" />
                </Form.Group>

                {/*Row 3: Email Address*/}
                <Form.Group className="mb-3 mx-auto" controlId="formEmailAddress">
                    <Form.Label style={{ color: 'white' }}>Email Address</Form.Label>
                    <Form.Control type="email" placeholder="Email Address" />
                </Form.Group>

                {/*Row 4: Phone Number*/}
                <Form.Group className="mb-3 mx-auto" controlId="formPhoneNumber">
                    <Form.Label style={{ color: 'white' }}>Phone Number</Form.Label>
                    <Form.Control type="email" placeholder="Phone Number"/>
                </Form.Group>


                {/*Radio Button*/}
                
               
                <ToggleButtonGroup type="radio" name="options" defaultValue={1} onChange={onPickPayment}>
                    <ToggleButton id="tbg-radio-1" value={1}>
                    Pay Online
                    </ToggleButton>
                    <ToggleButton id="tbg-radio-2" value={2}>
                    Pay At The Door
                    </ToggleButton>
                </ToggleButtonGroup>

                
                {/*Showing is dependent on radio button value*/}

                <div id="showHide" className="mt-3">
                    {/*Row 5: Name on Card*/}
                    <Form.Group className="mb-3 mx-auto" controlId="formNameOnCard">
                        <Form.Label style={{ color: 'white' }}>Name On Card</Form.Label>
                        <Form.Control type="nameOnCard" placeholder="Name On Card" />
                    </Form.Group>
                    {/*Row 6: Credit/Debit Number*/}
                    <Form.Group className="mb-3 mx-auto" controlId="formCardNumber">
                        <Form.Label style={{ color: 'white' }}>Credit/Debit Card Number</Form.Label>
                        <Form.Control type="cardNumber" placeholder="16-digit Credit/Debit Card Number" />
                    </Form.Group>
                    {/*Row 7: Expiration*/}
                    <Form.Group className="mb-3 mx-auto" controlId="formExpirationDate">
                        <Form.Label style={{ color: 'white' }}>Expiration Date</Form.Label>
                        <Form.Control type="expirationDate" placeholder="MM/DD" />
                    </Form.Group>
                    {/*Row 8: Sec. Code*/}
                    <Form.Group className="mb-3 mx-auto" controlId="formSecCode">
                        <Form.Label style={{ color: 'white' }}>Security Code</Form.Label>
                        <Form.Control type="secCode" placeholder="Security Code" />
                    </Form.Group>
                    {/*Row 9: ZIP Code*/}
                    <Form.Group className="mx-auto" controlId="formZIPCode">
                        <Form.Label style={{ color: 'white' }}>ZIP Code</Form.Label>
                        <Form.Control type="zipCode" placeholder="ZIP Code" />
                    </Form.Group>
                </div>

                <br></br>
                <Button type="submit" className="mb-3 mx-auto" style={{marginTop:'30px'}}>Purchase Season Pass</Button>
            </Form>
        </div>
    )
}