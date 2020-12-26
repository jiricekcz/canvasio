import { Point } from "./Point.js";
import { Base } from "./Base.js";
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
}