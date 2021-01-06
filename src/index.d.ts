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
        /**
         * Retruns the current transform matrix being applied to the canvas. 
         * @example 
         * const canvas = new canvasio.Canvas({ preset: "fullscreen" });
         * 
         * var matrix = canvas.getTransform(); // Saves the current transform matrix
         * // Do something here
         * canvas.setTransform(matrix); // Load the saved transform matrix
         * @uses https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/getTransform
         */
        getTransform(): DOMMatrix2DInit;
        /**
         * Replaces the default transform matrix with a given matrix.
         * @param transform The transform matrix to apply
         * @example
         * const canvas = new canvasio.Canvas({ preset: "fullscreen" });
         * 
         * var matrix = canvas.getTransform(); // Saves the current transform matrix
         * // Do something here
         * canvas.setTransform(matrix); // Load the saved transform matrix
         * @uses https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/setTransform
         */
        setTransform(transform: DOMMatrix2DInit): void;
        /**
         * Clears the canvas. 
         * @example
         * const canvas = new canvasio.Canvas({ preset: "fullscreen" });
         * 
         * canvas.drawLine({ x: 10, y: 10 }, { x: 20, y: 20 }); // Draws a line
         * 
         * canvas.clear(); // Clears the canvas
         * @uses https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/clearRect
         */
        clear(): void;
        /**
         * Draws a simple gird hightlighting the X and Y axis. Used mostly for debugging.
         * @param width Width of one column of the grid
         * @example
         * const canvas = new canvasio.Canvas({ preset: "fullscreen" });
         * canvas.transform({
         *      x: 1000,
         *      y: 500,
         *      rotation: Math.PI / 4
         * }); // Transforms the canvas
         * 
         * canvas.drawGrid(50); // Draws a rotated and translated grid
         */
        drawGrid(width: number = 50): void;
        /**
         * Draws a rectangle onto the canvas.
         * @param x The x coordinate of the upper left corner of the rectangle
         * @param y The y coordinate of the upper left corner of the rectangle
         * @param width Width of the rectangle
         * @param height Height of the rectangle
         * @example
         * const canvas = new canvasio.Canvas({ preset: "fullscreen" });
         * 
         * canvas.rect(100, 100, 200, 100); // Draws the outline of a rectangle from point [100, 100] to point [300, 200]
         * @uses https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/strokeRect
         */
        rect(x: number, y: number, width: number, height: number): void;
        /**
         * Draws a rectangle onto the canvas.
         * @param rectangle The rectangle to draw
         * @example
         * const canvas = new canvasio.Canvas({ preset: "fullscreen" });
         * 
         * canvas.rect({
         *      x: 100,
         *      y: 100,
         *      width: 200,
         *      height: 100
         * }); // Draws the outline of a rectangle from point [100, 100] to point [300, 200]
         * @uses https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/strokeRect
         */
        rect(rectangle: Rectangle): void;
        /**
         * Fills a rectangle on the canvas.
         * @param x The x coordinate of the upper left corner of the rectangle
         * @param y The y coordinate of the upper left corner of the rectangle
         * @param width Width of the rectangle
         * @param height Height of the rectangle
         * @example
         * const canvas = new canvasio.Canvas({ preset: "fullscreen" });
         * 
         * canvas.fillRect(100, 100, 200, 100); // Fills a rectangle from point [100, 100] to point [300, 200]
         * @uses https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/fillRect
         */
        fillRect(x: number, y: number, width: number, height: number): void;
        /**
         * Fills a rectangle on the canvas.
         * @param rectangle The rectangle to fill
         * @example
         * const canvas = new canvasio.Canvas({ preset: "fullscreen" });
         * 
         * canvas.fillRect({
         *      x: 100,
         *      y: 100,
         *      width: 200,
         *      height: 100
         * }); // Fills a rectangle from point [100, 100] to point [300, 200]
         * @uses https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/fillRect
         */
        fillRect(rectangle: Rectangle): void;
        /**
         * Clears a rectangle on the canvas.
         * @param x The x coordinate of the upper left corner of the rectangle
         * @param y The y coordinate of the upper left corner of the rectangle
         * @param width Width of the rectangle
         * @param height Height of the rectangle
         * @example
         * const canvas = new canvasio.Canvas({ preset: "fullscreen" });
         * 
         * canvas.clearRect(100, 100, 200, 100); // Clears a rectangle from point [100, 100] to point [300, 200]
         * @uses https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/clearRect
         */
        clearRect(x: number, y: number, width: number, height: number): void;
        /**
         * Clears a rectangle on the canvas.
         * @param rectangle The rectangle to clear
         * @example
         * const canvas = new canvasio.Canvas({ preset: "fullscreen" });
         * 
         * canvas.clearRect({
         *      x: 100,
         *      y: 100,
         *      width: 200,
         *      height: 100
         * }); // Clears a rectangle from point [100, 100] to point [300, 200]
         * @uses https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/clearRect
         */
        clearRect(rectangle: Rectangle): void;
        /**
         * Saves the current canvas configuration into the configuration stack.
         * @example
         * const canvas = new canvasio.Canvas({ preset: "fullscreen" });
         * 
         * canvas.setFill("#f0f"); // Sets fill color to #f0f
         * canvas.save(); // Saves the current canvas configuration
         * // Here the fill is #f0f
         * canvas.setFill("#00f") // Sets fill color to #00f
         * // Here the fill is #00f
         * canvas.load() // Loads the last canvas configuration saved
         * // Here the fill is #f0f
         * @uses https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/save
         */
        save(): void;
        /**
         * Loads the last canvas configuration saved to the stack.
         * @example
         * const canvas = new canvasio.Canvas({ preset: "fullscreen" });
         * 
         * canvas.setFill("#f0f"); // Sets fill color to #f0f
         * canvas.save(); // Saves the current canvas configuration
         * // Here the fill is #f0f
         * canvas.setFill("#00f") // Sets fill color to #00f
         * // Here the fill is #00f
         * canvas.load() // Loads the last canvas configuration saved
         * // Here the fill is #f0f
         * @uses https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/restore
         */
        load(): void;
        /**
         * Writes a text onto the canvas with optional text wrapping.
         * @param text The text
         * @param x The X coordinate of the upper left corner of the text box
         * @param y The Y coordinate of the upper left corner of the text box
         * @param maxWidth Max width for text wrapping
         * @example
         * const canvas = new canvasio.Canvas({ preset: "fullscreen" });
         * 
         * canvas.text("Hello world!", 300, 100); // Writes a Hello world! text onto the canvas.
         * @uses https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/fillText
         */
        text(text: string, x: number, y: number, maxWidth?: number): void;
        /**
        * Writes an outline of a text onto the canvas with optional text wrapping.
        * @param text The text
        * @param x The X coordinate of the upper left corner of the text box
        * @param y The Y coordinate of the upper left corner of the text box
        * @param maxWidth Max width for text wrapping
        * @example
        * const canvas = new canvasio.Canvas({ preset: "fullscreen" });
        * 
        * canvas.textOutline("Hello world!", 300, 100); // Writes a Hello world! text outline onto the canvas.
        * @uses https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/strokeText
        */
        textOutline(text: string, x: number, y: number, maxWidth?: number): void;
        /**
         * Sets the width of a line. Line width is scaled according the scale matrix.
         * @param width The width of the line
         * @example
         * const canvas = new canvasio.Canvas({ preset: "fullscreen" });
         * 
         * canvas.setLineWidth(2); // Sets the line width to 2
         * @uses https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/lineWidth
         */
        setLineWidth(width: number): void;
        /**
         * Sets the default line cap.
         * @param cap The cap type
         * @example
         * const canvas = new canvasio.Canvas({ preset: "fullscreen" });
         * 
         * canvas.setLineCap("round"); // Sets the line cap to round.
         * @uses https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/lineCap
         */
        setLineCap(cap: "butt" | "round" | "square" = "butt"): void;
        /**
         * Sets the default line join for all lines 
         * @param join The deafult join of two or more lines
         * @example
         * const canvas = new canvasio.Canvas({ preset: "fullscreen" });
         * 
         * canvas.setLineJoin("bevel"); // Sets the line join to bevel.
         * @uses https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/lineJoin
         */
        setLineJoin(join: "round" | "bevel" | "miter" = "miter"): void;
        /**
         * Sets the miter limit ratio."
         * @param limit The new miter limit ratio
         * @example 
         * const canvas = new canvasio.Canvas({ preset: "fullscreen" });
         * 
         * canvas.setMiterLimit(10); // Sets the miter limit ratio to 10
         * @uses https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/miterLimit
         */
        setMiterLimit(limit: number): void;
        /**
         * Sets the line dash pattern for all lines drawn
         * @param dashArray The line dash patter
         * @example
         * const canvas = new canvasio.Canvas({ preset: "fullscreen" });
         * 
         * canvas.setLineDash([10, 20, 40, 20]); // All lines drawn will be solid for 10 blank for 20 solid for the next 40 and then 10 blank again
         * @uses https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/setLineDash
         */
        setLineDash(dashArray: Array<number>): void;
        /**
         * Sets the line dash pattern for all lines drawn
         * @param lineDashPattern The line dash patter
         * @example
         * const canvas = new canvasio.Canvas({ preset: "fullscreen" });
         *
         * const lineDash = new canvasio.LineDashPattern([10, 20, 40, 20]);
         * canvas.setLineDash(lineDash); // All lines drawn will be solid for 10 blank for 20 solid for the next 40 and then 10 blank again
         * @uses https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/setLineDash
         */
        setLineDash(lineDashPattern: LineDashPattern): void;
        /**
         * Sets a simple dash pattern with only one repeating patter
         * @param lineWidth Width of the line in the dash
         * @param spacing Spacing between the line dashes
         * @example
         * const canvas = new canvasio.Canvas({ preset: "fullscreen" });
         * 
         * canvas.setLineDash(10, 10); // Sets the line to dash each 10
         * @uses https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/setLineDash
         */
        setLineDash(lineWidth: number, spacing: number): void;
        /**
         * Gets the current line dash
         * @example
         * const canvas = new canvasio.Canvas({ preset: "fullscreen" });
         * 
         * var lineDash = canvas.getLineDash(); // Saves the current line dash pattern
         * @uses https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/getLineDash
         */
        getLineDash(): LineDashPattern;
        /**
         * Sets the offset of line dash patter set by the canvasio.Canvas.setLineDash() function.
         * @param offset The offset of the line dash patter
         * @example
         * const canvas = new canvasio.Canvas({ preset: "fullscreen" });
         * 
         * canvas.setLineDash([10, 10]); // Sets a dashed line pattern
         * canvas.setLineDashOffset(5); // The line dash pattern will be now offset by 5
         * @uses https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/lineDashOffset
         */
        setLineDashOffset(offset: number): void;
        /**
         * Sets the font of the text drawn onto the canvas.
         * @param font CSS line font style
         * @example 
         * const canvas = new canvasio.Canvas({ preset: "fullscreen" });
         * 
         * canvas.setFont("bold italic large serif"); // Set the font weight to bold, the font-style to italic, the font size to large, and the font family to serif.
         * canvas.text("Hello world", 100, 100); // Writes a hello world text to the canvas.
         * @uses https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/font
         * @uses https://developer.mozilla.org/en-US/docs/Web/CSS/font
         */
        setFont(font: string): void;
        /**
         * Sets the text alignment for text drawn onto the canvas.
         * @param align Text align style
         * @example
         * const canvas = new canvasio.Canvas({ preset: "fullscreen" });
         * 
         * canvas.setTextAlign("center"); // Sets text alignment to center.
         * @uses https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/textAlign
         */
        setTextAlign(align: "start" | "end" | "left" | "right" | "center" = "start"): void;
        /**
         * Sets the baseline of text drawn onto the canvas. Baseline defines how will the text be drawn. For specific baselines refer to the link below.
         * @param baseline The text baseline
         * @example
         * const canvas = new canvasio.Canvas({ preset: "fullscreen" });
         * 
         * canvas.setTextBaseline("middle"); // The baseline of text will now be in the middle of the text
         * @uses https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/textBaseline
         */
        setTextBaseline(baseline: "top" | "hanging" | "middle" | "alphabetic" | "ideographic" | "bottom" = "alphabetic"): void;
        /**
         * Changes the text direction. Warning: This feature is experimental. Please refer to the link below for more information.
         * @param direction The text direction
         * @example
         * const canvas = new canvasio.Canvas({ preset: "fullscreen" });
         * 
         * canvas.setDirection("rtl"); // Sets the text direction to rtl
         * canvas.text("Hi!", 100, 100); // Canvas will now draw the text "!Hi"
         * @uses https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/direction
         */
        setDirection(direction: "ltr" | "rtl" | "inherit" = "inherit"): void;
        /**
         * Sets the fill for drawing content onto the canvas
         * @param style CSS like fill value
         * @example
         * const canvas = new canvasio.Canvas({ preset: "fullscreen" });
         * 
         * canvas.setFill("rgb(255, 0, 127)"); // Set the fill to rgb(255, 0, 127)
         * @uses https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/fillStyle
         * @uses https://developer.mozilla.org/en-US/docs/Web/CSS/color_value
         */
        setFill(style: string): void;
        /**
         * Sets the fill as a gradient. For more information about gradients refer to the links below.
         * @param gradient The gradient
         * @uses https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/fillStyle
         * @uses https://developer.mozilla.org/en-US/docs/Web/API/CanvasGradient
         */
        setFill(gradient: CanvasGradient): void;
        /**
         * Sets the fill as a patern. For more information about canvas patterns refer to the links below
         * @param pattern The pattern
         * @uses https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/fillStyle
         * @uses https://developer.mozilla.org/en-US/docs/Web/API/CanvasPattern
         */
        setFill(pattern: CanvasPattern): void;
        /**
         * Sets the stroke for drawing content onto the canvas
         * @param style CSS like stroke value
         * @example
         * const canvas = new canvasio.Canvas({ preset: "fullscreen" });
         * 
         * canvas.setStroke("rgb(255, 0, 127)"); // Set the stroke to rgb(255, 0, 127)
         * @uses https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/strokeStyle
         * @uses https://developer.mozilla.org/en-US/docs/Web/CSS/color_value
         */
        setStroke(style: string): void;
        /**
         * Sets the Stroke as a gradient. For more information about gradients refer to the links below.
         * @param gradient The gradient
         * @uses https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/strokeStyle
         * @uses https://developer.mozilla.org/en-US/docs/Web/API/CanvasGradient
         */
        setStroke(gradient: CanvasGradient): void;
        /**
         * Sets the Stroke as a patern. For more information about canvas patterns refer to the links below
         * @param pattern The pattern
         * @uses https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/strokeStyle
         * @uses https://developer.mozilla.org/en-US/docs/Web/API/CanvasPattern
         */
        setStroke(pattern: CanvasPattern): void;
        /**
         * Sets the blur for shadow effects.
         * @param level The level of the blur for the shadows
         * @example
         * const canvas = new canvasio.Canvas({ preset: "fullscreen" });
         * 
         * canvas.setShadowBlur(10); // Sets the shadow blur
         * canvas.setShadowColor("blue"); // Sets the shadow color
         * canvas.fillRect({
         *      x: 100,
         *      y: 100,
         *      width: 200,
         *      height: 100
         * }); // Fills a rectangle
         * @uses https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/shadowBlur
         */
        setShadowBlur(level: number): void;
        /**
         * Sets the color for shadow effects.
         * @param color CSS like color
         * @example
         * const canvas = new canvasio.Canvas({ preset: "fullscreen" });
         * 
         * canvas.setShadowBlur(10); // Sets the shadow blur
         * canvas.setShadowColor("blue"); // Sets the shadow color
         * canvas.fillRect({
         *      x: 100,
         *      y: 100,
         *      width: 200,
         *      height: 100
         * }); // Fills a rectangle
         * @uses https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/shadowColor
         * @uses https://developer.mozilla.org/en-US/docs/Web/CSS/color_value
         */
        setShadowColor(color: string): void;
        /**
         * Sets the offset of shadows
         * @param x Offset of the shadow on the x axis
         * @param y Offset of the shadow on the y axis
         * @example
         * const canvas = new canvasio.Canvas({ preset: "fullscreen" });
         * 
         * canvas.setShadowOffset(10, 10); // Sets the shadow offset for drawing to 10 in both directions
         * @uses https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/shadowOffsetX
         * @uses https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/shadowOffsetX
         */
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