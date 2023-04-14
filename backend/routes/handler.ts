import express from "express"
const router = express.Router()
import bodyParser from "body-parser"
import cors from "cors"
import { JSONHandler } from "../JSONHandler"; 
import { Seat } from "../src/Seat";





router.use(cors({
    origin: '*'
}));

router.get("/ticketData", (req, res) => {

    let jsonhandler = new JSONHandler()
    
    jsonhandler.deserializePurchase(__dirname + "/../samplePurchases.json")
    let purchases: any[] = jsonhandler.getData() 
    console.log(purchases)
    console.log("\n\n")
    res.json(purchases);
});
router.post("/password", (req, res) => {
    let password = req.body.value;
    console.log(password);
    if (password == 'admin'){
        res.status(200);
    }
    else{
        res.status(418);
    }
    res.end();
});

export default router;