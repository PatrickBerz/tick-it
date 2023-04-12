const express = require("express");
const router = express.Router();
const cors = require("cors");
//import { JSONHandler } from "../JSONHandler"; 
// import { Seat } from "../src/Seat";
// import { Ticket } from "../src/Ticket";
// import { Purchase } from "../src/Purchase";

router.use(cors({
    origin: '*'
}));

router.get("/ticketData", (req, res) => {

    //let seat = new Seat("Orchestra", "A", 12, false, false, 15.99)
    // let jsonhandler = new JSONHandler()

    // jsonhandler.deserializePurchase('backend/test6.json')
    // let ticket: any[] = jsonhandler.getData() 
    // //const ticket = '[{"purchaser":{"name":"Susan","address":"123 Sesame Street","phoneNum":"6064135244"},"confNum":0,"tickets":[{"performance":"West Side Story","seat":{"section":"Orchestra","row":"B","seatNum":12,"acessible":false,"inSeasonSection":false,"defaultPrice":29.99},"ticketStatus":0,"price":29.99}]}]'
    // res.json(ticket);
    const ticket = [
        {
            "ticket":
            {
                "confNum": 1,
                "performance": "West Side Story",
                "eventHall" : "Concert Hall",
                "price": 29.99,
                "seat":
                {
                    "section": "Orchestra",
                    "row": "C",
                    "seatNum": 12,
                    "acessible": false,
                    "inSeasonSection": false,
                    "defaultPrice": 29.99
                },
                
                "purchaser":
                {
                    "first": "Susan",
                    "last": "Brooks",
                    "address": "123 Sesame Street",
                    "phoneNum": "6064135244"
                },
                "paymentStatus": 1,
                "payment":
                {
                    "nameOnCard":"Susan s Brooks",
                    "cardNumber":1234567891234567,
                    "expDate": "03/19",
                    "secCode": 876,
                    "zip":45743
                }
            },

        },
        {
            "ticket":
            {
                "confNum": 2,
                "performance": "West Side Story",
                "eventHall" : "Concert Hall",
                "price": 29.99,
                "seat":
                {
                    "section": "Orchestra",
                    "row": "C",
                    "seatNum": 13,
                    "acessible": false,
                    "inSeasonSection": false,
                    "defaultPrice": 29.99
                },
                
                "purchaser":
                {
                    "first": "Susan",
                    "last": "Brooks",
                    "address": "123 Sesame Street",
                    "phoneNum": "6064135244"
                },
                "paymentStatus": 1,
                "payment":
                {
                    "nameOnCard":"Susan s Brooks",
                    "cardNumber":1234567891234567,
                    "expDate": "03/19",
                    "secCode": 876,
                    "zip":45743
                }
            },

        },
        {
            "ticket":
            {
                "confNum": 3,
                "performance": "Magic Mike",
                "eventHall" : "playhouse",
                "price": 29.99,
                "seat":
                {
                    "section": "Orchestra",
                    "row": "C",
                    "seatNum": 34,
                    "acessible": false,
                    "inSeasonSection": false,
                    "defaultPrice": 29.99
                },
                
                "purchaser":
                {
                    "first": "Tom",
                    "last": "smith",
                    "address": "Easy Street",
                    "phoneNum": "6064135244"
                },
                "paymentStatus": 0,
                "payment":
                {
                    "nameOnCard":"Tom J Smith",
                    "cardNumber":2345257687659065,
                    "expDate": "02/12",
                    "secCode": 678,
                    "zip":35807
                }
            },

        }
    ]
    res.json(ticket);
});

router.post("/password", (req, res) => {
    //res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4000/password');
    let password = req.body.value;
    console.log(password);
    if (password == 'admin') {
        res.status(200);
    }
    else {
        res.status(418);
    }
    // const str = [{
    //     "name": "tick-it",
    //     "password": "AdminLog"
    // }];
    // res.end(JSON.stringify(str));
    res.end();
});

module.exports = router;