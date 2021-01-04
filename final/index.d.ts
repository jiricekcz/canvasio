declare namespace canvasio {
    declare class Canvas {
        constructor(options?: CanvasConstructorOptions);
        canvas: HTMLElement;
        context: CanvasRenderingContext2D;
        filters: FilterManager;
        drawLine(A: Point, B: Point): void;
        drawLine(ax: number, ay: number, bx: number, by: number): void;
        transform(options: CanvasConstructorOptions): void;
        transform(): void;
        translate(x: number = 0, y: number = 0): void;
        scale(x: number = 1, y: number = 1): void;
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
declare interface CanvasTransformeOptions {
    x?: number;
    y?: number;
    xScale?: number;
    yScale?: number;
    rotation?: number;
}
export = canvasio;