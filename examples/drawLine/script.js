// Imports thew Canvas and Point class from cavasio library
import { Canvas, Point } from '../../src/index.js';
// Creates new canvas with a fullscreen preset
var c = new Canvas({
    preset: "fullscreen"
});
// Draws a line from [0, 0] to [100, 100]
c.drawLine(0, 0, 100, 100);
// Draws a line from [10, 0] to [110, 100]
c.drawLine({ x: 10, y: 0 }, { x: 110, y: 100 });
// Draws a line from [20, 0] to [120, 100]
c.drawLine(new Point(20, 0), new Point(120, 100));