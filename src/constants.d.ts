/**
 * The namespace Constants include all constants this library uses when performing calculations
 */
declare namespace Constants {
    /**
     * Number of decimal places the library rounds to when saving or comparing a coordinate or a distance
     */
    const decimalRoundCoordinate: number;
    /**
     * Number of decimal places the library rounds to when saving or comparing an angle in radians
     */
    const decimalRoundAngle: number;
    /**
     * A very large number used in drawing lines. If lines don't draw properly, try increasing this constant
     */
    const lineLengthMultiplier: number;
}
export = Constants;