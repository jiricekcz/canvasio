import { Base } from './Base.js';
import { Line } from './Line.js';
export class Segment extends Base {
    /**
     * 
     * @param {Point} point1 
     * @param {Point} point2 
     */
    constructor(point1, point2) {
        if (!point1 instanceof Point) throw new TypeError("The point1 argument must be a type of Point.");
        if (!point2 instanceof Point) throw new TypeError("The point2 argument must be a type of Point.");
        super();
        /**
         * @description The first point of the segment
         * @type {Point}
         */
        this.a = [point1, point2].find(p => p.x === Math.min(point1.x, point2.x));
        /**
         * @description The second point of the segment
         * @type {Point}
         */
        this.b = [point1, point2].find(p => p.x === Math.max(point1.x, point2.x));
    }
    /**
     * @description Returns the y value for a point with given x that lays on this segment
     * @param {Number} x The x coordinate
     * @returns {Number | null} y
     */
    y(x) {
        if (x < this.a.x || x > this.b.x) return null;
        var b = (this.b.y * this.a.x - this.a.y * this.b.x) / (this.a.x - this.b.x);
        var a = (this.a.y - b) / this.a.x;
        return round(a * x + b, "coordinate");
    }
    /**
     * @description Returns the x value for a point with given y that lays on this segment
     * @param {Number} y The y coordinate
     * @returns {Number | null} x
     */
    x(y) {
        if (this.a.y < this.b.y) if (y < this.a.y || y > this.b.y) return null; else; if (y > this.a.y || y < this.b.y) return null;  
        var b = (this.b.y * this.a.x - this.a.y * this.b.x) / (this.a.x - this.b.x);
        var a = (this.a.y - b) / this.a.x;
        return round((y - b) / a, "coordinate");
    }
    /**
     * @description Returns the string representation of this point in the form Segment: ([x1, y1], [x2, y2])
     * @returns {String}
     */
    toString() {
        return `Segment: (${this.a}, ${this.b})`;
    }
    /**
     * @description Returns this segment extended to a line
     * @returns {Line}
     */
    getLine() {
        return new Line(this.a, this.b);
    }
}

