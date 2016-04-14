this.addEventListener('message', e => {
    var points = e.data,
        result = {
        x: getExtremym(points.x),
        y: getExtremym(points.y)
    };

    this.postMessage(result);
});

const getExtremym = points => {
    return points.length ? {
        min: getMin(points),
        max: getMax(points)
    } : {
        max: 0,
        min: 0
    };
};

const getMin = array => array.reduce((prev, curr) => Math.min(prev, curr));

const getMax = array => array.reduce((prev, curr) => Math.max(prev, curr));