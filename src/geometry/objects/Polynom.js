import { Base } from './Base.js';
export class Polynom extends Base {
    /**
     * @param  {...Number} coefficients The coefficents of this polynom in the usual oreder 
     * @example new Polynom(1, 0, 0); //Creates the x^2 polynom
     */
    constructor(...coefficients) {
        for (var coefficient of coefficients) {
            if (typeof coefficient !== 'number') throw new TypeError("All coefficients of a polynom must be numbers.");
        }
        super();
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