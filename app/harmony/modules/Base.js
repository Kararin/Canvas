export default class Base {
    constructor(options = {
        color: '#eee',
        width: 500,
        height: 500,
        interval: 20
    }) {
        this.ctx = options.ctx;
        this.width = options.width;
        this.height = options.height;
        this.color = options.color;
        this.interval = options.interval;
        this.begin = 0.5;
    }
}