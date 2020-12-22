// Imports thew Canvas and Point class from cavasio library
import { Canvas, Point } from '../../src/index.js';
// Creates new canvas with a fullscreen preset
var c = new Canvas({
    preset: "fullscreen"
});
// Draws a grid with line spacing 50 px
c.drawGrid(50)