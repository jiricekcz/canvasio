/**
 * The canvasio namespace is the default namespace for all the canvas functionalities provided by the canvasio library.
 */
declare namespace canvasio {
    /**
     * Class canvasio.Canvas is the main Canvas class. This class includes all the functionalities of the canvasio library.
     */
    declare class Canvas {
        /**
         * The preferred way to create a canvas is the canvasio.Canvas constructor. You can either create the canvas by specifying the options or you can overwrite these options with a preset.
         * @param options Options for the canvas creation
         * @example 
         * //Create a canvas with options
         * const canvas = new canvasio.Canvas({
         *      width: 100, // Sets the width of the canvas to 100 pixels
         *      height: 100, // Sets the height of the canvas to 100 pixels
         *      container: document.body // Sets the html parent node to document.body
         * });
         * @example 
         * //Create a canvas with a preset
         * const canvas = new canvasio.Canvas({ preset: "fullscreen" }); // Creates a fullscreen canvas
         */
        constructor(options?: CanvasConstructorOptions);
        /**
         * The HTML Element of the canvas.
         */
        canvas: HTMLCanvasElement;
        /**
         * The CanvasRenderingContext2D context of this canvas.
         */
        context: CanvasRenderingContext2D;
        /**
         * Filters currently applied to the canvas.
         */
        filters: FilterManager;
        /**
         * Draws a line (a segment) from point A to point B
         * @param A Point A
         * @param B Point B
         * @example 
         * const canvas = new canvasio.Canvas({ preset: "fullscreen"});
         * 
         * canvas.drawLine({ x: 10, y: 20 }, { x: 100, y: 200 }); // Draws a line from [10, 20] to [100, 200]
         * @uses https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/lineTo
         */
        drawLine(A: Point, B: Point): void;
        /**
         * Draws a line (a segment) from point A to point B
         * @param ax X of point A
         * @param ay Y of point A
         * @param bx X of point B
         * @param by Y of point B
         * @example
         * const canvas = new canvasio.Canvas({ preset: "fullscreen" });
         * 
         * canvas.drawLine(10, 20, 100, 200); // Draws a line from [10, 20] to [100, 200]
         * @uses https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/lineTo
         */
        drawLine(ax: number, ay: number, bx: number, by: number): void;
        /**
         * Transforms the canvas. Can be used if you need a translation, scale and rotation. All options of the transformation are optional.
         * @param options The options for the transformation
         * @example 
         * const canvas = new canvasio.Canvas({ preset: "fullscreen" });
         * 
         * canvas.transform({
         *      x: 100, // Moves the zero point of the canvas by 100 pixels on the x axis
         *      scaleY: 1.5, // Scales the Y axis 1.5 times
         *      rotation: Math.PI / 2 // Rotates the canvas 90 degrees clockwise
         * });
         * @uses https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/translate
         * @uses https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/scale
         * @uses https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/rotate
         */
        transform(options: CanvasTransformOptions): void;
        /**
         * Resets the transform properties of the canvas.
         * @example
         * const canvas = new canvasio.Canvas({ preset: "fullscreen" });
         * 
         * canvas.scale(2, 2); // Scales the canvas by 2 on both axis
         * canvas.drawLine({ x: 10, y: 10 }, { x: 20, y: 20 }); // Draws a line with the scale
         * 
         * canvas.transform(); // Resets the transform
         * canvas.drawLine({ x: 10, y: 10 }, { x: 20, y: 20 }); // Draws a line without any transformations
         * 
         * @uses https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/setTransform
         */
        transform(): void;
        /**
         * Moves the zero point of the canvas by the parameters provided
         * @param x Move of the zero point on the X axis 
         * @param y Move of the zero point on the Y axis
         * @example 
         * const canvas = new canvasio.Canvas({ preset: "fullscreen" });
         * 
         * canvas.translate(200, 200); // Moves the zero point by 200 pixels along both axis
         * @uses https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/translate
         */
        translate(x: number = 0, y: number = 0): void;
        /**
         * Scales the axis of the canvas
         * @param x Scale on the X axis
         * @param y Scale on the Y axis
         * @example 
         * const canvas = new canvasio.Canvas({ preset: "fullscreen" });
         * 
         * canvas.scale(2, 2); // Scales the canvas 2 times along both axis
         * @uses https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/scale
         */
        scale(x: number = 1, y: number = 1): void;
        /**
         * Rotates the canvas clockwise.
         * @param angle The angle of the rotation in radians
         * @example 
         * const canvas = new canvasio.Canvas({ preset: "fullscreen" });
         * 
         * canvas.rotate(Math.PI / 4); // Rotates the canvas by 45 degrees clockwise.
         * canvas.rotate(-(Math.PI / 4)); // Rotates the canvas by 45 degrees counter-clockwise.
         * @uses https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/rotate
         */
        rotate(angle: number): void;
        getTransform(): DOMMatrix2DInit;
        setTransform(transform: DOMMatrix2DInit): void;
        clear(): void;
        drawGrid(width: number = 50): void;
        rect(x : number, y : number, width: number, height: number): void;
        rect(rectangle: Rectangle): void;
        fillRect(x : number, y : number, width: number, height: number): void;
        fillRect(rectangle: Rectangle): void;
        clearRect(x : number, y : number, width: number, height: number): void;
        clearRect(rectangle: Rectangle): void;
        save(): void;
        load(): void;
        text(text: string, x: number, y: number, maxWidth?: number): void; 
        textOutline(text: string, x: number, y: number, maxWidth?: number): void;
        setLineWidth(width: number): void;
        setLineCap(cap: "butt" | "round" | "square" = "butt"): void;
        setLineJoin(join: "round" | "bevel" | "miter" = "miter"): void;
        setMiterLimit(limit: number): void;
        setLineDash(dashArray: Array<number>): void;
        setLineDash(lineDashPattern: LineDashPattern): void;
        setLineDash(lineWidth: number, spacing: number): void;
        getLineDash(): LineDashPattern;
        setLineDashOffset(offset: number): void;
        setFont(font: string): void;
        setTextAlign(align: "start" | "end" | "left" | "right" | "center" = "start"): void;
        setTextBaseline(baseline: "top" | "hanging" | "middle" | "alphabetic" | "ideographic" | "bottom" = "alphabetic"): void;
        setDirection(direction: "ltr" | "rtl" | "inherit" = "inherit"): void;
        setFill(style: string): void;
        setStroke(style: string): void;
        setShadowBlur(level: number): void;
        setShadowColor(color: string): void;
        setShadowOffset(x: number, y: number): void;
        setGlobalAlpha(alpha: number): void;
        setGlobalCompositeOperation(operation: "source-over" | "source-in" | "source-out" | "source-atop" | "destination-over" | "destination-in" | "destination-out" | "destination-atop" | "lighter" | "copy" | "xor" | "multiply" | "screen" | "overlay" | "darken" | "lighten" | "color-dodge" | "color-burn" | "hard-light" | "soft-light" | "difference" | "exclusion" | "hue" | "saturation" | "color" | "luminosity"): void;
        drawImage(image: Image, x: number, y: number);
        getImageData(rectangle: Rectangle): ImageData;
        applyFilter(filter: Filter.Blur | Filter.Brightness | Filter.Contrast | Filter.DropShadow | Filter.Grayscale | Filter.HueRotate | Filter.Invert | Filter.Opacity | Filter.Saturation | Filter.Sepia | Filter.Url): void;
        getAllFilters(): FilterManager;
        removeFilter(filter: Filter.Blur | Filter.Brightness | Filter.Contrast | Filter.DropShadow | Filter.Grayscale | Filter.HueRotate | Filter.Invert | Filter.Opacity | Filter.Saturation | Filter.Sepia | Filter.Url): void;
        clearFilters(): void;
        setImageSmooth(imageSmoothingMode: "disabled" | "low" | "medium" | "high"): void;
        createPath(): Path;
        drawCircle(x: number, y: number, radius: number): void;
        fillCircle(x: number, y: number, radius: number): void;
        async redrawWithFilter(filter: Filter.Blur | Filter.Brightness | Filter.Contrast | Filter.DropShadow | Filter.Grayscale | Filter.HueRotate | Filter.Invert | Filter.Opacity | Filter.Saturation | Filter.Sepia | Filter.Url): Promise<void>;
        draw(...object: GeometryObject): void;
        draw(...object: GeometryObject[]): void;
        draw(...object: GeometryObject | GeometryObject[]): void;
    }
    declare class FilterManager extends Array<Filter.Blur | Filter.Brightness | Filter.Contrast | Filter.DropShadow | Filter.Grayscale | Filter.HueRotate | Filter.Invert | Filter.Opacity | Filter.Saturation | Filter.Sepia | Filter.Url> {
        constructor();
        add(filter: Filter): void;
        remove(filter: Filter): void;
        clear(): void;
        toString(): string;
    }
    declare namespace Filter {
        declare class Base {
            constructor(type: string, value: number);
            type: "url" | "blur" | "brightness" | "contrast" | "dropShadow" | "Grayscale" | "hue-rotate" | "invert" | "opacity" | "saturate" | "sepia";
            value: number;
            unit: string;
        }
        declare class Blur extends Base {
            constructor(radius: number);
            unit: "px";
            type: "blur";
        }
        declare class Url extends Base {
            constructor(url: string);
            unit: "px";
            type: "url";
        }
        declare class Brightness extends Base {
            constructor(intensity: number);
            unit: "%";
            type: "brightness";
        }
        declare class Contrast extends Base {
            constructor(intensity: number);
            unit: "%";
            type: "contrast";
        }
        declare class DropShadow extends Base {
            constructor(xOffset: number, yOffset: number, blurRadius: number, color: string);
            value: undefined;
            type: "drop-shadow";
            values: dropShadowValues;
            units: ["px", "px", "", ""];
            toString(): string;
        }
        declare class Grayscale extends Base {
            constructor(intensity: number);
            unit: "%";
            type: "grayscale";
        }
        declare class HueRotate extends Base {
            constructor(angle: number);
            unit: "deg";
            type: "hue-rotate";
        }
        declare class Invert extends Base {
            constructor(intensity: number);
            unit: "%";
            type: "invert";
        }
        declare class Opacity extends Base {
            constructor(intensity: number);
            unit: "%";
            type: "opacity";
        }
        declare class Saturation extends Base {
            constructor(intensity: number);
            unit: "%";
            type: "saturation";
        }
        declare class Sepia extends Base {
            constructor(intensity: number);
            unit: "%";
            type: "sepia";
        }
    }
    declare function round(x: number, type: "coordinate" | "angle" = "coordinate"): number;
    declare class Image {
        constructor(image: HTMLImageElement | SVGImageElement | HTMLVideoElement | HTMLCanvasElement | ImageBitmap | OffscreenCanvas);
        image: HTMLImageElement | SVGImageElement | HTMLVideoElement | HTMLCanvasElement | ImageBitmap | OffscreenCanvas;
        static fromUrl(url: string): Image;
        static fromImageData(imageData: ImageData): Image;
        resize(width: number, height: number): void;
        crop(rectangle: Rectangle): void;
        getDrawType(): "normal" | "resize" | "crop";
    }
    declare class LineDashPattern extends Array<number> {
        constructor(pattern: Array<number>)
    }
    declare class Path extends Path2D {
        constructor(canvas: Canvas);
        canvas: Canvas;
        fill(): void;
        draw(): void;
    }
    declare interface dropShadowValues extends Array<number | string> {
        0: number;
        1: number;
        2: number;
        3: string;
        length: 4;
    }
    declare interface GeometryObject {
    
    }
    declare interface Rectangle {
        x: number;
        y: number;
        width: number;
        height: number;
    }
    declare interface Point {
        x: number;
        y: number;
    }
    declare interface CanvasConstructorOptions {
        width?: number,
        height?: number,
        container?: HTMLElement,
        preset?: "fullscreen" | "small" | "math"
    }
    declare interface CanvasTransformOptions {
        x?: number;
        y?: number;
        xScale?: number;
        yScale?: number;
        rotation?: number;
    }
}

export = canvasio;