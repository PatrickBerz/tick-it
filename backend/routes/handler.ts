const express = require("express");
const router = express.Router();
const cors = require("cors")

router.use(cors({
    origin: '*'
}));

router.get("/password", (req, res) => {

    const str = [{
        "name": "tick-it",
        "password": "AdminLog"
    }];
    res.end(JSON.stringify(str));
});
router.post("/password", (req, res) => {
    //res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4000/password');
    let password = req.body.value;
    console.log(password);
    if (password == 'admin'){
        res.status(200);
    }
    else{
        res.status(403);
    }
    // const str = [{
    //     "name": "tick-it",
    //     "password": "AdminLog"
    // }];
    // res.end(JSON.stringify(str));
    res.end();
});

module.exports = router;