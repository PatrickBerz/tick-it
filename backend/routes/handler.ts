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
                "confNum": 0,
                "performance": "West Side Story",
                "seat":
                {
                    "section": "Orchestra",
                    "row": "B",
                    "seatNum": 12,
                    "acessible": false,
                    "inSeasonSection": false,
                    "defaultPrice": 29.99
                },
                "ticketStatus": 0,
                "price": 29.99,
                "purchaser":
                {
                    "name": "Susan",
                    "address": "123 Sesame Street",
                    "phoneNum": "6064135244"
                },
            },

        },
        {
            "ticket":
            {
                "confNum": 1,
                "performance": "West Side Story",
                "seat":
                {
                    "section": "Orchestra",
                    "row": "B",
                    "seatNum": 13,
                    "acessible": false,
                    "inSeasonSection": false,
                    "defaultPrice": 29.99
                },
                "ticketStatus": 0,
                "price": 29.99,
                "purchaser":
                {
                    "name": "Susan",
                    "address": "123 Sesame Street",
                    "phoneNum": "6064135244"
                },
            },

        },
        {
            "ticket":
            {
                "confNum": 3,
                "performance": "Magic Mike",
                "seat":
                {
                    "section": "Orchestra",
                    "row": "C",
                    "seatNum": 34,
                    "acessible": false,
                    "inSeasonSection": false,
                    "defaultPrice": 29.99
                },
                "ticketStatus": 0,
                "price": 29.99,
                "purchaser":
                {
                    "name": "Tom",
                    "address": "Easy Street",
                    "phoneNum": "6064135244"
                },
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