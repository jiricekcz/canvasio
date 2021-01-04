import * as canvasio from "./index.js"
/**
 * The Geomtery namespace contains all the classes you can use to draw geometrical shapes onto a canvas using the canvasio library.
 */
declare namespace Geometry {
    /**
     * GeometryObject is an universal type for all object extending the Geometry.Base class. They can all be drawn onto a canvas.
     */
    declare type GeometryObject = Point | Line | Ray | Segment | Circle | Polygon | Triangle;
    /**
     * The base class for all Geometry objects. 
     */
    declare abstract class Base {
        /**
         * Base constructor
         */
        constructor();
        /**
         * This function calculates intersect with another Geometry object. For the Base class it does nothing, extending class overwrite this method.
         * @param object The object to calculate the intersect with.
         * @example
         * const point1 = new Geometry.Point(0,0);
         * const point2 = new Geometry.Point(100,100);
         * const line = new Geometry.Line(point1, point2);
         * 
         * console.log(line.getIntersect(point1)); // Expected output is point1
         * console.log(line.getIntersect(new Geometry.Point(50,100))); // Expected output is null
         */
        getIntersect(object: GeometryObject): GeometryObject | Array<GeometryObject> | null;
        /**
         * This function calculates whether or not this Geometry object intersects with another Geometry object. For the Base class it does nothing, extending class overwrite this method.
         * @param object The object to determine the intersection with
         * @example
         * const line = new Geometry.Line(
         *      new Geometry.Point(0,0),
         *      new Geometry.Point(100,100)
         * );
         * const segment = new Geometry.Segment(
         *      new Geometry.Point(100,0),
         *      new Geometry.Point(0,100)
         * );
         * 
         * console.log(segment.intersect(line)); // Expected output is true
         */
        intersects(object: GeometryObject): boolean;
    }
    /**
     * The Geometry.Polygon class represents any polygon. This class can be extended to a more exact shape.
     */
    declare class Polygon extends Base {
        /**
         * Polygon constructor
         * @param points The points used to construct the polygon
         * @example
         * const polygon = new Geometry.Polygon([
         *      new Geometry.Point(-100, 0),
         *      new Geometry.Point(0,-100),
         *      new Geometry.Point(100, 0),
         *      new Geometry.Point(100,100),
         *      new Geometry.Point(0, 200),
         *      new Geometry.Point(-100, 100)
         * ]); // Creates a six-sided polygon
         */
        constructor(points: Array<Point>);
        /**
         * Verices of the polygon.
         */
        vertices: Array<Point>;
        /**
         * Edges of the polygon.
         */
        edges: Array<Segment>;
        /**
         * Function that converts the polygon to a readable string.
         * @example 
         * const polygon = new Geometry.Polygon([
         *      new Geometry.Point(-100, 0),
         *      new Geometry.Point(0,-100),
         *      new Geometry.Point(100, 0),
         * ]);
         * 
         * console.log(polygon.toString()); // Expected output is Polygon: ([-100, 0], [0, -100], [100, 0])
         */
        toString(): string;

        /**
         * This function determines whether or not this polygon intersects a point.
         * @param point The point
         * @example
         * const polygon = new Geometry.Polygon([
         *      new Geometry.Point(-100, 0),
         *      new Geometry.Point(0,-100),
         *      new Geometry.Point(100, 0),
         * ]);
         * 
         * console.log(polygon.intersects(new Geometry.Point(0, 0))); // Expected output is true
         * console.log(polygon.intersects(new Geometry.Point(0, -50))); // Expected output is false
         */
        intersects(point: Point): boolean;
        /**
         * This function determines whether or not this polygon intersects a ray.
         * @param ray The ray
         * @example
         * const polygon = new Geometry.Polygon([
         *      new Geometry.Point(-100, 0),
         *      new Geometry.Point(0,-100),
         *      new Geometry.Point(100, 0),
         * ]);
         * 
         * console.log(polygon.intersects(new Geometry.Ray(
         *      new Geometry.Point(100,100),
         *      new Geometry.Point(-100,-100)
         * ))); // Expected output is true
         * console.log(polygon.intersects(new Geometry.Ray(
         *      new Geometry.Point(200, 200),
         *      new Geometry.Point(300, 300)
         * ))); // Expected output is false
         */
        intersects(ray: Ray): boolean;
        /**
         * This function determines whether or not this polygon intersects a segment.
         * @param segment The segment
         * @example
         * const polygon = new Geometry.Polygon([
         *      new Geometry.Point(-100, 0),
         *      new Geometry.Point(0,-100),
         *      new Geometry.Point(100, 0),
         * ]);
         * 
         * console.log(polygon.intersects(new Geometry.Segment(
         *      new Geometry.Point(100,100),
         *      new Geometry.Point(-100,-100)
         * ))); // Expected output is true
         * console.log(polygon.intersects(new Geometry.Segment(
         *      new Geometry.Point(200, 200),
         *      new Geometry.Point(300, 300)
         * ))); // Expected output is false
         */
        intersects(segment: Segment): boolean;
        /**
         * This function determines whether or not this polygon intersects a line.
         * @param line The line
         * @example
         * const polygon = new Geometry.Polygon([
         *      new Geometry.Point(-100, 0),
         *      new Geometry.Point(0,-100),
         *      new Geometry.Point(100, 0),
         * ]);
         * 
         * console.log(polygon.intersects(new Geometry.Line(
         *      new Geometry.Point(100,100),
         *      new Geometry.Point(-100,-100)
         * ))); // Expected output is true
         * console.log(polygon.intersects(new Geometry.Line(
         *      new Geometry.Point(200, 200),
         *      new Geometry.Point(300, 200)
         * ))); // Expected output is false
         */
        intersects(line: Line): boolean;
        /**
         * This function determines whether or not this polygon intersects a circle.
         * @param circle The circle
         * @example
         * const polygon = new Geometry.Polygon([
         *      new Geometry.Point(-100, 0),
         *      new Geometry.Point(0,-100),
         *      new Geometry.Point(100, 0),
         * ]);
         * 
         * console.log(polygon.intersects(new Geometry.Circle(
         *      new Geometry.Point(100,100),
         *      150
         * ))); // Expected output is true
         * console.log(polygon.intersects(new Geometry.Circle(
         *      new Geometry.Point(200, 200),
         *      10
         * ))); // Expected output is false
         */
        intersects(circle: Circle): boolean;
        /**
         * This function determines whether or not this polygon intersects a polygon.
         * @param polygon The polygon
         * @example
         * const polygon = new Geometry.Polygon([
         *      new Geometry.Point(-100, 0),
         *      new Geometry.Point(0,-100),
         *      new Geometry.Point(100, 0),
         * ]);
         * 
         * console.log(polygon.intersects(new Geometry.Polygon([
         *      new Geometry.Point(0,100),
         *      new Geometry.Point(0,-100),
         *      new Geometry.Point(100, -100),
         *      new Geometry.Point(100, 100)
         * )])); // Expected output is true
         * console.log(polygon.intersects(new Geometry.Polygon([
         *      new Geometry.Point(200, 200),
         *      new Geometry.Point(300, 200)
         *      new Geometry.Point(300, 300)
         * )])); // Expected output is false
         */
        intersects(polygon: Polygon): boolean;
        /**
         * This function determines whether or not this polygon intersects a triangle.
         * @param triangle The triangle
         * @example
         * const polygon = new Geometry.Polygon([
         *      new Geometry.Point(-100, 0),
         *      new Geometry.Point(0,-100),
         *      new Geometry.Point(100, 0),
         * ]);
         * 
         * console.log(polygon.intersects(new Geometry.Triangle(
         *      new Geometry.Point(0,100),
         *      new Geometry.Point(0,-100),
         *      new Geometry.Point(100, -100),
         *      new Geometry.Point(100, 100)
         * ))); // Expected output is true
         * console.log(polygon.intersects(new Geometry.Triangle(
         *      new Geometry.Point(200, 200),
         *      new Geometry.Point(300, 200)
         *      new Geometry.Point(300, 300)
         * ))); // Expected output is false
         */
        intersects(triangle: Triangle): boolean;
        getIntersect(point: Point): Point | null;
        getIntersect(ray: Ray): Array<Segment | Point> | Segment | Point | null;
        getIntersect(segment: Segment): Array<Segment | Point> | Segment | Point | null;
        getIntersect(line: Line): Array<Segment | Point> | Segment | Point | null;
        getIntersect(circle: Circle): Array<Point> | Point | null;
        getIntersect(polygon: Polygon): Polygon | Array<Segment | Point> | Segment | Point | null;
        getIntersect(triangle: Triangle): Polygon | Triangle | Array<Segment | Point> | Segment | Point | null;
    }

    declare class Line extends Base {
        constructor(point1: Point, point2: Point);
        a: Point;
        b: Point;
        y(x: number): number;
        x(y: number): number;
        getLinePolynom(): Polynom;
        toString(): string;
        getPerpendicular(point: Point): Line;
        getParallel(point: Point): Line;
        distance(point: Point): number;

        intersects(object: Point): boolean;
        intersects(object: Ray): boolean;
        intersects(object: Segment): boolean;
        intersects(object: Line): boolean;
        intersects(object: Circle): boolean;
        intersects(object: Polygon): boolean;
        intersects(object: Triangle): boolean;
        getIntersect(object: Point): Point | null;
        getIntersect(object: Ray): Ray | Point | null;
        getIntersect(object: Segment): Segment | Point | null;
        getIntersect(object: Line): Line | Point | null;
        getIntersect(object: Circle): [Point, Point] | Point | null;
        getIntersect(object: Polygon): Array<Segment | Point> | Segment | Point | null;
        getIntersect(object: Triangle): [Point, Point] | Segment | Point | null;
    }

    declare class Point extends Base {
        constructor(x: number, y: number);
        x: number;
        y: number;
        absolute(): number;
        toString(): string;
        toArray(): PointArrayForm;
        distance(point: Point): number;
        distance(line: Line): number;
        reflectAbout(point: Point): Point;
        reflectAbout(line: Line): Point;
        static fromString(string: string): Point;

        intersects(object: Point): boolean;
        intersects(object: Ray): boolean;
        intersects(object: Segment): boolean;
        intersects(object: Line): boolean;
        intersects(object: Circle): boolean;
        intersects(object: Polygon): boolean;
        intersects(object: Triangle): boolean;
        getIntersect(object: Point): Point | null;
        getIntersect(object: Ray): Point | null;
        getIntersect(object: Segment): Point | null;
        getIntersect(object: Line): Point | null;
        getIntersect(object: Circle): Point | null;
        getIntersect(object: Polygon): Point | null;
        getIntersect(object: Triangle): Point | null;
    }

    declare class Polynom {
        constructor(...coefficients: number);
        degree: number;
        coefficients: Array<number>;
        valueAt(x: number): number;
        getAbsoluleCoefficient(): number;
        getLinearCoefficient(): number;
        getQuadraticCoefficient(): number;
        getQuadraticCoefficient(): number;
    }

    declare class Ray extends Base {
        constructor(endPoint: Point, point2: Point);
        a: Point;
        b: Point;
        y(x: number): number;
        x(y: number): number;
        getLine(): Line;
        toString(): string;

        intersects(object: Point): boolean;
        intersects(object: Ray): boolean;
        intersects(object: Segment): boolean;
        intersects(object: Line): boolean;
        intersects(object: Circle): boolean;
        intersects(object: Polygon): boolean;
        intersects(object: Triangle): boolean;
        getIntersect(object: Point): Point | null;
        getIntersect(object: Ray): Ray | Segment | Point | null;
        getIntersect(object: Segment): Segment | Point | null;
        getIntersect(object: Line): Ray | Point | null;
        getIntersect(object: Circle): [Point, Point] | Point | null;
        getIntersect(object: Polygon): Array<Segment | Point> | Segment | Point | null;
        getIntersect(object: Triangle): [Point, Point] | Segment | Point | null;
    }

    declare class Segment extends Base {
        constructor(point1: Point, point2: Point);
        a: Point;
        b: Point;
        y(x: number): number;
        x(y: number): number;
        toStings(): string;
        getLine(): Line;
        length(): number;
        join(segment: Segment): Segment;

        intersects(object: Point): boolean;
        intersects(object: Ray): boolean;
        intersects(object: Segment): boolean;
        intersects(object: Line): boolean;
        intersects(object: Circle): boolean;
        intersects(object: Polygon): boolean;
        intersects(object: Triangle): boolean;
        getIntersect(object: Point): Point | null;
        getIntersect(object: Ray): Segment | Point | nulll;
        getIntersect(object: Segment): Segment | Point | null;
        getIntersect(object: Line): Segment | Point | null;
        getIntersect(object: Circle): [Point, Point] | Point | null;
        getIntersect(object: Polygon): Array<Segment | Point> | Segment | Point | null;
        getIntersect(object: Triangle): [Point,  Point] | Segment | Point | null;
    }

    declare class Circle extends Base {
        constructor(center: Point, radius: number);
        r: number;
        center: Point;
        length(): number;
        toStings(): string;

        intersects(object: Point): boolean;
        intersects(object: Ray): boolean;
        intersects(object: Segment): boolean;
        intersects(object: Line): boolean;
        intersects(object: Circle): boolean;
        intersects(object: Polygon): boolean;
        intersects(object: Triangle): boolean;
        getIntersect(object: Point): Point | null;
        getIntersect(object: Ray): [Point, Point] | Point | null;
        getIntersect(object: Segment): [Point, Point] | Point | null;
        getIntersect(object: Line): [Point, Point] | Point | nulll;
        getIntersect(object: Circle): Circle | [Point, Point] | Point | null;
        getIntersect(object: Polygon): [Point, Point] | Point | null
        getIntersect(object: Triangle): [Point, Point] | Point | null;
    }

    declare class Triangle extends Base {
        constructor(a: Point, b: Point, c: Point);
        A: Point;
        B: Point;
        C: Point;
        a: Segment;
        b: Segment;
        c: Segment;
        getAlpha(): number;
        getBeta(): number;
        getGamma(): number;
        toString(): string;

        intersects(object: Point): boolean;
        intersects(object: Ray): boolean;
        intersects(object: Segment): boolean;
        intersects(object: Line): boolean;
        intersects(object: Circle): boolean;
        intersects(object: Polygon): boolean;
        intersects(object: Triangle): boolean;
        getIntersect(object: Point): Point | null;
        getIntersect(object: Ray): [Point, Point] | Segment | Point | null;
        getIntersect(object: Segment): [Point, Point] | Segment | Point | null;
        getIntersect(object: Line): [Point, Point] | Segment | Point | null;
        getIntersect(object: Circle): Array<Point> | Point | null;
        getIntersect(object: Polygon): Polygon | Triangle | Array<Segment | Point> | Segment | Point | null;
        getIntersect(object: Triangle): Triangle | Array<Segment | Point> | Segment | Point | null;
    }
    /**
     * The Geometry.Drawer object manages the interaction between the Geometry library and the canvasio library. It is used to draw geometry objects onto the canvas. This class is in usual cases only used internaly
     */
    declare class Drawer {
        /**
         * Drawer constructor
         * @param canvas The canvas this Drawer draws on
         */
        constructor(canvas: canvasio.Canvas);
        canvas: canvasio.Canvas;
        draw(segment: Segment): void;
        draw(line: Line): void;
        draw(ray: Ray): void;
        draw(polygon: Polygon): void;
        draw(circle: Circle): void;
        draw(point: Point): void;
        draw(triangle: Triangle): void;
        protected #drawPoint(point: Point): void;
        protected #drawLine(line: Line): void;
        protected #drawRay(ray: Ray): void;
        protected #drawSegment(segment: Segment): void;
        protected #drawCircle(circle: Circle): void;
        protected #drawPolygon(polygon: Polygon): void;
    }
}
/**
 * A specific array of numbers, that has exactly two elements. This array represents a point. PointArrayForm[0] is the x coordinate of the point and PointArrayForm[1] is the y coordinate of the point.
 */
declare interface PointArrayForm extends Array<Number> {
    /**
     * The x coordinate of the point this array represents
     */
    0: number;
    /**
     * The y coordinate of the point this array represents
     */
    1: number;
    /**
     * Length of this array will be by definition 2.
     */
    length: 2;
}
export = Geometry;