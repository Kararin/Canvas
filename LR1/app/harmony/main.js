import Drawer from './modules/Drawer';
import Field from './modules/Field';
import Axis from './modules/Axis';

document.addEventListener("DOMContentLoaded", () => {
  let mainEl = document.getElementById('background'),
    ctx = mainEl.getContext('2d'),
    funcEl = document.getElementById('func'),
    funcCtx = funcEl.getContext('2d'),
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
    axis = new Axis({
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
      ctx: funcCtx,
      a: 5,
      tBegin: -5,
      filled: false
    });

  field.drawGrid();
  axis.drawCoord();
  drawer.drawFunction(false);

  addListeners({
    mainEl,
    funcEl,
    field,
    axis,
    drawer
  });
});

const addListeners = ({
  mainEl,
  field,
  axis,
  drawer
}) => {
  var bcolor = document.getElementById('backgroundColor'),
    gridColor = document.getElementById('gridColor'),
    axisColor = document.getElementById('axisColor'),
    labelsColor = document.getElementById('axisTitleColor'),
    chartColor = document.getElementById('chartColor'),
    chartTBalue = document.getElementById('chartValue'),
    chartAValue = document.getElementById('chartAValue'),
    isChartFilled = document.getElementById('isChartFilled'),
    map = new Map();

  map.set(bcolor, color => changeBgColor(mainEl, color))
     .set(gridColor, color => field.gridColor = color)
     .set(axisColor, color => axis.axisColor = color)
     .set(chartColor, color => drawer.chartColor = color)
     .set(chartAValue, value => drawer.Avalue = +value)
     .set(chartTBalue, value => drawer.beginValue = +value)
     .set(labelsColor, color => axis.labelsColor = color);

  map.forEach((value, key) => {
    key.addEventListener('change', (e) => {
      e.preventDefault();
      value(e.target.value);
    });
  });

  isChartFilled.addEventListener('change', e => {
    e.preventDefault();
    drawer.clear();
    drawer.isFilled = e.target.checked;
  });
};

const changeBgColor = (el, color) => {
  el.style.backgroundColor = color;
};
