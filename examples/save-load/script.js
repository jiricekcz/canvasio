// Imports thew Canvas and Point class from cavasio library
import { Canvas, Point } from '../../src/index.js';
// Creates new canvas with a fullscreen preset
var c = new Canvas({
    preset: "fullscreen"
});
// Draws a grid
c.drawGrid();
// Waits 2 seconds
setTimeout(() => {
    // Clears the canvas
    c.clear();
    // Moves the zero point by 110 on the X axis and by 160 on the Y axis
    c.translate(110, 160);
    // Draws a grid
    c.drawGrid();
    // Waits 2 seconds
    setTimeout(() => {
        // Clears the canvas
        c.clear();
        // Scales the canvas by 1.5 on the X axis and by 1.75 on the Y axis
        c.scale(1.5, 1.75);
        // Draws a grid
        c.drawGrid();
        // Waits 2 seconds
        setTimeout(() => {
            // Clears the canvas
            c.clear();
            // Rotates the canvas by 45 degrees (Math.PI/4 rad)
            c.rotate(Math.PI / 4);
            // Draws a grid
            c.drawGrid();
            // Waits 2 seconds
            setTimeout(() => {
                // Clears the canvas
                c.clear();
                // Resets the transform
                c.transform();
                // Moves the zero point by [220, 220], scales both axis by 2 and rotates the canvas by Math.PI/4
                c.transform({
                    x: 220,
                    y: 220,
                    xScale: 2,
                    yScale: 2,
                    rotation: Math.PI / 4
                });
                // Draws a grid
                c.drawGrid();
            }, 2000)
        }, 2000)
    }, 2000);
}, 2000);