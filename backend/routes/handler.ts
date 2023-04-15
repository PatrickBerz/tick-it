//const express = require("express");
//const router = express.Router();
//const cors = require("cors");
import express from "express"
const router = express.Router()
import bodyParser from "body-parser"
import cors from "cors"
import { JSONHandler } from "../JSONHandler"; 
import { Seat } from "../src/Seat";
import { SeasonTicketHolder } from "../src/SeasonTicketHolder";


//FUNCTIONS NEEDED:
//
// Lookup performance by showName, venue, dateTime
// Lookup purchase by confNum


router.use(cors({
    origin: '*'
}));


//get list of season ticket holders
//post new season ticket holder

//post default prices for venue

//get a performance's list of tickets
//maybe? post new list of tickets for a single performance
//post new purchase

//post an exchange


router.get("/seasonTickets"), (req, res) => {
    //get list of season ticket holders from System
    let seasonTixList: SeasonTicketHolder[] = [ new SeasonTicketHolder("Richard Blargson", "5000 Fancy Boulevard", "123-555-5555", new Seat("Orchestra", "A", 15, false, true, 99999.99)),
                                                new SeasonTicketHolder("Moneyton Blargson", "5001 Fancy Boulevard", "123-555-5556", new Seat("Orchestra", "A", 16, false, true, 99999.99))]
    res.json(seasonTixList)
}

router.post("/newSeasonTicket"), (req, res) => {

    //take in and parse new season ticket holder
    //call System function to add new holder to the list
    //call Sys function to mark the tickets sold in the performance
    //set return status to 201 if success
    //otherwise, set to 500
    let data = req.body
    let seat = new Seat(data.section, data.row, data.seatNum, data.accessible, true, data.defaultPrice)
    let newHolder: SeasonTicketHolder = new SeasonTicketHolder(data.name, data.address, data.phoneNum, seat)
    //system.addSeasonHolder(newHolder)
}

router.post("/newDefaults"), (req, res) => {
    // parse defaults. Need venue name and assoc. array of section name to new default price
    // call Sys function to replace old venue? It would have to use JSONHandler to serialize
    
}

router.get("/ticketData/:showName/:venue/:dateTime"), (req, res) => {
    //call System function to lookup a show by show name/venue/dateTime
    //return the JSONified list of tickets within that show
    //req.params["showName"]
}

router.post("/exchange"), (req, res) => {
    //need old conf num, new showName, new venue, new DateTime, new tickets
}


//OLD STUFF, not changed
router.get("/purchaseData", (req, res) => {

    let jsonhandler = new JSONHandler()
    
    //jsonhandler.deserializePurchase('../test6.json')
    jsonhandler.deserializePurchase(__dirname + "/../samplePurchases.json")
    let purchases: any[] = jsonhandler.getData() 
    console.log(purchases)
    console.log("\n\n")
    // //const ticket = '[{"purchaser":{"name":"Susan","address":"123 Sesame Street","phoneNum":"6064135244"},"confNum":0,"tickets":[{"performance":"West Side Story","seat":{"section":"Orchestra","row":"B","seatNum":12,"acessible":false,"inSeasonSection":false,"defaultPrice":29.99},"ticketStatus":0,"price":29.99}]}]'
    res.json(purchases);
});

router.post("/newPurchase"), (req, res) => {
    //need show name, dateTime, ticket list

    //TODO: figure out where to make purchase
    //pass all into System, where it makes a new purchase and adds to list?
    //OR, make new purchase here, then pass to System to add to list
}

router.post("/password", (req, res) => {
    //res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4000/password');
    let password = req.body.value;
    console.log(password);
    if (password == 'admin'){
        res.status(200);
    }
    else{
        res.status(418);
    }
    // const str = [{
    //     "name": "tick-it",
    //     "password": "AdminLog"
    // }];
    // res.end(JSON.stringify(str));
    res.end();
});

router.post("/confNum", (req, res) => {
    let confNum = req.body.value;
    console.log(confNum);
    // get list of confirmation nums from System
    if (confNum == 12345) {
        res.status(200);
    }
    else {
        res.status(418);
    }
    res.end();
});

//module.exports = router;
export default router;