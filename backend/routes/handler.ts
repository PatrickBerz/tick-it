const express = require("express");
const router = express.Router();

router.get("/password", (req, res) => {

    const str = [{
        "name": "tick-it",
        "password": "AdminLog"
    }];
    res.end(JSON.stringify(str));
});
router.post("/password", (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', 'localhost');
    const str = [{
        "name": "tick-it",
        "password": "AdminLog"
    }];
    res.end(JSON.stringify(str));
});

module.exports = router;