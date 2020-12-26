//! Constants
/**
 * @description Amount of decimal places round coordinates to
 */
export const decimalRoundCoordinate = 6;
/**
 * @description Amount of decimal places round angles in radians to
 */
export const decimalRoundAngle = 15;



//! Util
/**
 * @description Rounds number with given constants 
 * @param {Number} x The number to round
 * @param {"coordinate" | "angle"}
 * @returns {Number}
 */
export function round(x, type = "coordinate") {
    switch (type) {
        case "coordinate": return Math.round(x * Math.pow(10, decimalRoundCoordinate)) / Math.pow(10, decimalRoundCoordinate);
        case "angle": return Math.round(x * Math.pow(10, decimalRoundAngle)) / Math.pow(10, decimalRoundAngle);
        default: throw new Error("Unsuported rounding type.")
    }
}



//! Get intersects
/**
 * 
 * @private
 */
export function getIntersect(a, b) {
    try {
        return intersectFunctions[a.constructor.name][b.constructor.name](a, b);
    } catch (e) {
        return intersectFunctions[b.constructor.name][a.constructor.name](b, a);
    }
}
/**
 * @private
 */
const intersectFunctions = {
    Point: {
        /**
         * 
         * @param {Line} line 
         * @param {Point} point
         * @returns {Point | null} 
         */
        Line: (point, line) => line.x(point.y) === point.x ? point : null,
        /**
         * 
         * @param {Point} point 
         * @param {Point} point2 
         * @returns {Point | null}
         */
        Point: (point, point2) => point.x === point2.x && point.y === point2.y ? point : null,
        /**
         * 
         * @param {Point} point 
         * @param {Ray} ray 
         */
        Ray: (point, ray) => ray.x(point.y) === point.x ? point : null,
        /**
         * 
         * @param {Point} point 
         * @param {Segment} segment 
         */
        Segment: (point, segment) => segment.x(point.y) === point.x ? point : null,
    },
    Line: {
        /**
         * 
         * @param {Line} line 
         * @param {Line} line2 
         * @returns {Line | Point | null}
         */
        Line: (line, line2) => {
            var a1 = line.getLinePolynom().getLinearCoefficient();
            var b1 = line.getLinePolynom().getAbsoluleCoefficient();
            var a2 = line2.getLinePolynom().getLinearCoefficient();
            var b2 = line2.getLinePolynom().getAbsoluleCoefficient();
            if (a1 === a2) {
                if (b1 === b2) {
                    return line;
                }
                return null;
            } else {
                var x = (b2 - b1) / (a1 - a2);
                var y = a1 * x + b1;
                return new Point(x, y);
            }
        }
    },
    Segment: {
        /**
         * 
         * @param {Segment} segment 
         * @param {Segment} segment2 
         * @returns {Segment | Point | null}
         */
        Segment: (segment, segment2) => {
            var a1 = segment.getLine().getLinePolynom().getLinearCoefficient();
            var b1 = segment.getLine().getLinePolynom().getAbsoluleCoefficient();
            var a2 = segment2.getLine().getLinePolynom().getLinearCoefficient();
            var b2 = segment2.getLine().getLinePolynom().getAbsoluleCoefficient();
            if (a1 === a2) {
                if (b1 === b2) {
                    //Segment
                }
                return null;
            } else {
                var x = (b2 - b1) / (a1 - a2);
                var y = a1 * x + b1;
                var p = new Point(x, y);
                return p.intersects(segment) && p.intersects(segment2) ? p : null;
            }
        },
        /**
         * 
         * @param {Segment} segment 
         * @param {Line} line 
         * @returns {Segment | Point | null}
         */
        Line: (segment, line) => {
            var l = segment.getLine();
            var i = l.getIntersect(line);
            if (i === null) return null; else {
                return i instanceof Line ? segment : i;
            }
        }
    },
    Ray: {
        /**
         * 
         * @param {Ray} ray 
         * @param {Ray} ray2 
         * @returns {Ray | Segment | Point | null}
         */
        Ray: (ray, ray2) => {
            var [l, l2] = [ray, ray2].map(v => v.getLine());
            var i = l.getIntersect(l2);
            if (i === null) return null; else {
                if (i instanceof Line) {
                    if (ray.a.distance(ray2.a) === 0 && ray.b.distance(ray2.b) === 0) return ray;
                    if (ray.intersects(ray2.a) && ray2.intersects(ray.a)) return new Segment(ray.a, ray2.a);
                    if (ray.intersects(ray2.a)) return ray2; else return ray;
                } else return i;
            }
        },
        /**
         * 
         * @param {Ray} ray 
         * @param {Line} line 
         * @returns {Ray | Point | null}
         */
        Line: (ray, line) => {
            var l = ray.getLine();
            var i = l.getIntersect(line);
            if (i === null) return null; else if (i instanceof Line) return ray; else {
                return ray.intersects(i) ? i : null
            }
        },
        /**
         * 
         * @param {Ray} ray 
         * @param {Segment} segment
         * @returns {Segment | Point | null} 
         */
        Segment: (ray, segment) => {
            var l = segment.getLine();
            var i = l.getIntersect(ray);
            if (i === null) return null; if (i instanceof Point) return i.intersects(segment) ? i : null; else {
                if (segment.a.intersects(ray)) {
                    return segment.b.intersects(ray) ? segment : new Segment(segment.a, ray.a);
                } else {
                    return segment.b.intersects(ray) ? new Segment(segment.b, ray.a) : null;
                }
            }
        }
    }
}



//! Base
/**
 * @description Class representing datatypes of the geometry canvasio library
 * @abstract
 */
export class Base {
    constructor() {

    }
    /**
     * @description The default intersect function. May be overriden by extending classes.
     * @param {Base} object Object to calculate the intersect with
     * @returns {Base | Array<Base> | null} 
     */
    getIntersect(object) {
        try {
            return getIntersect(this, object)
        } catch (err) {
            throw new Error("Intersect for these two objects has not been yet defined. If you belive this is a mistake, please report this on the offical GitHub page.");
        }
    }
    /**
     * @description Checks if the objects intersect. May be overriden by extending classes.
     * @param {Base} object 
     * @returns {Boolean}
     */
    intersects(object) {
        return this.getIntersect(object) !== null;
    }
}



//! Line
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
        var a = (this.b.y - this.a.y)/(this.b.x - this.a.x);
        return round(a * x + b, "coordinate");
    }
    /**
     * @description Returns the x value for a point with given y that lays on this line
     * @param {Number} y The y coordinate
     * @returns {Number} x
     */
    x(y) {
        var b = (this.b.y * this.a.x - this.a.y * this.b.x) / (this.a.x - this.b.x);
        var a = (this.b.y - this.a.y)/(this.b.x - this.a.x);
        return round((y - b) / a, "coordinate");
    }
    /**
     * @description Returns a polynom of this line
     * @returns {Polynom} 
     */
    getLinePolynom() {
        var b = (this.b.y * this.a.x - this.a.y * this.b.x) / (this.a.x - this.b.x);
        var a = (this.b.y - this.a.y)/(this.b.x - this.a.x);
        return new Polynom(a, b);
    }
    /**
     * @description Returns the string representation of this point in the form Line: ([x1, y1], [x2, y2])
     * @returns {String}
     */
    toString() {
        return `Line: (${this.a}, ${this.b})`;
    }
}



//! Point 
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



//! Polynom
export class Polynom {
    /**
     * @param  {...Number} coefficients The coefficents of this polynom in the usual oreder 
     * @example new Polynom(1, 0, 0); //Creates the x^2 polynom
     */
    constructor(...coefficients) {
        for (var coefficient of coefficients) {
            if (typeof coefficient !== 'number') throw new TypeError("All coefficients of a polynom must be numbers.");
        }
        /**
         * @type {Number}
         * @description The degree of the polynom
         */
        this.degree = coefficients.length;
        /**
         * @type {Array<Number>}
         * @description The 
         */
        this.coefficients = coefficients.map((v, i, a) => a[a.length - 1 - i]);
    }
    /**
     * @description Returns the value of the polynom at the given point.
     * @param {Number} x The point at which the value should be returned.
     * @returns {Number} 
     * @example var p = new Polynom(1, 0, 0);
     * p.valueAt(2); // returns 4
     */
    valueAt(x) {
        return this.coefficients.map((v, i) => v * Math.pow(x, i)).reduce((a, b) => a + b);
    }
    /**
     * @description Gets the absolute coefficient of this polynom
     * @returns {Number}
     */
    getAbsoluleCoefficient() {
        return this.coefficients[0];
    }
    /**
     * @description Gets the linear coefficient of this polynom
     * @returns {Number}
     */
    getLinearCoefficient() {
        return this.coefficients[1];
    }
    /**
     * @description Gets the quadratic coefficient of this polynom
     * @returns {Number}
     */
    getQuadraticCoefficient() {
        return this.coefficients[2];
    }
    /**
     * @description Gets the cubic coefficient of this polynom
     * @returns {Number}
     */
    getCubicCoefficient() {
        return this.coefficients[3];
    }
}



//! Ray
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
        var a = (this.b.y - this.a.y)/(this.b.x - this.a.x);
        return round(a * x + b, "coordinate");
    }
    /**
     * @description Returns the x value for a point with given y that lays on this ray
     * @param {Number} y The y coordinate
     * @returns {Number | undefined} x
     */
    x(y) {
        if (this.a.y < this.b.y) if (this.a.y > y) return undefined; else; if (this.a.y < y) return undefined;
        var b = (this.b.y * this.a.x - this.a.y * this.b.x) / (this.a.x - this.b.x);
        var a = (this.b.y - this.a.y)/(this.b.x - this.a.x);
        return round((y - b) / a, "coordinate");
    }
    /**
     * @description Returns this ray extended to a line
     * @returns {Line}
     */
    getLine() {
        return new Line(this.a, this.b);
    }
    /**
     * @description Returns the string representation of this point in the form Ray: ([x1, y1], [x2, y2])
     * @returns {String}
     */
    toString() {
        return `Ray: (${this.a}, ${this.b})`;
    }
}



//! Segment
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
        var a = (this.b.y - this.a.y)/(this.b.x - this.a.x);
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
        var a = (this.b.y - this.a.y)/(this.b.x - this.a.x);
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
    /**
     * @description Returns the length of the segment
     * @returns {Number}
     */
    length() {
        return this.a.distance(this.b);
    }
}
