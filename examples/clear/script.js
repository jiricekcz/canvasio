// Imports thew Canvas and Point class from cavasio library
import { Canvas, Point } from '../../src/index.js';
// Creates new canvas with a fullscreen preset
var c = new Canvas({
    preset: "fullscreen"
});
// Draws a line from [0, 0] to [100, 100]
c.drawLine(0, 0, 100, 100);
// Clears the canvas after 1 second
setTimeout(() => {
    c.clear();
}, 1000);