import Drawer from './modules/Drawer';
import Field from './modules/Field';
import Coord from './modules/Coord';

document.addEventListener("DOMContentLoaded", () => {
    let el = document.getElementById('func'),
        ctx = el.getContext('2d'),
        interval = 20,
        width = 1000,
        height = 800,
        field = new Field({
            interval,
            width,
            height,
            ctx,
            color: '#eee'
        }),
        coord = new Coord({
            interval,
            width,
            height,
            ctx,
            font: '10px Arial',
            color: '#000000'
        }),
        drawer = new Drawer({
            color: "#3E2723",
            interval,
            width,
            height,
            ctx,
            a: 10,
            tBegin: -4,
            tStop: 3
        });

    field.drawGrid();
    coord.drawCoord();
    drawer.drawFunction();
});

// NOTE: t from 0 to 2pi, step = 2pi/360
// TODO: add webPack
// TODO: add module
// TODO: add custom width, height,
