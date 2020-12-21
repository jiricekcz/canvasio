/**
 * @description Amount of decimal places round coordinates to
 */
const decimalRoundCoordinate = 3;
/**
 * @description Amount of decimal places round angles in radians to
 */
const decimalRoundAngle = 10;
export class Canvas {
    /**
     * 
     * @param {Object} options Options for the canvas creation
     * @param {Number} [options.width] The width of the canvas
     * @param {Number} [options.height] The height of the canvas
     * @param {HTMLElement} [options.container] The parent element of the canvas
     * @param {?"fullscreen" | "small"} [options.preset] If preset is present, it will bypass all other options and initialize the canvas with the preset
     */
    constructor(options = { width: window.innerWidth / 2, height: window.innerHeight / 2, container: document.body }) {
        /**
         * @description The canvas element object
         * @type {HTMLCanvasElement}
         */
        this.canvas = document.createElement("canvas");
        if (options.preset) {
            switch (options.preset) {
                case "fullscreen":
                    document.body.appendChild(this.canvas);
                    document.body.style.margin = 0;
                    document.body.style.overflow = "hidden";
                    this.canvas.style.margin = 0;
                    this.canvas.width = window.innerWidth
                    this.canvas.height = window.innerHeight;
                    this.canvas.style.position = "absolute";
                    this.canvas.style.top = 0;
                    this.canvas.style.left = 0;
                    break;
                case "small":
                    document.body.appendChild(this.canvas);
                    document.body.style.margin = 0;
                    document.body.style.overflow = "hidden";
                    this.canvas.style.margin = 0;
                    this.canvas.width = window.innerWidt / 4;
                    this.canvas.height = window.innerHeight / 4;
                    break;
                default:
                    throw new Error("Unknown preset: " + options.preset);
            }
        } else {
            options.container.appendChild(this.canvas);
            this.canvas.height = options.height + "px";
            this.canvas.width = options.width + "px";
        }
        /**
         * @description Context of the canvas
         * @type {CanvasRenderingContext2D}
         */
        this.context = this.canvas.getContext("2d");
        /**
         * @description Translation object used to translate this canvas
         * @type {Translation}
         */
        this.translatation = new ZeroTranslation();
    }
    /**
      * @function drawLine
      * @param {Number} A 
      * @param {Number} B 
      * @param {Number} C
      * @param {Number} D
      * @returns {void}
      */
    /**
     * @function drawLine
     * @param {Object} A Point A
     * @param {Number} [A.x] The x coordinate
     * @param {Number} [A.y] The y coordinate
     * @param {Object} B Point B
     * @param {Number} [B.x] The x coordinate
     * @param {Number} [B.y] The y coordinate
     * @returns {void}
     */
    drawLine(A, B, C, D) {
        if (A === undefined || B === undefined) throw new Error("At least two arguments need to be provided.")
        if (C) {
            A = new Point(A, B);
            B = new Point(C, D);
        }
        console.log(A,B)
        A = this.#translate(A);
        B = this.#translate(B);
        try {
            this.context.beginPath();
            console.log(A,B);
            this.context.moveTo(A.x, A.y);
            this.context.lineTo(B.x, B.y);
            this.context.stroke();
        } catch (e) {
            throw new Error(`Unable to draw line from [${A.x}, ${A.y}] to [${B.x}, ${B.y}]`);
        }
    }
    /**
     * @description Translates a point represented by a Point object to a new Point represented by a Point object
     * @param {Point} x 
     * @returns {Point}
     */
    /**
     * @description Translates a point represented by the x and y coordinates to a new Point represented by a Point object.
     * @param {Number} x 
     * @param {Number} y 
     * @returns {Point}
     * @private
     */
    #translate(x, y) {
        return this.translatation.translate(x, y);
    }
    /**
     * 
     * @param {Object} options
     * @param {Number} [options.x] The x coordinate of the [0, 0] point
     * @param {Number} [options.y] The y coordinate of the [0, 0] point
     * @param {Number} [options.xScale] The scaling factor of the x axis
     * @param {Number} [options.yScale] The scaling factor of the y axis
     * @param {Number} [options.rotation] The rotation of the plane in radians
     */
    translate(options) {
        if (!options) this.translatation = new ZeroTranslation(); else this.translatation = new Translation(options);
    }
}
export class Point {
    /**
     * 
     * @param {Number} x The x coordinate of the point
     * @param {Number} y The y coordinate of the point 
     */
    constructor(x, y) {
        if (typeof x !== 'number') throw new Error("Point x must be a number.");
        if (typeof y !== 'number') throw new Error("Point y must be a number.");
        /**
         * @description The x coordinate
         * @type {Number}
         */
        this.x = round(x);
        /**
         * @description The y coordinate
         * @type {Number}
         */
        this.y = round(y);
    }
    /**
     * 
     * @param {Number} x The x coordinate of the point
     * @param {Number} y The y coordinate of the point
     * @returns {Number} The distance
     */
    /**
     * @description Calculates the distance between two points using the pythagorian theorem
     * @param {Point} x The point to calculate the distance to
     * @returns {Number} The distance
     */
    distance(x, y) {
        if (x.constructor.name === "Point") {
            y = x.y;
            x = x.x
        } else if (typeof x !== 'number') throw new Error("Point x must be a number.");
        else if (typeof y !== 'number') throw new Error("Point y must be a number.");
        return Math.pow(Math.pow(this.x - x, 2) + Math.pow(this.y - y, 2), 1 / 2);
    }
}
export class Translation {
    /**
     * 
     * @param {Object} values
     * @param {Number} [values.x] The x coordinate of the [0, 0] point
     * @param {Number} [values.y] The y coordinate of the [0, 0] point
     * @param {Number} [values.xScale] The scaling factor of the x axis
     * @param {Number} [values.yScale] The scaling factor of the y axis
     * @param {Number} [values.rotation] The rotation of the plane in radians
     */
    constructor(values) {
        if (!values) {
            console.warn("Translation created with empty setting. Consider using class ZeroTranslation.");
            values = {};
        }
        /**
         * @description The rotation angle of the translation in radians
         * @type {Number}
         */
        this.rotation = round(values.rotation, "angle") || 0;
        /**
         * @description The object containing the scaling factors
         */
        this.scale = {
            /**
             * @description The scaling factor for the x axis
             * @type {Number}
             */
            x: round(values.xScale) || 1,
            /**
             * @description The scaling factor for the y axis
             * @type {Number}
             */
            y: round(values.yScale) || 1
        }
        /**
         * @description The zero point of the translation
         * @type {Point}
         */
        this.zero = new Point(round(values.x) || 0, round(values.y) || 0);
    }

    /**
     * @description Translates a point represented by a Point object to a new Point represented by a Point object
     * @param {Point} x 
     * @returns {Point}
     */
    /**
     * @description Translates a point represented by the x and y coordinates to a new Point represented by a Point object.
     * @param {Number} x 
     * @param {Number} y 
     * @returns {Point}
     */
    translate(x, y) {
        if (x.constructor.name === 'Point') {
            y = x.y;
            x = x.x;
        } else if (typeof x !== 'number') throw new Error("Point x must be a number.");
        else if (typeof y !== 'number') throw new Error("Point y must be a number.");
        if (x == 0 && y == 0) return this.zero;
        if (this.rotation) { // If statement not needed, just for speed optimalization. 
            var a = Math.atan(-x / y);
            var na = a + this.rotation;
            var h = this.zero.distance(x, y);
            y = -Math.cos(na) * h;
            x = Math.sin(na) * h;
        }
        return new Point(x * this.scale.x + this.zero.x, y * this.scale.y + this.zero.y);
    }
}
export class ZeroTranslation extends Translation {
    constructor() {
        super({});
    }
    translate(x,y) {
        if (x.constructor.name === 'Point') {
            y = x.y;
            x = x.x;
        } else if (typeof x !== 'number') throw new Error("Point x must be a number.");
        else if (typeof y !== 'number') throw new Error("Point y must be a number.");
        return new Point(x, y);
    }
}
/**
 * @description Rounds number with given constants 
 * @param {Number} x The number to round
 * @param {"coordinate", "angle"}
 * @returns {Number}
 */
function round(x, type = "coordinate") {
    switch (type) {
        case "coordinate": return Math.round(x * Math.pow(10, decimalRoundCoordinate)) / Math.pow(10, decimalRoundCoordinate);
        case "angle": return Math.round(x * Math.pow(10, decimalRoundAngle)) / Math.pow(10, decimalRoundAngle);
        default: throw new Error("Unsuported rounding type.")
    }
}