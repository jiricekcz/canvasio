import { Line } from './objects/Line.js';
import { Point } from './objects/Point.js';
import { Ray } from './objects/Ray.js';
import { Segment } from './objects/Segment.js';

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
        }
    }
}