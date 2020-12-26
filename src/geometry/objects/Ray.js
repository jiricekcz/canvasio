import { Base } from './Base.js'
import { Point } from './Point.js'
import { Line } from './Line.js'


export class Ray extends Base {
    /**
     * 
     * @param {Point} endPoint Point, at witch the ray ends
     * @param {Point} point2 Point describing the rays direction
     */
    constructor(endPoint, point2) {
        if (!endPoint instanceof Point) throw new TypeError("The endPoint argument must be a type of Point.");
        if (!point2 instanceof Point) throw new TypeError("The point2 argument must be a type of Point.");
        super();
        /**
         * @description The first point of the line
         * @type {Point}
         */
        this.a = endPoint;
        /**
         * @description The second point of the line
         * @type {Point}
         */
        this.b = point2;
    }
    /**
     * @description Returns the y value for a point with given x that lays on this ray
     * @param {Number} x The x coordinate
     * @returns {Number | undefined} y
     */
    y(x) {
        if (this.a.x < this.b.x) if (this.a.x > x) return undefined; else; if (this.a.x < x) return undefined;
        var b = (this.b.y * this.a.x - this.a.y * this.b.x) / (this.a.x - this.b.x);
        var a = (this.a.y - b) / this.a.x;
        return a * x + b;
    }
    /**
     * @description Returns the x value for a point with given y that lays on this ray
     * @param {Number} y The y coordinate
     * @returns {Number | undefined} x
     */
    x(y) {
        if (this.a.y < this.b.y) if (this.a.y > y) return undefined; else; if (this.a.y < y) return undefined;
        var b = (this.b.y * this.a.x - this.a.y * this.b.x) / (this.a.x - this.b.x);
        var a = (this.a.y - b) / this.a.x;
        return (y - b) / a;
    }
    /**
     * @description Returns this ray extended to a line
     * @returns {Line}
     */
    getLine() {
        return new Line(this.a, this.b);
    }
}