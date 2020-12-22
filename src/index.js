/**
 * @description Amount of decimal places round coordinates to
 */
const decimalRoundCoordinate = 3;
/**
 * @description Amount of decimal places round angles in radians to
 */
const decimalRoundAngle = 15;
/**
 * @description Class representing a canvas
 */
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
    }
    /**
      * @param {Number} A 
      * @param {Number} B 
      * @param {Number} C
      * @param {Number} D
      * @returns {void}
      */
    /**
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
        if (typeof C === "number") {
            A = new Point(A, B);
            B = new Point(C, D);
        }
        try {
            this.context.beginPath();
            this.context.moveTo(A.x, A.y);
            this.context.lineTo(B.x, B.y);
            this.context.closePath();
            this.context.stroke();
        } catch (e) {
            throw new Error(`Unable to draw line from [${A.x}, ${A.y}] to [${B.x}, ${B.y}]`);
        }
    }
    /**
     * @description Transforms the canvas according to the provided properties. If no options argument provided, this function will reset the transformation.
     * @param {?Object} options
     * @param {?Number} [options.x] The x coordinate of the [0, 0] point
     * @param {?Number} [options.y] The y coordinate of the [0, 0] point
     * @param {?Number} [options.xScale] The scaling factor of the x axis
     * @param {?Number} [options.yScale] The scaling factor of the y axis
     * @param {?Number} [options.rotation] The rotation of the plane in radians
     * @returns {void}
     */
    transform(options) {
        if (!options) {
            this.context.setTransform(1, 0, 0, 1, 0, 0);
            return;
        }
        if (typeof options.x === "number" || typeof options.y === "number") {
            this.context.translate(round(options.x || 0, "coordinate"), round(options.y || 0, "coordinate"));
        }
        if (typeof options.xScale === "number" || typeof options.yScale === "number") {
            this.context.scale(round(options.xScale || 1, "coordinate"), round(options.yScale || 1, "coordinate"));
        }
        if (typeof options.rotation === "number") {
            this.context.rotate(round(options.rotation, "angle"));
        }
    }
    /**
     * @description Moves the zero point of the canvas
     * @param {Number} x X axis move 
     * @param {Number} y Y axis move
     * @returns {void}
     */
    translate(x = 0, y = 0) {
        this.context.translate(x, y);
    }
    /**
     * @description Scales the canvas
     * @param {Number} x X axis scale
     * @param {Number} y Y axis scale
     * @return {void}
     */
    scale(x = 1, y = 1) {
        this.context.scale(x, y);
    }
    /**
     * @description Rotates the canvas
     * @param {Number} angle Angle of rotation in radians
     * @return {void}
     */
    rotate(angle) {
        this.context.rotate(angle);
    }
    /**
     * @description Gets the transform matrix
     * @return {DOMMatrix2DInit}
     */
    getTransform() {
        return this.context.getTransform();
    }
    /**
     * @description Sets the transform matrix
     * @param {DOMMatrix2DInit} transform 
     * @returns {void}
     */
    setTransform(transform) {
        this.context.setTransform(transform);
    }
    /**
     * @description Clears the canvas
     * @returns {void}
     */
    clear() {
        this.context.clearRect(-this.canvas.width, -this.canvas.height, this.canvas.width * 2, this.canvas.height * 2)
    }
    /**
     * 
     * @param {Number} width How far apart should the lines of the grid be
     */
    drawGrid(width = 50) {
        var lw = this.context.lineWidth;
        this.context.lineWidth = 2;
        this.drawLine(-this.canvas.width, 0, this.canvas.width, 0);
        this.drawLine(0, -this.canvas.height, 0, this.canvas.height);
        this.context.lineWidth = 0.5;
        for (var i = width; i < this.canvas.height; i+= width) {
            this.drawLine(-this.canvas.width, i, this.canvas.width, i);
        }
        for (var i = -width; i > -this.canvas.height; i-= width) {
            this.drawLine(-this.canvas.width, i, this.canvas.width, i);
        }
        for (var i = width; i < this.canvas.width; i+= width) {
            this.drawLine(i, -this.canvas.height, i, this.canvas.height);
        }
        for (var i = -width; i > -this.canvas.width; i-= width) {
            this.drawLine(i, -this.canvas.height, i, this.canvas.height);
        }
        this.context.lineWidth = lw;
    }
}
/**
 * @description Class representing a point on the canvas
 */
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
/**
 * @description Rounds number with given constants 
 * @param {Number} x The number to round
 * @param {"coordinate" | "angle"}
 * @returns {Number}
 */
function round(x, type = "coordinate") {
    switch (type) {
        case "coordinate": return Math.round(x * Math.pow(10, decimalRoundCoordinate)) / Math.pow(10, decimalRoundCoordinate);
        case "angle": return Math.round(x * Math.pow(10, decimalRoundAngle)) / Math.pow(10, decimalRoundAngle);
        default: throw new Error("Unsuported rounding type.")
    }
}