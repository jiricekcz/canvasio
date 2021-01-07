import { type } from "os";
import { decimalRoundCoordinate, decimalRoundAngle } from "./constants.js";
import * as Geometry from "./geometry.js"
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
     * @param {?"fullscreen" | "small" | "math"} [options.preset] If preset is present, it will bypass all other options and initialize the canvas with the preset
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
                case "math":
                    document.body.appendChild(this.canvas);
                    document.body.style.margin = 0;
                    document.body.style.overflow = "hidden";
                    this.canvas.style.margin = 0;
                    this.canvas.width = window.innerWidth
                    this.canvas.height = window.innerHeight;
                    this.canvas.style.position = "absolute";
                    this.canvas.style.top = 0;
                    this.canvas.style.left = 0;
                    this.context = this.canvas.getContext("2d");
                    this.translate(this.canvas.width / 2, this.canvas.height / 2);
                    this.scale(1, -1);
                    break;
                default:
                    throw new Error("Unknown preset: " + options.preset);
            }
        } else {
            (options.container).appendChild(this.canvas);
            this.canvas.height = options.height;
            this.canvas.width = options.width;
        }
        /**
         * @description Context of the canvas
         * @type {CanvasRenderingContext2D}
         */
        this.context = this.canvas.getContext("2d");
        /**
         * @description Filters for the canvas
         * @type {FilterManager}
         */
        this.filters = new FilterManager();
        /**
         * @description Object that handles drawing of geometry objects on the canvas
         * @type {Geometry.Drawer}
         */
        this.drawer = new Geometry.Drawer(this);
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
            A = { x: A, y: B },
                B = { x: C, y: D }
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
     * @param {object} options
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
        var s = this.getTransform();
        this.transform();
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.setTransform(s);
    }
    /**
     * @description Draws a grid
     * @param {Number} width How far apart should the lines of the grid be
     */
    drawGrid(width = 50) {
        var lw = this.context.lineWidth;
        this.context.lineWidth = 2;
        this.drawLine(-this.canvas.width, 0, this.canvas.width, 0);
        this.drawLine(0, -this.canvas.height, 0, this.canvas.height);
        this.context.lineWidth = 0.5;
        for (var i = width; i < 2 * this.canvas.height; i += width) {
            this.drawLine(-2 * this.canvas.width, i, 2 * this.canvas.width, i);
        }
        for (var i = -width; i > -2 * this.canvas.height; i -= width) {
            this.drawLine(-2 * this.canvas.width, i, 2 * this.canvas.width, i);
        }
        for (var i = width; i < 2 * this.canvas.width; i += width) {
            this.drawLine(i, -2 * this.canvas.height, i, 2 * this.canvas.height);
        }
        for (var i = -width; i > -2 * this.canvas.width; i -= width) {
            this.drawLine(i, -2 * this.canvas.height, i, 2 * this.canvas.height);
        }
        this.context.lineWidth = lw;
    }
    /**
     * @description Draws a rectangle outline
     * @param {Number} x The x coordinate of the upper left corner of the rectangle
     * @param {Number} y The y coordinate of the upper left corner of the rectangle
     * @param {Number} width The width of the rectangle 
     * @param {Number} height The height of the rectangle
     * @returns {void}
     */
    rect(x, y, width, height) {
        if (typeof x == "object") {
            var y = x.y;
            var width = x.width;
            var height = x.height;
            x = x.x;
        }
        this.context.strokeRect(x, y, width, height);
    }
    /**
     * @description Fills a rectangle
     * @param {Number} x The x coordinate of the upper left corner of the rectangle
     * @param {Number} y The y coordinate of the upper left corner of the rectangle
     * @param {Number} width The width of the rectangle 
     * @param {Number} height The height of the rectangle
     * @returns {void}
     */
    fillRect(x, y, width, height) {
        if (typeof x == "object") {
            var y = x.y;
            var width = x.width;
            var height = x.height;
            x = x.x;
        }
        this.context.fillRect(x, y, width, height);
    }
    /**
     * @description Clears a rectangle
     * @param {Number} x The x coordinate of the upper left corner of the rectangle
     * @param {Number} y The y coordinate of the upper left corner of the rectangle
     * @param {Number} width The width of the rectangle 
     * @param {Number} height The height of the rectangle
     * @returns {void}
     */
    clearRect(x, y, width, height) {
        if (typeof x == "object") {
            var y = x.y;
            var width = x.width;
            var height = x.height;
            x = x.x;
        }
        this.context.clearRect(x, y, width, height);
    }
    /**
     * @returns {void}
     * @description Saves the currect state of the canvas to stack. Can be restored using Canvas.load()
     */
    save() {
        this.context.save();
    }
    /**
     * @returns {void}
     * @description Loads the last saved canvas from the stack
     */
    load() {
        this.context.restore();
    }
    /**
     * @description Draws a text on the canvas
     * @param {String} text Text to be drawn on canvas
     * @param {Number} x The x coordinate of the upper left corner of the text
     * @param {Number} y The y coordinate of the upper left corner of the text
     * @param {?Number} maxWidth Max width of the text
     * @returns {void}
     */
    text(text, x, y, maxWidth) {
        this.context.fillText(text, x, y, maxWidth);
    }
    /**
     * @description Draws a text outline on the canvas
     * @param {String} text Text to be drawn on canvas
     * @param {Number} x The x coordinate of the upper left corner of the text
     * @param {Number} y The y coordinate of the upper left corner of the text
     * @param {?Number} maxWidth Max width of the text
     * @returns {void}
     */
    textOutline(text, x, y, maxWidth) {
        this.context.strokeText(text, x, y, maxWidth);
    }
    /**
     * @description Sets line width 
     * @param {Number} width 
     * @returns {void}
     */
    setLineWidth(width) {
        this.context.lineWidth = width;
    }
    /**
     * @description Sets the type of line endings 
     * @param {"butt" | "round" | "square"} cap Type of cap
     * @returns {void}
     */
    setLineCap(cap = "butt") {
        this.context.lineCap = cap;
    }
    /**
     * @description Sets the type of corners where two lines meet
     * @param {"round" | "bevel" | "miter"} join Type of line join
     * @returns {void}
     */
    setLineJoin(join = "miter") {
        this.lineJoin = join;
    }
    /**
     * @description Sets the miter limit
     * @param {Number} limit 
     * @returns {void}
     */
    setMiterLimit(limit) {
        this.context.miterLimit = limit;
    }
    /**
     * @description Sets the spacing of a line
     * @param {Number} lineWidth The width of the line
     * @param {Number} spacing Spacing of the lines 
     * @returns {void}
     */
    /**
     * @description Sets the spacing of a line
     * @param {Array<Number>} lineWidth 
     * @returns {void}
     */
    setLineDash(lineWidth, spacing) {
        if (typeof lineWidth === "object") this.context.setLineDash(lineWidth); else this.context.setLineDash([lineWidth, spacing]);
    }
    /**
     * @description Gets the line dashing pattern
     * @return {LineDashPattern}
     */
    getLineDash() {
        return new LineDashPattern(new LineDashPattern(this.context.getLineDash()));
    }
    /**
     * @description Sets the line dash offset
     * @param {Number} offset The offset of the line dash
     * @returns {void}
     */
    setLineDashOffset(offset) {
        this.context.lineDashOffset = offset;
    }
    /**
     * @description Sets the font style
     * @param {String} font String represnting the css style font
     * @returns {void}
     */
    setFont(font) {
        this.context.font = font;
    }
    /**
     * @description Sets the text align
     * @param {"start" | "end" | "left" | "right" | "center"} textAlign Text align type
     * @returns {void}
     */
    setTextAlign(textAlign = "start") {
        this.context.textAlign = textAlign;
    }
    /**
     * @description Sets the test baseline
     * @param {"top" | "hanging" | "middle" | "alphabetic" | "ideographic" | "bottom"} textBaseline Text baseline style
     * @returns {void} 
     */
    setTextBaseline(textBaseline = "alphabetic") {
        this.context.textBaseline = textBaseline;
    }
    /**
     * @description Sets text direction
     * @param {"ltr" | "rtl" | "inherit"} direction Direction of the text
     * @returns {void}
     */
    setDirection(direction = "inherit") {
        this.context.direction = direction;
    }
    /**
     * @description Sets the fill style
     * @param {String | CanvasGradient | CanvasPattern} style Syle of fill (color | gradient | image)
     * @returns {void}
     */
    setFill(style) {
        this.context.fillStyle = style;
    }
    /**
     * @description Sets the stroke style
     * @param {String | CanvasGradient | CanvasPattern} style Syle of stroke (color | gradient | image)
     * @returns {void}
     */
    setStroke(style) {
        this.context.strokeStyle = style;
    }
    /**
     * @description Sets the shadow blur. Default is 0, higher level is more blur
     * @param {Number} level Blur level
     * @returns {void}
     */
    setShadowBlur(level) {
        this.context.shadowBlur = level;
    }
    /**
     * @description Sets the shadow color
     * @param {String} color CSS style color
     * @returns {void}
     */
    setShadowColor(color) {
        this.context.shadowColor = color;
    }
    /**
     * @description Sets shadow offset
     * @param {?Number} x X shadow offset
     * @param {?Number} y Y shadow offset
     * @returns {void}
     */
    setShadowOffset(x, y) {
        if (typeof x === "number") this.context.shadowOffsetX = x;
        if (typeof y === "number") this.context.shadowOffsetY = y;
    }
    /**
     * @description Sets global alpha for all drawn objects
     * @param {Number} alpha Number between 0 and 1 representing the global alpha value
     * @returns {void}
     */
    setGlobalAlpha(alpha) {
        this.context.globalAlpha = alpha;
    }
    /**
     * @description Sets the global composite operation. For more information about operations visit offical MDN documentation
     * @param {"source-over" | "source-in" | "source-out" | "source-atop" | "destination-over" | "destination-in" | "destination-out" | "destination-atop" | "lighter" | "copy" | "xor" | "multiply" | "screen" | "overlay" | "darken" | "lighten" | "color-dodge" | "color-burn" | "hard-light" | "soft-light" | "difference" | "exclusion" | "hue" | "saturation" | "color" | "luminosity"} operation The operation
     * @link https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/globalCompositeOperation
     */
    setGlobalCompositeOperation(operation) {
        this.context.globalCompositeOperation = operation;
    }
    /**
     * @description Draws an image to the canvas
     * @param {Image} image The image to be drawn
     * @param {Number} x The X coordinate of the upper left corner
     * @param {Number} y The Y coordinate of the upper left corner
     * @returns {void}
     */
    drawImage(image, x, y) {
        if (image.constructor.name !== 'Image') throw new TypeError("Please provide a valid Image object.");
        switch (image.getDrawType()) {
            case "normal": return (this.context.drawImage(image.image, x, y), [][0]);
            case "resize": return (this.context.drawImage(image.image, x, y, image.w, image.h), [][0]);
            case "crop": return (this.context.drawImage(image.image, image.cropRectangle.x, image.cropRectangle.y, image.cropRectangle.width, image.cropRectangle.height, x, y, image.w, image.h), [][0]);
        }
    }
    /**
     * @description Returns ImageData object with pixels from the rectangle from the canvas
     * @param {Object} rectangle Object represnting the rectangle
     * @param {Number} rectangle.x The x coordinate of the upper left corner of the rectangle
     * @param {Number} rectangle.y The y coordinate of the upper left corner of the rectangle
     * @param {Number} rectangle.width The width of the rectangle
     * @param {Number} rectangle.height The height of the rectangle
     * @returns {ImageData}
     */
    getImageData(rectangle) {
        return this.context.getImageData(rectangle.x, rectangle.y, rectangle.width, rectangle.height);
    }
    /**
     * @description Applies a filter to the canvas
     * @param {Filter} filter Filter to be applied
     * @returns {void}
     */
    applyFilter(filter) {
        this.filters.add(filter);
        this.context.filter = this.filters.toString();
    }
    /**
     * @description Returns all the filters
     * @returns {FilterManager}
     */
    getAllFilters() {
        return this.filters;
    }
    /**
     * @description Removes a filter
     * @param {Number | Filter} filter 
     */
    removeFilter(filter) {
        this.filters.remove(filter);
        this.context.filter = this.filters.toString();
    }
    /**
     * @description Clears all filters
     * @returns {void}
     */
    clearFilters() {
        this.filters.clear();
        this.context.filter = this.filters.toString();
    }
    /**
     * @description Sets the image smoothing
     * @param {"disabled" | "low" | "medium" | "high"} imageSmoothingMode 
     * @returns {void}
     */
    setImageSmooth(imageSmoothingMode) {
        if (imageSmoothingMode === "disabled") return (this.context.imageSmoothingEnabled = false, [][0]);
        this.context.imageSmoothingEnabled = true;
        this.context.imageSmoothingQuality = imageSmoothingMode;
    }
    /**
     * @description Creates a path
     * @returns {Path}
     */
    createPath() {
        return new Path(this);
    }
    /**
     * @description Draws the outline of a circle
     * @param {Number} x The x coordinate of the center point of this circle
     * @param {Number} y The y coordinate of the center point of this circle 
     * @param {Number} radius The radius of the circle 
     */
    drawCircle(x, y, radius) {
        this.context.beginPath();
        this.context.arc(x, y, radius, 0, 2 * Math.PI);
        this.context.closePath();
        this.context.stroke();
    }
    /**
     * @description Draws a circle with infill
     * @param {Number} x The x coordinate of the center point of this circle
     * @param {Number} y The y coordinate of the center point of this circle 
     * @param {Number} radius The radius of the circle 
     */
    fillCircle(x, y, radius) {
        this.context.beginPath();
        this.context.arc(x, y, radius, 0, 2 * Math.PI);
        this.context.closePath();
        this.context.fill();
    }
    /**
     * @description Draws an object on the canvas
     * @param {...(Geometry.Line | Geometry.Ray | Geometry.Segment | Geometry.Point | Geometry.Circle | Array<Geometry.Line | Geometry.Ray | Geometry.Segment | Geometry.Point | Geometry.Circle>)} object
     * @returns {void}
     */
    draw(...object) {
        for (var o of object) {
            if (o === null) {
                console.warn("Attempted to draw an empty object.");
                continue;
            }
            if (o instanceof Array) {
                for (var oo of o) {
                    this.draw(oo);
                }
            } else this.drawer.draw(o);
        }
    }
    /**
     * @description Redraws the whole canvas with a filter and resets all filters applied to the canvas
     * @param {Filter} filter
     * @returns {Promise<void>}
     * @async
     */
    redrawWithFilter(filter) {
        this.save();
        this.transform();
        var id = this.getImageData({
            x: 0,
            y: 0,
            width: this.canvas.width,
            height: this.canvas.height
        });
        this.filters.clear();
        this.applyFilter(filter);
        this.clear();
        this.context.putImageData(id, 0, 0);
        this.load();
    }
}
/**
 * @description Simple Path class that inherits all functionalities from Path2D and adds fill() and draw() methods for direct draw on the canvas
 * @extends {Path2D}
 * @link https://developer.mozilla.org/en-US/docs/Web/API/Path2D
 */
export class Path extends Path2D {
    /**
     * @param {Canvas} canvas
     */
    constructor(canvas) {
        super();
        this.canvas = canvas;
    }
    /**
     * @description Fills the path
     * @returns {void}
     */
    fill() {
        this.canvas.context.fill(this);
    }
    /**
     * @description Draws the path
     * @returns {void}
     */
    draw() {
        this.canvas.context.stroke(this);
    }
}
/**
 * @description Class representing a line dash pattern
 * @extends {Array}
 */
export class LineDashPattern extends Array {
    constructor(pattern) {
        super();
        this.push(...pattern);
    }
}
/**
 * @description Class representing an Image, Graphics or a Video
 */
export class Image {
    /**
     * 
     * @param {HTMLImageElement | SVGImageElement | HTMLVideoElement | HTMLCanvasElement | ImageBitmap | OffscreenCanvas} image 
     */
    constructor(image) {
        /**
         * @description Image
         * @type {HTMLImageElement | SVGImageElement | HTMLVideoElement | HTMLCanvasElement | ImageBitmap | OffscreenCanvas}
         */
        this.image = image;
    }
    /**
     * @description Creates Image object from url
     * @param {String} url 
     * @returns {Image}
     */
    static fromUrl(url) {
        return new Image(`url(${url})`);
    }
    /**
     * @description Creates Image object from ImageData object
     * @param {ImageData} imageData 
     * @returns {Promise<Image>}
     */
    static fromImageData(imageData) {
        return new Promise((resolve, reject) => {
            createImageBitmap(imageData).then(e => {
                resolve(new Image(e));
            })
        })

    }
    /**
     * @description Resizes the image for drawing
     * @param {Number} width Image width
     * @param {Number} height Image height
     * @returns {void}
     */
    resize(width, height) {
        /**
         * @description Image width used when image is drawn 
         * @type {Number}
         */
        this.w = width;
        /**
         * @description Image height used when image is drawn
         * @type {Number}
         */
        this.h = height;
    }
    /**
     * @description Crops the original image to a rectangle
     * @param {Object} rectangle Object represnting the rectangle to crop out of the original image
     * @param {Number} [rectangle.x] The x coordinate of the upper left corner of the rectangle
     * @param {Number} [rectangle.y] The y coordinate of the upper left corner of the rectangle
     * @param {Number} [rectangle.width] The width of the rectangle
     * @param {Number} [rectangle.height] The height of the rectangle
     * @returns {void}
     */
    crop(rectangle) {
        this.cropRectangle = rectangle;
    }
    /**
     * @description Returns the method that will be used when drawing the rectangle
     * @ignore
     * @returns {"normal" | "resize" | "crop"}
     */
    getDrawType() {
        if (typeof this.w === "number" && typeof this.h === "number") {
            return (typeof this.cropRectangle === "object" && typeof this.cropRectangle.height === "number" && typeof this.cropRectangle.width === "number" && typeof this.cropRectangle.x === "number" && typeof this.cropRectangle.y === "number") ? "crop" : "resize";
        } else return "normal";
    }
}

/**
 * @description Manages filters for a canvas
 * @extends {Array<Filter.Base>}
 */
class FilterManager extends Array {
    constructor() {
        super();
    }
    /**
     * @description Adds a filter
     * @param {Filter.Base} filter 
     */
    add(filter) {
        this.push(filter);
    }
    /**
     * @description Removes an existing filter
     * @param {Number | Filter.Base} filter 
     * @returns {void}
     */
    remove(filter) {
        if (typeof filter === "number") {
            this.splice(filter, 1);
        } else if (typeof filter === "object") {
            if (this.findIndex(v => v === filter) == -1) throw new Error("Filter not found.");
            this.splice(this.findIndex(v => v === filter), 1);
        } else throw new TypeError("Parameter must be and index or a filter.");
    }
    /**
     * @description Clears all filters
     * @returns {void}
     */
    clear() {
        this.splice(0, this.length);
    }
    /**
     * @description Returns a string representation of the filters
     * @returns {String}
     */
    toString() {
        return this.join(" ");
    }
}

export var Filter = {};
/**
 * @description Represents a filter that can be applied to the canvas
 * @class
 * @abstract
 * @private
 */
Filter.Base = class Filter {
    constructor(type, value) {
        /**
         * @description The type of the filter
         * @type {"url" | "blur" | "brightness" | "contrast" | "dropShadow" | "Grayscale" | "hue-rotate" | "invert" | "opacity" | "saturate" | "sepia"}
         */
        this.type = type;
        /**
         * @description The value of the filter
         * @type {Number}
         */
        this.value = value;
        /**
         * @description Used to construct the filter string
         * @type {String}
         */
        this.unit;
    }
    /**
     * @description The toString function
     * @returns {String}
     */
    toString() {
        return `${this.type}(${this.value}${this.unit})`;
    }
}
/**
 * @description Blur filter
 * @extends {Filter.Base}
 */
Filter.Blur = class BlurFilter extends Filter.Base {
    /**
     * 
     * @param {Number} radius A number representing the radius of the blur
     */
    constructor(radius) {
        if (typeof radius !== 'number') throw new TypeError("Radius must be a number.");
        super("blur", radius);
        this.unit = "px";
    }
}
/**
 * @description External SVG filter
 * @extends {Filter.Base}
 */
Filter.Url = class UrlFilter extends Filter.Base {
    /**
     * 
     * @param {String} url The url to the filter
     */
    constructor(url) {
        if (typeof url !== "string") throw new TypeError("Url must be a string.");
        super("url", url);
        this.unit = "";
    }
}
/**
 * @description Brightness filter
 * @extends {Filter.Base}
 */
Filter.Brightness = class BrightnessFilter extends Filter.Base {
    /**
     * 
     * @param {Number} intensity A number between 0 and 1 representing the intensity
     */
    constructor(intensity) {
        if (typeof intensity !== "number") throw new TypeError("Intensity must be a number.");
        if (intensity < 0 || intensity > 1) throw new Error("Intensity must be between 0 and 1.");
        super("brightness", intensity * 100);
        this.unit = "%";
    }
}
/**
 * @description Contrast filter
 * @extends {Filter.Base}
 */
Filter.Contrast = class ContrastFilter extends Filter.Base {
    /**
     * 
     * @param {Number} intensity A number between 0 and 1 representing the intensity
     */
    constructor(intensity) {
        if (typeof intensity !== "number") throw new TypeError("Intensity must be a number.");
        if (intensity < 0 || intensity > 1) throw new Error("Intensity must be between 0 and 1.");
        super("contrast", intensity * 100);
        this.unit = "%";
    }
}
/**
 * @description DropShadow filter 
 * @extends {Filter.Base}
 */
Filter.DropShadow = class DropShadowFilter extends Filter.Base {
    /**
     * 
     * @param {Number} xOffset X axis offset
     * @param {Number} yOffset Y axis offset
     * @param {Number} blurRadius Blur radius
     * @param {String} color Color of the shadow
     */
    constructor(xOffset, yOffset, blurRadius, color) {
        if (typeof xOffset !== "number") throw new TypeError("X Offset must be a number.");
        if (typeof yOffset !== "number") throw new TypeError("Y Offset must be a number.");
        if (typeof blurRadius !== "number") throw new TypeError("Blur radius must be a number.");
        if (blurRadius < 0) throw new Error("Blur radius must be greater than or equal to zero.");
        if (!color || (typeof color !== "string" && typeof color.toString() !== "string")) throw new TypeError("Color must be representable by a string.");
        if (typeof color !== "string") color = color.toString();
        this.type = "drop-shadow";
        /**
         * @description Values to the function
         * @type {Number | String}
         */
        this.values = [xOffset, yOffset, blurRadius, color];
        /**
         * @description Units to the values
         * @type {String}
         */
        this.units = ["px", "px", "", ""];
    }
    /**
     * @description The toString function
     * @returns {String}
     */
    toString() {
        return `${this.type}(${this.values[0]}${this.units[0]} ${this.values[1]}${this.units[1]} ${this.values[2]}${this.units[2]} ${this.values[3]}${this.units[3]})`;
    }
}
/**
 * @description Grayscale filter 
 * @extends {Filter.Base}
 */
Filter.Grayscale = class GrayscaleFilter extends Filter.Base {
    /**
     * 
     * @param {Number} intensity A number between 0 and 1 representing the intensity
     */
    constructor(intensity) {
        if (typeof intensity !== "number") throw new TypeError("Intensity must be a number.");
        if (intensity < 0 || intensity > 1) throw new Error("Intensity must be between 0 and 1.");
        super("grayscale", intensity * 100);
        this.unit = "%";
    }
}
/**
 * @description Filter that rotates all colors hue by an angle
 * @extends {Filter.Base}
 */
Filter.HueRotate = class HueRotateFilter extends Filter.Base {
    /**
     * 
     * @param {Number} angle Angle to rotate in radians
     */
    constructor(angle) {
        if (typeof angle !== "number") throw new TypeError("Angle must be a number.");
        super("hue-rotate", Math.round(angle / Math.PI * 180 * 1e2) * 1e2);
        this.unit = "deg";
    }
}
/**
 * @description Invert filter 
 * @extends {Filter.Base}
 */
Filter.Invert = class InvertFilter extends Filter.Base {
    /**
     * 
     * @param {Number} intensity A number between 0 and 1 representing the intensity
     */
    constructor(intensity) {
        if (typeof intensity !== "number") throw new TypeError("Intensity must be a number.");
        if (intensity < 0 || intensity > 1) throw new Error("Intensity must be between 0 and 1.");
        super("invert", intensity * 100);
        this.unit = "%";
    }
}
/**
 * @description Opacity filter 
 * @extends {Filter.Base}
 */
Filter.Opacity = class OpacityFilter extends Filter.Base {
    /**
     * 
     * @param {Number} intensity A number between 0 and 1 representing the intensity
     */
    constructor(intensity) {
        if (typeof intensity !== "number") throw new TypeError("Intensity must be a number.");
        if (intensity < 0 || intensity > 1) throw new Error("Intensity must be between 0 and 1.");
        super("opacity", intensity * 100);
        this.unit = "%";
    }
}
/**
 * @description Saturation filter 
 * @extends {Filter.Base}
 */
Filter.Saturation = class SaturationFilter extends Filter.Base {
    /**
     * 
     * @param {Number} intensity A number between 0 and 1 representing the intensity
     */
    constructor(intensity) {
        if (typeof intensity !== "number") throw new TypeError("Intensity must be a number.");
        if (intensity < 0 || intensity > 1) throw new Error("Intensity must be between 0 and 1.");
        super("saturate", intensity * 100);
        this.unit = "%";
    }
}
/**
 * @description Sepia filter 
 * @extends {Filter.Base}
 */
Filter.Sepia = class SepiaFilter extends Filter.Base {
    /**
     * 
     * @param {Number} intensity A number between 0 and 1 representing the intensity
     */
    constructor(intensity) {
        if (typeof intensity !== "number") throw new TypeError("Intensity must be a number.");
        if (intensity < 0 || intensity > 1) throw new Error("Intensity must be between 0 and 1.");
        super("sepia", intensity * 100);
        this.unit = "%";
    }
}
/**
 * @extends {Array<number>}
 */
export class Vector extends Array {
    /**
     * 
     * @param  {...Number} values 
     */
    constructor(...values) {
        super();
        if (values.length == 0) throw new Error("Vector must have at least one value.");
        if (values.length == 1) console.warn("Using a one-dimensional vector, consider using native number insted.");
        this.push(...values);
    }
    /**
     * 
     * @param {Vector} vector 
     * @returns {Vector}
     */
    multiply(vector) {
        if (vector instanceof Number) {
            var v = [];
            for (var val of this) {
                v.push(val * vector);
            }
            return new Vector(...v);
        }
        if (vector.length != this.length) throw new Error("Can not multiply vectors, that don't have the same length.");
        var v = [];
        for (var i = 0; i < vector.length; i++) {
            v.push(this[i] * vector[i]);
        }
        return new Vector(...v);
    }
    /**
     * 
     * @param {Vector} vector 
     * @returns {Vector}
     */
    divide(vector) {
        if (vector instanceof Number) {
            var v = [];
            for (var val of this) {
                v.push(val / vector);
            }
            return new Vector(...v);
        }
        if (vector.length != this.length) throw new Error("Can not divide vectors, that don't have the same length.");
        var v = [];
        for (var i = 0; i < vector.length; i++) {
            v.push(this[i] / vector[i]);
        }
        return new Vector(...v);
    }
    /**
     * 
     * @param {Vector} vector 
     * @returns {Vector}
     */
    add(vector) {
        if (vector instanceof Number) {
            var v = [];
            for (var val of this) {
                v.push(val + vector);
            }
            return new Vector(...v);
        }
        if (vector.length != this.length) throw new Error("Can not add vectors, that don't have the same length.");
        var v = [];
        for (var i = 0; i < vector.length; i++) {
            v.push(this[i] + vector[i]);
        }
        return new Vector(...v);
    }
    /**
     * 
     * @param {Vector} vector 
     * @returns {Vector}
     */
    minus(vector) {
        if (vector instanceof Number) {
            var v = [];
            for (var val of this) {
                v.push(val - vector);
            }
            return new Vector(...v);
        }
        if (vector.length != this.length) throw new Error("Can not minus vectors, that don't have the same length.");
        var v = [];
        for (var i = 0; i < vector.length; i++) {
            v.push(this[i] - vector[i]);
        }
        return new Vector(...v);
    }
    /**
     * @returns {String}
     */
    toString() {
        return `Vector${this.length}D: [${this.join(", ")}]`;
    }

}

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