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
        /**
         * 
         * @param {Point} point 
         * @param {Circle} circle 
         * @returns {Point | null}
         */
        Circle: (point, circle) => point.distance(circle.center) == round(circle.radius, "coordinate") ? point : null,
    },
    Line: {
        /**
         * 
         * @param {Line} line 
         * @param {Line} line2 
         * @returns {Line | Point | null}
         */
        Line: (line, line2) => {
            if (line.a.x == line.b.x) {
                if (line2.a.x == line2.b.x) {
                    return line.a.intersects(line2) ? line : null;
                } else {
                    return new Point(line.a.x, line2.y(line.a.x));
                }
            }
            if (line2.a.x == line2.b.x) return new Point(line2.a.x, line.y(line2.a.x));
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
    },
    Circle: {
        /**
         * 
         * @param {Circle} circle 
         * @param {Circle} circle2 
         * @returns {Circle | [Point, Point] | Point | null}
         */
        Circle: (circle, circle2) => {
            if (circle.center.distance(circle2.center) === 0) return round(circle.r) === round(circle2.r) ? circle : null;
            if (circle.center.distance(circle2.center) > round(circle.r + circle2.r)) return null;
            var l = new Segment(circle.center, circle2.center)
            var rRatio = circle.r / (circle.r + circle2.r);
            let dx = circle.center.x - circle2.center.x;
            if (circle.center.distance(circle2.center) === round(circle.r + circle2.r)) {
                if (l.a.x == l.b.x) {
                    var ya = Math.max(l.a.y, l.b.y) - [circle, circle2].find(c => c.center.y == Math.max(l.a.y, l.b.y)).r;
                    return new Point(l.a.x, ya);
                }
                let pdx = dx * rRatio;
                let x = circle.center.x + pdx;
                let y = l.y(x);
                return new Point(x, y);
            }
            if (circle.center.x === circle2.center.x) {
                var angle1cos = (l.length() ** 2 + circle.r ** 2 - circle2.r ** 2) / (2 * l.length() + circle2.r);
                var k = angle1cos * circle.r;
                var kRatio = k / l.length();
                var pdx = dx * kRatio;
                var x = circle.center.x + pdx;
                var y = circle.center.x;
                var p = new Point(x, y);
                var c = Math.sin(Math.acos(angle1cos)) * circle.r;
                return [new Point(y, x - c), new Point(y, x + c)];
            }
            var angle1cos = (l.length() ** 2 + circle.r ** 2 - circle2.r ** 2) / (2 * l.length() * circle2.r);
            var k = angle1cos * circle.r;
            var kRatio = k / l.length();
            var pdx = dx * kRatio;
            var x = circle.center.x - pdx;
            var y = l.getLine().y(x);
            var c = Math.sin(Math.acos(angle1cos)) * circle.r;
            var p = new Point(x, y);
            var p2 = new Point(p.x, circle.center.y);
            if (p.distance(p2) === 0) return [new Point(p.x, p.y + c), new Point(p.x, p.y - c)];
            var t = new Triangle(circle.center, p2, p);
            var angle2 = t.getGamma();
            var angle3 = Math.PI / 2 - angle2;
            var dy = -Math.cos(angle3) * c;
            dx = Math.sin(angle3) * c;
            return [new Point(p.x + dx, p.y + dy), new Point(p.x - dx, p.y - dy)];
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
            return getIntersect(this, object);
        } catch (err) {
            console.log(err);
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
        if (point1.distance(point2) === 0) throw new Error("Need two different points to construct a line.");
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
        this.b = [point1, point2].find(p => p.distance(this.a) > 0);
    }
    /**
     * @description Returns the y value for a point with given x that lays on this line
     * @param {Number} x The x coordinate
     * @returns {Number} y
     */
    y(x) {
        var b = (this.b.y * this.a.x - this.a.y * this.b.x) / (this.a.x - this.b.x);
        var a = (this.b.y - this.a.y) / (this.b.x - this.a.x);
        return round(a * x + b, "coordinate");
    }
    /**
     * @description Returns the x value for a point with given y that lays on this line
     * @param {Number} y The y coordinate
     * @returns {Number} x
     */
    x(y) {
        var b = (this.b.y * this.a.x - this.a.y * this.b.x) / (this.a.x - this.b.x);
        var a = (this.b.y - this.a.y) / (this.b.x - this.a.x);
        return round((y - b) / a, "coordinate");
    }
    /**
     * @description Returns a polynom of this line
     * @returns {Polynom} 
     */
    getLinePolynom() {
        var b = (this.b.y * this.a.x - this.a.y * this.b.x) / (this.a.x - this.b.x);
        var a = (this.b.y - this.a.y) / (this.b.x - this.a.x);
        return new Polynom(a, b);
    }
    /**
     * @description Returns the string representation of this point in the form Line: ([x1, y1], [x2, y2])
     * @returns {String}
     */
    toString() {
        return `Line: (${this.a}, ${this.b})`;
    }
    /**
     * @description Returns a perpendicular line going thru the point
     * @param {Point} point The point
     * @returns {Line}
     */
    getPerpendicular(point) {
        if (!point.intersects(this)) {
            var pline = this.getPrallel(point);
            return pline.getPerpendicular(point);
        }
        var a = new Point(point.x - 1, this.y(point));
        var b = new Point(point.x + 1, this.y(point));
        var dx = (b.x - a.x);
        var dy = (b.y - a.y);
        var x = a.x + dx - dy;
        var y = a.y + dx + dy;
        return new Line(point, new Point(x, y));
    }
    /**
     * @description Returns a parallel line going thru the point
     * @param {Point} point The point
     * @returns {Line}
     */
    getPrallel(point) {
        if (this.intersects(point)) return this;
        var l = new Line(point, new Point(point.x, point.y - 1));
        var p = l.getIntersect(this);
        if (p === null) return l;
        var p2 = new Point(p.x - 1, this.y(p.x - 1));
        return new Line(point, new Point(p2.x, p2.y + point.y - p.y));
    }
    /**
     * @description Returns the distance between this line and the given point
     * @param {Point} point
     * @returns {Number}
     */
    distance(point) {
        return point.distance(this);
    }
}



//! Point 
/**
 * @description Class representing a point
 */
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
     * @description Returns the distance between this and the object provided
     * @param {Point | Line} object The object provided
     * @returns {Number} The distance
     */
    distance(object) {
        if (object instanceof Point) return round(Math.pow(Math.pow(this.x - object.x, 2) + Math.pow(this.y - object.y, 2), 1 / 2), "coordinate");
        if (object instanceof Line) {
            var l = object.getPerpendicular(this);
            var p = l.getIntersect(object);
            return this.distance(p);
        }
        throw new TypeError("The point argument must be a Point.");
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
/**
 * @description Class representing a polynom
 */
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
/**
 * @description Class representing a ray
 */
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
        var a = (this.b.y - this.a.y) / (this.b.x - this.a.x);
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
        var a = (this.b.y - this.a.y) / (this.b.x - this.a.x);
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
/**
 * @description Class representing a segment
 */
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
        var a = (this.b.y - this.a.y) / (this.b.x - this.a.x);
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
        var a = (this.b.y - this.a.y) / (this.b.x - this.a.x);
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



//! Circle
/**
 * @description Class representing a circle
 */
export class Circle extends Base {
    /**
     * @param {Point} center Center of the circle
     * @param {Number} radius Radius of the circle
     */
    constructor(center, radius) {
        if (typeof radius !== 'number') throw new TypeError("Radius must be a number.");
        if (!center instanceof Point) throw new TypeError("Center must be a Point.");
        super();
        /**
         * @description Radius of the circle
         * @type {Number} 
         */
        this.r = radius;
        /**
         * @description Center of the circle
         * @type {Point}
         */
        this.center = center;
    }
    /**
     * @description Returns the circumference of the circe 
     * @returns {Number}
     */
    length() {
        return Math.PI * 2 * this.r;
    }
    /**
     * @description Returns the string representation of this circle
     * @returns {String}
     */
    toString() {
        return `Circle(${this.r}, ${this.center})`;
    }
}



//! Triangle
export class Triangle extends Base {
    constructor(a, b, c) {
        if (!a instanceof Point) throw new TypeError("The a argument must be a type of Point.");
        if (!b instanceof Point) throw new TypeError("The b argument must be a type of Point.");
        if (!c instanceof Point) throw new TypeError("The c argument must be a type of Point.");
        if (new Line(a, b).intersects(c)) throw new Error("Can not construct a triangle from three points that lay on the same line.");
        if (a.distance(b) === 0 || a.distance(c) === 0 || c.distance(b) === 0) throw new Error("Points on a triangle can not match.");
        super();
        /**
         * @description One vertex of the triangle
         * @type {Point}
         */
        this.A = a;
        /**
         * @description One vertex of the triangle
         * @type {Point}
         */
        this.B = b;
        /**
         * @description One vertex of the triangle
         * @type {Point}
         */
        this.C = c;
        /**
         * @description One edge of the triangle
         * @type {Segment}
         */
        this.c = new Segment(this.A, this.B);
        /**
         * @description One edge of the triangle
         * @type {Segment}
         */
        this.b = new Segment(this.A, this.C);
        /**
         * @description One edge of the triangle
         * @type {Segment}
         */
        this.a = new Segment(this.B, this.C);
        /**
         * @description Vertices of the triangle
         * @type {Array<Point>}
         */
        this.vertices = [this.A, this.B, this.C];
        /**
         * @description Edges of the triangle
         * @type {Array<Segment>}
         */
        this.edges = [this.a, this.b, this.c];
    }
    /**
     * @description Returns the string representation of this object
     * @returns {String}
     */
    toString() {
        return `Triangle: (${this.A}, ${this.B}, ${this.C})`;
    }
    /**
     * @description Returns the value of the angle α
     * @returns {Number}
     */
    getAlpha() {
        var a = this.a.length();
        var b = this.b.length();
        var c = this.c.length();
        return Math.acos((b * b + c * c - a * a) / (2 * b * c));
    }
    /**
     * @description Returns the value of the angle β
     * @returns {Number}
     */
    getBeta() {
        var a = this.a.length();
        var b = this.b.length();
        var c = this.c.length();
        return Math.acos((a * a + c * c - b * b) / (2 * a * c));
    }
    /**
     * @description Returns the value of the angle γ
     * @returns {Number}
     */
    getGamma() {
        var a = this.a.length();
        var b = this.b.length();
        var c = this.c.length();
        console.log(this);
        return Math.acos((a * a + b * b - c * c) / (2 * a * b));
    }
}