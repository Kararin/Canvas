this.addEventListener('message', (e) => {
    var data = e.data,
        points = calcPoints(data);

    this.postMessage(points);
    this.close();
});

 const calcPoints = (params) => {
     'use strict';

    var points = {
            x: [],
            y: []
        }, {
            step,
            tMax,
            tMin,
            a
        } = params,
        t = tMin;

    if (step > 0) {
        while (t < tMax) {
            points.x.push(countX(t, a));
            points.y.push(countY(t, a));
            t += step;
        }
    }

    return points;
};


const countX = (t, a) => {
    return a * (t * t - 1) / (t * t + 1);
};

const countY = (t, a) => {
    return a * t * (t * t - 1) / (t * t + 1);
};