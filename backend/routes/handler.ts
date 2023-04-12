//const express = require("express");
//const router = express.Router();
//const cors = require("cors");
import express from "express"
const router = express.Router()
import bodyParser from "body-parser"
import cors from "cors"
import { JSONHandler } from "../JSONHandler"; 
import { Seat } from "../src/Seat";
import { Ticket } from "../src/Ticket";
import { Purchase } from "../src/Purchase";


// const app = express();
// app.use(bodyParser.urlencoded({extended:false}));
// app.use(bodyParser.json());
// //app.use('/', routesHandler);

// const PORT = 4000;
// app.listen(PORT, () => {
//     console.log('Server is running on port ' + PORT);
// });



router.use(cors({
    origin: '*'
}));

router.get("/ticketData", (req, res) => {

    let seat = new Seat("Orchestra", "A", 12, false, false, 15.99)
    let jsonhandler = new JSONHandler()
    
    //jsonhandler.deserializePurchase('../test6.json')
    jsonhandler.deserializePurchase('../samplePurchases.json')
    let ticket: any[] = jsonhandler.getData() 
    // //const ticket = '[{"purchaser":{"name":"Susan","address":"123 Sesame Street","phoneNum":"6064135244"},"confNum":0,"tickets":[{"performance":"West Side Story","seat":{"section":"Orchestra","row":"B","seatNum":12,"acessible":false,"inSeasonSection":false,"defaultPrice":29.99},"ticketStatus":0,"price":29.99}]}]'
    res.json(ticket);
    //res.end(JSON.stringify(seat))
});
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

//module.exports = router;
export default router;