import { decimalRoundCoordinate, decimalRoundAngle } from './constants.js'

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