import { Point } from "./Point.js";
import { Base } from "./Base.js";
import { Polynom } from "./Polynom.js";
import { round } from "../util";

/**
 * @description Class representing a line
 */
export class Line extends Base {
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
         * @description The first point of the line
         * @type {Point}
         */
        this.a = [point1, point2].find(p => p.x === Math.min(point1.x, point2.x));
        /**
         * @description The second point of the line
         * @type {Point}
         */
        this.b = [point1, point2].find(p => p.x === Math.max(point1.x, point2.x));
    }
    /**
     * @description Returns the y value for a point with given x that lays on this line
     * @param {Number} x The x coordinate
     * @returns {Number} y
     */
    y(x) {
        var b = (this.b.y * this.a.x - this.a.y * this.b.x) / (this.a.x - this.b.x);
        var a = (this.a.y - b) / this.a.x;
        return round(a * x + b, "coordinate");
    }
    /**
     * @description Returns the x value for a point with given y that lays on this line
     * @param {Number} y The y coordinate
     * @returns {Number} x
     */
    x(y) {
        var b = (this.b.y * this.a.x - this.a.y * this.b.x) / (this.a.x - this.b.x);
        var a = (this.a.y - b) / this.a.x;
        return round((y - b) / a, "coordinate");
    }
    /**
     * @description Returns a polynom of this line
     * @returns {Polynom} 
     */
    getLinePolynom() {
        var b = (this.b.y * this.a.x - this.a.y * this.b.x) / (this.a.x - this.b.x);
        var a = (this.a.y - b) / this.a.x;
        return new Polynom(a, b);
    }
}