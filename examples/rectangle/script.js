// Imports thew Canvas and Point class from cavasio library
import { Canvas, Point } from '../../src/index.js';
// Creates new canvas with a fullscreen preset
var c = new Canvas({
    preset: "fullscreen"
});
// Draws a rectangle outline from point [100, 100] with width 200 and height 150
c.rect(100, 100, 200, 150);
// Draws a rectangle with infill from point [400, 100] with width 200 and height 150
c.fillRect(400, 100, 200, 150);
// Clears a rectangle from point [200, 150] with width 300 and height 50
c.clearRect(200, 150, 300, 50);
