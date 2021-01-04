import * as canvasio from "./index.js"
declare namespace Geomtery {
    declare type GeometryObject = Point | Line | Ray | Segment | Circle | Polygon | Triangle;
    declare class Base {
        constructor();
        getIntersect(object: GeometryObject): GeometryObject | Array<GeometryObject> | null;
        intersects(object: GeometryObject): boolean;
    }

    declare class Polygon extends Base {
        constructor(points: Array<Point>);
        vertices: Array<Point>;
        edges: Array<Segment>;
        toString(): string;

        intersects(object: Point): boolean;
        intersects(object: Ray): boolean;
        intersects(object: Segment): boolean;
        intersects(object: Line): boolean;
        intersects(object: Circle): boolean;
        intersects(object: Polygon): boolean;
        intersects(object: Triangle): boolean;
        getIntersect(object: Point): Point | null;
        getIntersect(object: Ray): Array<Segment | Point> | Segment | Point | null;
        getIntersect(object: Segment): Array<Segment | Point> | Segment | Point | null;
        getIntersect(object: Line): Array<Segment | Point> | Segment | Point | null;
        getIntersect(object: Circle): Array<Point> | Point | null;
        getIntersect(object: Polygon): Polygon | Array<Segment | Point> | Segment | Point | null;
        getIntersect(object: Triangle): Polygon | Triangle | Array<Segment | Point> | Segment | Point | null;
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
    declare class Drawer {
        constructor(canvas: canvasio.Canvas);
        canvas: canvasio.Canvas;
        draw(segment: Segment): void;
        draw(line: Line): void;
        draw(ray: Ray): void;
        draw(polygon: Polygon): void;
        draw(circle: Circle): void;
        draw(point: Point): void;
        draw(triangle: Triangle): void;
        #drawPoint(point: Point): void;
        #drawLine(line: Line): void;
        #drawRay(ray: Ray): void;
        #drawSegment(segment: Segment): void;
        #drawCircle(circle: Circle): void;
        #drawPolygon(polygon: Polygon): void;
    }
}
declare interface PointArrayForm extends Array<Number> {
    0: number;
    1: number;
    length: 2;
}
export = Geomtery;