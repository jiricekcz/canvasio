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
        
        intersects(point: Point): boolean;
        intersects(ray: Ray): boolean;
        intersects(segment: Segment): boolean;
        intersects(line: Line): boolean;
        intersects(circle: Circle): boolean;
        intersects(polygon: Polygon): boolean;
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
        getIntersect(object: Triangle): [Point, Point] | Segment | Point | null;
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
        /**
         * The canvasio canvas element this drawe uses to draw onto the canvas.
         */
        canvas: canvasio.Canvas;
        /**
         * This overload of the function Drawer.draw() draws a segment onto the canvas. This function is not intended for direct use by the user. Make sure you know, what you are doing when using this function.
         * @param segment The segment
         * @example
         * // NOTE: This function is not the preferred way to draw Geometry objects. User canvasio.Canvas.draw() instead.
         * const canvas = new canvasio.Canvas({ preset: "fullscreen"});
         * const segment = new Geometry.Segment(
         *      new Geometry.Point(0, 0),
         *      new Geometry.Point(10, 10)
         * );
         * const drawer = new Geometry.Drawer(canvas);
         * drawer.draw(segment); // Draws the segment onto the canvas. 
         */
        draw(segment: Segment): void;
        /**
         * This overload of the function Drawer.draw() draws a line onto the canvas. This function is not intended for direct use by the user. Make sure you know, what you are doing when using this function.
         * @param line The line
         * @example
         * // NOTE: This function is not the preferred way to draw Geometry objects. User canvasio.Canvas.draw() instead.
         * const canvas = new canvasio.Canvas({ preset: "fullscreen"});
         * const line = new Geometry.Line(
         *      new Geometry.Point(0, 0),
         *      new Geometry.Point(10, 10)
         * );
         * const drawer = new Geometry.Drawer(canvas);
         * drawer.draw(line); // Draws the line onto the canvas. 
         */
        draw(line: Line): void;
        /**
         * This overload of the function Drawer.draw() draws a ray onto the canvas. This function is not intended for direct use by the user. Make sure you know, what you are doing when using this function.
         * @param ray The ray
         * @example
         * // NOTE: This function is not the preferred way to draw Geometry objects. User canvasio.Canvas.draw() instead.
         * const canvas = new canvasio.Canvas({ preset: "fullscreen"});
         * const ray = new Geometry.Ray(
         *      new Geometry.Point(0, 0),
         *      new Geometry.Point(10, 10)
         * );
         * const drawer = new Geometry.Drawer(canvas);
         * drawer.draw(ray); // Draws the ray onto the canvas. 
         */
        draw(ray: Ray): void;
        /**
         * This overload of the function Drawer.draw() draws a polygon onto the canvas. This function is not intended for direct use by the user. Make sure you know, what you are doing when using this function.
         * @param polygon The polygon
         * @example
         * // NOTE: This function is not the preferred way to draw Geometry objects. User canvasio.Canvas.draw() instead.
         * const canvas = new canvasio.Canvas({ preset: "fullscreen"});
         * const polygon = new Geometry.Polygon([
         *      new Geometry.Point(0, 0),
         *      new Geometry.Point(10, 10),
         *      new Geometry.Point(-10,-20),
         * ]);
         * const drawer = new Geometry.Drawer(canvas);
         * drawer.draw(polygon); // Draws the polygon onto the canvas. 
         */
        draw(polygon: Polygon): void;
        /**
         * This overload of the function Drawer.draw() draws a circle onto the canvas. This function is not intended for direct use by the user. Make sure you know, what you are doing when using this function.
         * @param circle The circle
         * @example
         * // NOTE: This function is not the preferred way to draw Geometry objects. User canvasio.Canvas.draw() instead.
         * const canvas = new canvasio.Canvas({ preset: "fullscreen"});
         * const circle = new Geometry.Circle(
         *      new Geometry.Point(0, 0),
         *      100
         * );
         * const drawer = new Geometry.Drawer(canvas);
         * drawer.draw(circle); // Draws the circle onto the canvas. 
         */
        draw(circle: Circle): void;
        /**
         * This overload of the function Drawer.draw() draws a point onto the canvas. This function is not intended for direct use by the user. Make sure you know, what you are doing when using this function.
         * @param point The point
         * @example
         * // NOTE: This function is not the preferred way to draw Geometry objects. User canvasio.Canvas.draw() instead.
         * const canvas = new canvasio.Canvas({ preset: "fullscreen"});
         * const point = new Geometry.Point(100, 100);
         * const drawer = new Geometry.Drawer(canvas);
         * drawer.draw(point); // Draws the point onto the canvas. 
         */
        draw(point: Point): void;
        /**
         * This overload of the function Drawer.draw() draws a triangle onto the canvas. This function is not intended for direct use by the user. Make sure you know, what you are doing when using this function.
         * @param triangle The triangle
         * @example
         * // NOTE: This function is not the preferred way to draw Geometry objects. User canvasio.Canvas.draw() instead.
         * const canvas = new canvasio.Canvas({ preset: "fullscreen"});
         * const triangle = new Geometry.Triangle(
         *      new Geometry.Point(0, 0),
         *      new Geometry.Point(10, 10),
         *      new Geometry.Point(-10,-20),
         * );
         * const drawer = new Geometry.Drawer(canvas);
         * drawer.draw(triangle); // Draws the triangle onto the canvas. 
         */
        draw(triangle: Triangle): void;
        /**
         * This function directly draws a point onto the canvas.
         * @param point The point
         */
        protected #drawPoint(point: Point): void;
        /**
         * This function directly draws a line onto the canvas.
         * @param line The line
         */
        protected #drawLine(line: Line): void;
        /**
         * This function directly draws a ray onto the canvas.
         * @param ray The ray 
         */
        protected #drawRay(ray: Ray): void;
        /**
         * This function directly draws a segment onto the canvas.
         * @param segment The segment
         */
        protected #drawSegment(segment: Segment): void;
        /**
         * This function directly draws a circle onto the canvas.
         * @param circle The circle
         */
        protected #drawCircle(circle: Circle): void;
        /**
         * This function directly draws any polygon onto the canvas.
         * @param polygon The polygon
         */
        protected #drawPolygon(polygon: Polygon): void;
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
}

export = Geometry;