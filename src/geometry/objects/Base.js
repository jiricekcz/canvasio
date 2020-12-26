/**
 * @description Class representing datatypes of the geometry canvasio library
 * @abstract
 */
import { getIntersect } from '../getIntersect.js';

export class Base {
    constructor() {

    }
    /**
     * @description The default intersect function. May be overriden by extending classes.
     * @param {Base} object Object to calculate the intersect with
     * @returns {Base | null} 
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
        return this.getIntersect(object) === null;
    }
}
