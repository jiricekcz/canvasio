import { Base } from "./Base.js";
import { round } from "../util.js";

export class Point extends Base {
    /**
     * 
     * @param {Number} x The x coordinate of the point
     * @param {Number} y The y coordinate of the point
     */
    constructor(x, y) {
        if (typeof x !== 'number') throw new TypeError("The x coordinate of a point must be a number.");
        if (typeof y !== 'number') throw new TypeError("The y coordinate of a point must be a number.");
        super();
        /**
         * @type {Number}
         * @description The x coordinate of the point.
         */
        this.x = round(x, "coordinate");
        /**
         * @type {Number}
         * @description The y coordinate of the point.
         */
        this.y = round(y, "coordinate");
    }
    /**
     * @description Returns the absolute value of point (aka. distance from [0, 0])
     * @returns {Number}
     */
    absolute() {
        return Math.pow(this.x * this.x + this.y * this.y, 1 / 2);
    }
    /**
     * @description Returns the string representation of this point in the form [x, y]
     * @returns {String}
     */
    toString() {
        return `[${this.x}, ${this.y}]`;
    }
    /**
     * @description Returns the array representation of the point 
     * @returns {Array<Number>}
     */
    toArray() {
        return [this.x, this.y];
    }
    /**
     * @description Returns the distance between this and the point provided
     * @param {Point} point The point provided
     * @returns {Number} The distance
     */
    distance(point) {
        if (!point instanceof Point) throw new TypeError("The point argument must be a Point.");
        return round(Math.pow(Math.pow(this.x - point.x, 2) + Math.pow(this.y - point.y, 2), 1 / 2), "coordinate");
    }
    /**
     * @description Creates a point object form the string representation of it tin the form [x, y];
     * @param {String} string 
     * @returns {Point}
     */
    static fromString(string) {
        var a = string.split("[").pop().split("]")[0].split(", ");
        return new Point(a[0], a[1]);
    }
}