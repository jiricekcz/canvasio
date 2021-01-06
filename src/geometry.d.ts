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
    /**
     * The Geometry.Line class represents a line
     */
    declare class Line extends Base {
        /**
         * Constructs a line from two points
         * @param point1 One point of the line
         * @param point2 Second point of the line
         * @example
         * var line = new Geometry.Line(
         *      new Geometry.Point(100, 0),
         *      new Geometry.Point(0, 100)
         * ); // Creates a line
         */
        constructor(point1: Point, point2: Point);
        /**
         * One of the points that define the line
         */
        a: Point;
        /**
         * One of the points that define the line
         */
        b: Point;
        /**
         * Returns the y coordinate of this line in point with a given x coordinate
         * @param x The x value
         */
        y(x: number): number;
        /**
         * Returns the x coordinate of this line in point with a given y coordinate
         * @param y The y value
         */
        x(y: number): number;
        /**
         * Returns the polynomial expression of this line
         */
        getLinePolynom(): Polynom;
        /**
         * Returns the string representation of this line
         */
        toString(): string;
        /**
         * Creates a perpendicular line, o which a point lays
         * @param point Point that lays on the perpendicular line
         */
        getPerpendicular(point: Point): Line;
        /**
         * Creates a parallel line, o which a point lays
         * @param point Point that lays on the parallel line
         */
        getParallel(point: Point): Line;
        /**
         * Calculates the distance between a point and this line
         * @param point The point
         */
        distance(point: Point): number;

        intersects(point: Point): boolean;
        intersects(ray: Ray): boolean;
        intersects(segment: Segment): boolean;
        intersects(line: Line): boolean;
        intersects(circle: Circle): boolean;
        intersects(polygon: Polygon): boolean;
        intersects(triangle: Triangle): boolean;
        getIntersect(point: Point): Point | null;
        getIntersect(ray: Ray): Ray | Point | null;
        getIntersect(segment: Segment): Segment | Point | null;
        getIntersect(line: Line): Line | Point | null;
        getIntersect(circle: Circle): [Point, Point] | Point | null;
        getIntersect(polygon: Polygon): Array<Segment | Point> | Segment | Point | null;
        getIntersect(triangle: Triangle): [Point, Point] | Segment | Point | null;
    }
    /**
     * The Geometry.Point class represents a point
     */
    declare class Point extends Base {
        /**
         * Creates a point from the x and y coordinates
         * @param x The X coordinate
         * @param y The Y coordinate
         * @example
         * var point = new Geometry.Point(0, 0); // Create a point
         */
        constructor(x: number, y: number);
        /**
         * The X coordinate
         */
        x: number;
        /**
         * The Y coordinate
         */
        y: number;
        /**
         * Returns the distance from the zero point [0, 0]
         */
        absolute(): number;
        /**
         * Returns a string representation of this point in the form [x, y]
         */
        toString(): string;
        /**
         * Returns an array representation of this point in the form [x, y]
         */
        toArray(): PointArrayForm;
        /**
         * Returns the distance between this point and another point
         * @param point The second point
         */
        distance(point: Point): number;
        /**
         * Returns the distance between this point and a line
         * @param line The line
         */
        distance(line: Line): number;
        /**
         * Reflects this point about another point and returns the new reflected point
         * @param point Point to reflect about
         */
        reflectAbout(point: Point): Point;
        /**
         * Reflects this point about a line and returns the new reflected point
         * @param line Line to reflect about
         */
        reflectAbout(line: Line): Point;
        /**
         * Creates a point from a string representation of it
         * @param string Point in a string form [x, y]
         */
        static fromString(string: string): Point;

        intersects(point: Point): boolean;
        intersects(ray: Ray): boolean;
        intersects(segment: Segment): boolean;
        intersects(line: Line): boolean;
        intersects(circle: Circle): boolean;
        intersects(polygon: Polygon): boolean;
        intersects(triangle: Triangle): boolean;
        getIntersect(point: Point): Point | null;
        getIntersect(ray: Ray): Point | null;
        getIntersect(segment: Segment): Point | null;
        getIntersect(line: Line): Point | null;
        getIntersect(circle: Circle): Point | null;
        getIntersect(polygon: Polygon): Point | null;
        getIntersect(triangle: Triangle): Point | null;
    }
    /**
     * The Geometry.Polynom class represents a polynom
     */
    declare class Polynom {
        /**
         * Creates a polynom from its coefficients
         * @param coefficients the coefficients of the polynom
         * @example
         * var polynom = new Geometry.Polynom(1, 0, 0); // Creates the x^2 polynom
         */
        constructor(...coefficients: Array<number>);
        /**
         * The degree of this polynom
         */
        degree: number;
        /**
         * Array of coefficients of the polynom
         */
        coefficients: Array<number>;
        /**
         * Returns the value of this polynom at a given point
         * @param x The x value
         */
        valueAt(x: number): number;
        /**
         * Returns the absolute coefficient of this polynom
         */
        getAbsoluteCoefficient(): number;
        /**
         * Returns the linear coefficient of this polynom
         */
        getLinearCoefficient(): number;
        /**
         * Returns the quadratic coefficient of this polynom
         */
        getQuadraticCoefficient(): number;
        /**
         * Returns the cubic coefficient of this polynom
         */
        getCubicCoefficient(): number;
    }
    /**
     * The Geometry.Ray class represents a ray
     */
    declare class Ray extends Base {
        /**
         * Creates a ray from two points
         * @param endPoint The end point of the ray
         * @param point2 Another point describing the rays direction
         * @example
         * var ray = new Ray(
         *      new Geometry.Point(0, 0),
         *      new Geometry.Point(100, 100)
         * ); // Creates a ray from the zero point in the direction of the [100, 100] point
         */
        constructor(endPoint: Point, point2: Point);
        /**
         * The end point of the ray
         */
        a: Point;
        /**
         * The secondary point of the ray
         */
        b: Point;
        /**
         * Returns the Y coordinate of a point that lays on this ray with the x coordinate specified
         * @param x The X value
         */
        y(x: number): number;
        /**
         * Returns the X coordinate of a point that lies on this ray with the y coordinate specified
         * @param y The Y value
         */
        x(y: number): number;
        /**
         * Returns a line this segment lays on
         */
        getLine(): Line;
        /**
         * Returns a string representation of this ray
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
        getIntersect(ray: Ray): Ray | Segment | Point | null;
        getIntersect(segment: Segment): Segment | Point | null;
        getIntersect(line: Line): Ray | Point | null;
        getIntersect(circle: Circle): [Point, Point] | Point | null;
        getIntersect(polygon: Polygon): Array<Segment | Point> | Segment | Point | null;
        getIntersect(triangle: Triangle): [Point, Point] | Segment | Point | null;
    }
    /**
     * The Geometry.Segment class represents a segment
     */
    declare class Segment extends Base {
        /**
         * Creates a segment from two points
         * @param point1 One end of the segment
         * @param point2 Second end of the segment
         * @example
         * var segment = new Geometry.Segment(
         *      new Geometry.Point(0, 0),
         *      new Geometry.Point(100, 100)
         * ); // Creates a segment between two points
         */
        constructor(point1: Point, point2: Point);
        /**
         * One of the point of the segment
         */
        a: Point;
        /**
         * One of the point of the segment
         */
        b: Point;
        /**
         * Returns the Y coordinate of a point that lays on this segment with the x coordinate specified
         * @param x The X value
         */
        y(x: number): number;
        /**
         * Returns the X coordinate of a point that lies on this segment with the y coordinate specified
         * @param y The Y value
         */
        x(y: number): number;
        /**
         * Returns a string representation of this segment
         */
        toStings(): string;
        /**
         * Returns a line this segment lays on
         */
        getLine(): Line;
        /**
         * Returns the length of this segment
         */
        length(): number;
        /**
         * Joins this segment with another segment and returns the resulting segment
         * @param segment Another segment
         */
        join(segment: Segment): Segment;

        intersects(point: Point): boolean;
        intersects(ray: Ray): boolean;
        intersects(segment: Segment): boolean;
        intersects(line: Line): boolean;
        intersects(circle: Circle): boolean;
        intersects(polygon: Polygon): boolean;
        intersects(triangle: Triangle): boolean;
        getIntersect(point: Point): Point | null;
        getIntersect(ray: Ray): Segment | Point | nulll;
        getIntersect(segment: Segment): Segment | Point | null;
        getIntersect(line: Line): Segment | Point | null;
        getIntersect(circle: Circle): [Point, Point] | Point | null;
        getIntersect(polygon: Polygon): Array<Segment | Point> | Segment | Point | null;
        getIntersect(triangle: Triangle): [Point, Point] | Segment | Point | null;
    }
    /**
     * The Geometry.Circle class represents a circle
     */
    declare class Circle extends Base {
        /**
         * Creates a circle from a center point and a radius
         * @param center Center point of the circle
         * @param radius Radius of the circle
         * @example
         * var circle = new Geometry.Circle(new Geometry.Point(0, 0), 100); // Creates a circle with radius 100
         */
        constructor(center: Point, radius: number);
        /**
         * The radius of the circle
         */
        r: number;
        /**
         * The center point of the circle
         */
        center: Point;
        /**
         * The circumference of the circle
         */
        length(): number;
        /**
         * Returns a string representation of this circle
         */
        toStings(): string;

        intersects(point: Point): boolean;
        intersects(ray: Ray): boolean;
        intersects(segment: Segment): boolean;
        intersects(line: Line): boolean;
        intersects(circle: Circle): boolean;
        intersects(polygon: Polygon): boolean;
        intersects(triangle: Triangle): boolean;
        getIntersect(point: Point): Point | null;
        getIntersect(ray: Ray): [Point, Point] | Point | null;
        getIntersect(segment: Segment): [Point, Point] | Point | null;
        getIntersect(line: Line): [Point, Point] | Point | nulll;
        getIntersect(circle: Circle): Circle | [Point, Point] | Point | null;
        getIntersect(polygon: Polygon): [Point, Point] | Point | null
        getIntersect(triangle: Triangle): [Point, Point] | Point | null;
    }
    /**
     * The Geometry.Triangle class represents a Triangle
     */
    declare class Triangle extends Base {
        /**
         * Creates a triangle from three points.
         * @param a One vertex of the Triangle
         * @param b Second vertex of the Triangle
         * @param c Third vertex of the Triangle
         */
        constructor(a: Point, b: Point, c: Point);
        /**
         * One vertex of the Triangle
         */
        A: Point;
        /**
         * One vertex of the Triangle
         */
        B: Point;
        /**
         * One vertex of the Triangle
         */
        C: Point;
        /**
         * One edge of the Triangle
         */
        a: Segment;
        /**
         * One edge of the Triangle
         */
        b: Segment;
        /**
         * One edge of the Triangle
         */
        c: Segment;
        /**
         * Returns the size of the angle BAC
         */
        getAlpha(): number;
        /**
         * Returns the size of the angle CBA
         */
        getBeta(): number;
        /**
         * Returns the size of the angle ACB
         */
        getGamma(): number;
        /**
         * Returns a string representation of this Triangle
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
        getIntersect(ray: Ray): [Point, Point] | Segment | Point | null;
        getIntersect(segment: Segment): [Point, Point] | Segment | Point | null;
        getIntersect(line: Line): [Point, Point] | Segment | Point | null;
        getIntersect(circle: Circle): Array<Point> | Point | null;
        getIntersect(polygon: Polygon): Polygon | Triangle | Array<Segment | Point> | Segment | Point | null;
        getIntersect(triangle: Triangle): Triangle | Array<Segment | Point> | Segment | Point | null;
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