import { Grid } from './grid';
import { Conway } from './conway';
import { GridEditor } from './grid-editor';

const grid = new Grid(30, 30);
const gridEditor = new GridEditor(grid);

grid.render(document.querySelector('#root'));
gridEditor.render();

grid.set(3, 2);

// setTimeout(() => {
//     grid.reset();
// }, 1000);

const conway = new Conway(grid);

conway.setDBar(20);

// conway.set([[10, 14], [10, 15], [10, 16], [10, 17], [10, 18], [10, 19], [10, 20]]);


