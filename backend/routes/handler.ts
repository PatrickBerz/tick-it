const express = require("express");
const router = express.Router();

router.get("/password", (req, res) => {

    const str = [{
        "name": "tick-it"
    }];
    res.end(JSON.stringify(str));
});

module.exports = router;