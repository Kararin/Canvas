var express = require('express');
var router = express.Router(),
    funcObj = {
        a: 2,
        tMin: -2,
        tMax: 3,
        step: 0.012
    };

/* GET users listing. */
router.get('/params', function(req, res, next) {
    res.send(funcObj);
});


module.exports = router;