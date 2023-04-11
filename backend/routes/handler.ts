const express = require("express");
const router = express.Router();
const cors = require("cors")
import { Seat } from "../src/Seat";

router.use(cors({
    origin: '*'
}));

router.get("/ticketData", (req, res) => {

    let seat:Seat = new Seat("Orchestra", "A", 12, false, false, 15.99)
    // const ticket = [{
    //     "performance": "Phantom of the Opera",
    //     "seat": "A12",
    //     "ticketStatus": "Reserved",
    //     "price": "15.99"
    // }];
    const data = { name: "John Doe", age: 30}
    //res.json(JSON.stringify(seat));
    res.json(data);
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

module.exports = router;