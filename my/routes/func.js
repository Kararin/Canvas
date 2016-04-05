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

router.post('/updateParam', (req, res, next) => {
    var newParam = req.body.param;

    Object.assign(funcObj, newParam);

    res.send(funcObj);
});

router.get('/getPoints', (req, res, next) => {
    res.send(calcPoints());
});

 const calcPoints = () => {
     'use strict';

    var points = {
            x: [],
            y: []
        },
        step = funcObj.step,
        tMax = funcObj.tMax,
        tMin = funcObj.tMin,
        t = tMin;

    if (step > 0) {
        while (t < tMax) {
            let tempPoints = countXY(t);
            points.x.push(tempPoints.x);
            points.y.push(tempPoints.y);
            t += step;
        }
    }

    return points;
};

 const countXY = (t) => {
     'use strict';

    var a = funcObj.a;

    return {
        x: a * (t * t - 1) / (t * t + 1),
        y: a * t * (t * t - 1) / (t * t + 1)
    };
};
module.exports = router;