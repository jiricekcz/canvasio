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
        /**
         * Sets the gobal alpha value used when drawing onto the canvas, where 0 is completely transparent and 1 is fully opaque
         * @param alpha The new global alpha value
         * @example 
         * const canvas = new canvasio.Canvas({ preset: "fullscreen" });
         * 
         * canvas.setGlobalAlpha(0.5); // Sets the alpha to 0.5
         * canvas.drawLine({ x: 10, y: 10 }, { x: 20, y: 20 }); // Draws a line with global alpha value
         * @uses https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/globalAlpha
         */
        setGlobalAlpha(alpha: number): void;
        /**
         * Sets the operation used when two or more objects intersect. For detailed description about specific operations, see the link below.
         * @param operation The operation name
         * @example
         * const canvas = new canvasio.Canvas({ preset: "fullscreen" });
         * 
         * canvas.setGlobalCompositeOperation("xor"); // Sets the operation to xor
         * @uses https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/globalCompositeOperation
         */
        setGlobalCompositeOperation(operation: "source-over" | "source-in" | "source-out" | "source-atop" | "destination-over" | "destination-in" | "destination-out" | "destination-atop" | "lighter" | "copy" | "xor" | "multiply" | "screen" | "overlay" | "darken" | "lighten" | "color-dodge" | "color-burn" | "hard-light" | "soft-light" | "difference" | "exclusion" | "hue" | "saturation" | "color" | "luminosity"): void;
        /**
         * Draws an Image onto the canvas. 
         * @param image The image to draw
         * @param x The X coordinate of the upper left corner of the image
         * @param y The Y coordinate of the upper left corner of the image
         * @example
         * const canvas = new canvasio.Canvas({ preset: "fullscreen" });
         * 
         * var image = canvasio.Image.fromUrl("./assets/icon.png"); // Loads the image from ./assets/icon.png
         * canvas.drawImage(image, 100, 100); // Draws the image
         * @uses https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/drawImage
         */
        drawImage(image: Image, x: number, y: number);
        /**
         * Extracts image data from a region described by a rectangle.
         * @param rectangle The region 
         * @example 
         * const canvas = new canvasio.Canvas({ preset: "fullscreen" });
         * 
         * var imageData = canvas.getImageData({
         *      x: 100,
         *      y: 100,
         *      width: 200,
         *      height: 100
         * }); // Gets the image data
         * @uses https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/getImageData
         */
        getImageData(rectangle: Rectangle): ImageData;
        /**
         * Applies a filter, that will be used when drawing objects. Warning: This feature is experimental. Please refer to the link below for more information.
         * @param filter The filter
         * @example
         * const canvas = new canvasio.Canvas({ preset: "fullscreen" });
         * 
         * var filter = new canvasio.Filter.Blur(2); // Creates a blur filter
         * canvas.applyFilter(filter); // Applies the filter
         * @uses https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/filter
         */
        applyFilter(filter: Filter.Blur | Filter.Brightness | Filter.Contrast | Filter.DropShadow | Filter.Grayscale | Filter.HueRotate | Filter.Invert | Filter.Opacity | Filter.Saturation | Filter.Sepia | Filter.Url): void;
        /**
         * Returns all the filters currently applied to the canvas. Warning: This feature is experimental. Please refer to the link below for more information.
         * @example
         * const canvas = new canvasio.Canvas({ preset: "fullscreen" });
         * 
         * var filter = new canvasio.Filter.Blur(2); // Creates a blur filter
         * canvas.applyFilter(filter); // Applies the filter
         * 
         * console.log(canvas.getAllFilters()); // Logs the FilterManager object with all the filters - [canvasio.Filter.Blur]
         * @uses https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/filter
         */
        getAllFilters(): FilterManager;
        /**
         * Removes a filter. Warning: This feature is experimental. Please refer to the link below for more information.
         * @param filter The filter object
         * @example
         * const canvas = new canvasio.Canvas({ preset: "fullscreen" });
         * 
         * var filter = new canvasio.Filter.Blur(2); // Creates a blur filter
         * canvas.applyFilter(filter); // Applies the filter
         * 
         * canvas.removeFilter(filter); // Removes the filter
         * @uses https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/filter
         */
        removeFilter(filter: Filter.Blur | Filter.Brightness | Filter.Contrast | Filter.DropShadow | Filter.Grayscale | Filter.HueRotate | Filter.Invert | Filter.Opacity | Filter.Saturation | Filter.Sepia | Filter.Url): void;
        /**
         * Removes a filter with the index of it. Warning: This feature is experimental. Please refer to the link below for more information.
         * @param filterId The id of the filter
         * @example
         * const canvas = new canvasio.Canvas({ preset: "fullscreen" });
         * 
         * var filter = new canvasio.Filter.Blur(2); // Creates a blur filter
         * canvas.applyFilter(filter); // Applies the filter
         * 
         * canvas.removeFilter(0); // Removes the first filter
         * @uses https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/filter
         */
        removeFilter(filterId: number): void;
        /**
         * Removes all filters. Warning: This feature is experimental. Please refer to the link below for more information.
         * @example
         * const canvas = new canvasio.Canvas({ preset: "fullscreen" });
         * 
         * var filter = new canvasio.Filter.Blur(2); // Creates a blur filter
         * canvas.applyFilter(filter); // Applies the filter
         * 
         * canvas.clearFilters(); // Clears all filters
         * @uses https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/filter
         */
        clearFilters(): void;
        /**
         * Sets the image smoothing mode. 
         * @param imageSmoothingMode The image smoothing mode
         * @example
         * const canvas = new canvasio.Canvas({ preset: "fullscreen" });
         * 
         * canvas.setImageSmooth("disabled"); // Disables all image smoothing
         * @uses https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/imageSmoothingEnabled
         * @uses https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/imageSmoothingQuality
         */
        setImageSmooth(imageSmoothingMode: "disabled" | "low" | "medium" | "high"): void;
        /**
         * Creates a path.
         * @example
         * const canvas = new canvasio.Canvas({ preset: "fullscreen" });
         * 
         * var path = canvas.createPath(); // Creates the canvasio.Path object
         */
        createPath(): Path;
        /**
         * Draws a circle onto the canvas
         * @param x The X coordinate of the center of the circle
         * @param y The Y coordinate of the center of the circle
         * @param radius The radius of the circle
         * @example
         * const canvas = new canvasio.Canvas({ preset: "fullscreen" });
         * 
         * canvas.drawCircle(100, 100, 50); // Draws a circle from [100, 100] with the radius 50
         * @uses https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/arc
         * @uses https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/stroke
         */
        drawCircle(x: number, y: number, radius: number): void;
        /**
         * Fills a circle on the canvas
         * @param x The X coordinate of the center of the circle
         * @param y The Y coordinate of the center of the circle
         * @param radius The radius of the circle
         * @example
         * const canvas = new canvasio.Canvas({ preset: "fullscreen" });
         * 
         * canvas.fillCircle(100, 100, 50); // Fills a circle from [100, 100] with the radius 50
         * @uses https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/arc
         * @uses https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/fill
         */
        fillCircle(x: number, y: number, radius: number): void;
        /**
         * Redraws everything on the canvas with a filter. Works like applying a filter to a photo. Warning: This feature is experimental. Please refer to the link below for more information.
         * @param filter Filter to redraw the canvas with
         * @example
         * const canvas = new canvasio.Canvas({ preset: "fullscreen" });
         * 
         * canvas.drawGrid(50); // Draws a grid
         * 
         * var filter = new canvasio.Filter.Blur(2); // Creates a blur filter
         * canvas.redrawWithFilter(filter); // Redraws the canvas with the blur filter
         * @uses https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/filter
         */
        redrawWithFilter(filter: Filter.Blur | Filter.Brightness | Filter.Contrast | Filter.DropShadow | Filter.Grayscale | Filter.HueRotate | Filter.Invert | Filter.Opacity | Filter.Saturation | Filter.Sepia | Filter.Url): void;
        /**
         * Draws an object from the Geometry library
         * @param object The objects to draw onto the canvas
         * @example
         * const canvas = new canvasio.Canvas({ preset: "fullscreen" });
         * const point = new Geometry.Point(100, 100);
         * const point2 = new Geometry.Point(200, 200);
         * const line = new Geometry.Line(point, point2);
         * 
         * canvas.draw(point, point2, line); // Draws the three objects
         */
        draw(...object: Array<GeometryObject>): void;
        /**
         * Draws an object from the Geometry library
         * @param object The objects to draw onto the canvas
         * @example
         * const canvas = new canvasio.Canvas({ preset: "fullscreen" });
         * const point = new Geometry.Point(100, 100);
         * const point2 = new Geometry.Point(200, 200);
         * const line = new Geometry.Line(point, point2);
         * 
         * canvas.draw([point, point2, line]); // Draws the three objects
         */
        draw(...object: Array<Array<GeometryObject>>): void;
        /**
         * Draws an object from the Geometry library
         * @param object The objects to draw onto the canvas
         * @example
         * const canvas = new canvasio.Canvas({ preset: "fullscreen" });
         * const point = new Geometry.Point(100, 100);
         * const point2 = new Geometry.Point(200, 200);
         * const line = new Geometry.Line(point, point2);
         * 
         * canvas.draw(point, point2, line, line.getIntersect(point)); // Draws the three objects and the intersection
         */
        draw(...object: Array<GeometryObject | Array<GeometryObject>>): void;
    }
    /**
     * The class managing filters for the canvasio.Canvas
     */
    declare class FilterManager extends Array<Filter.Blur | Filter.Brightness | Filter.Contrast | Filter.DropShadow | Filter.Grayscale | Filter.HueRotate | Filter.Invert | Filter.Opacity | Filter.Saturation | Filter.Sepia | Filter.Url> {
        /**
         * FilterManager constructor
         */
        constructor();
        /**
         * Adds a filter to the list of filters
         * @param filter Filter to add
         */
        add(filter: Filter.Blur | Filter.Brightness | Filter.Contrast | Filter.DropShadow | Filter.Grayscale | Filter.HueRotate | Filter.Invert | Filter.Opacity | Filter.Saturation | Filter.Sepia | Filter.Url): void;
        /**
         * Removes a filter from the list
         * @param filter Filter to remove
         */
        remove(filter: Filter.Blur | Filter.Brightness | Filter.Contrast | Filter.DropShadow | Filter.Grayscale | Filter.HueRotate | Filter.Invert | Filter.Opacity | Filter.Saturation | Filter.Sepia | Filter.Url): void;
        /**
         * Removes a filter from the list by its index
         * @param filterId The index of the filter
         */
        remove(filterId: number): void;
        /**
         * Clears all the filters
         */
        clear(): void;
        /**
         * Converts the filter manager to a string
         */
        toString(): string;
    }
    /**
     * Namespace conatining all the filters
     */
    declare namespace Filter {
        /**
         * The base filter extended by other filters
         */
        declare class Base {
            /**
             * 
             * @param type The type of the filter
             * @param value The value of the filter
             */
            constructor(type: string, value: number);
            /**
             * Type of the filter
             */
            type: "url" | "blur" | "brightness" | "contrast" | "dropShadow" | "Grayscale" | "hue-rotate" | "invert" | "opacity" | "saturate" | "sepia";
            /**
             * The value of the filter
             */
            value: number;
            /**
             * Unit the filter uses
             */
            unit: string;
            /**
             * Converts the filter to a string
             */
            toString(): string;
        }
        /**
         * A filter that modifies the blur
         */
        declare class Blur extends Base {
            /**
             * 
             * @param radius Radius of the blur
             * @example
             * var filter = new canvasio.Filter.Blur(2); // Creates a blur filter
             */
            constructor(radius: number);
            unit: "px";
            type: "blur";
        }
        /**
         * An SVG filter from a url
         */
        declare class Url extends Base {
            /**
             * 
             * @param url The url of the filter
             * @example 
             * var filter = new canvasio.Filter.Url("./filter/filter1.svg"); // Creates the url filter
             */
            constructor(url: string);
            unit: "";
            type: "url";
        }
        /**
         * A filter that modifies the brightness
         */
        declare class Brightness extends Base {
            /**
             * 
             * @param intensity The intensity of the brightness filter
             * @example
             * var filter = new canvasio.Filter.Brightness(0.5); // Creates a brightness filter with intensity 50 %
             */
            constructor(intensity: number);
            unit: "%";
            type: "brightness";
        }
        /**
         * A filter that modifies the contrast
         */
        declare class Contrast extends Base {
            /**
             * 
             * @param intensity Intensity of the contrast filter
             * @example
             * var filter = new canvasio.Filter.Contrast(0.5); // Create a contrast filter with intensity 50 %
             */
            constructor(intensity: number);
            unit: "%";
            type: "contrast";
        }
        /**
         * Filter that modifies the drop of shadow
         */
        declare class DropShadow extends Base {
            /**
             * 
             * @param xOffset The offset of the shadow on the x axis
             * @param yOffset The offset of the shadow on the y axis
             * @param blurRadius The blur radius of the shadow
             * @param color The color of the shadow
             * @example
             * var filter = new canvasio.Filter.DropShadow(10, 10, 2, "#fff"); // Create a drop shadow filter 
             */
            constructor(xOffset: number, yOffset: number, blurRadius: number, color: string);
            value: undefined;
            type: "drop-shadow";
            values: dropShadowValues;
            units: ["px", "px", "", ""];
            toString(): string;
        }
        /**
         * Filter that turns the canvas grayscale
         */
        declare class Grayscale extends Base {
            /**
             * 
             * @param intensity The intensity of the grayscale filter
             * @example 
             * var filter = new canvasio.Filter.Grayscale(1); // Create a grayscale filter
             */
            constructor(intensity: number);
            unit: "%";
            type: "grayscale";
        }
        /**
         * Filter that rotates the hue value of all colors by an angle
         */
        declare class HueRotate extends Base {
            /**
             * 
             * @param angle The angle of rotation in radians
             * @example
             * var filter = new canvasio.Filter.HueRotate(Math.PI / 2); // Rotates the hue by 90 degrees
             */
            constructor(angle: number);
            unit: "deg";
            type: "hue-rotate";
        }
        /**
         * Filter that inverts
         */
        declare class Invert extends Base {
            /**
             * 
             * @param intensity The intensity of the invert filter
             * @example
             * var filter = new canvasio.Filter.Invert(0.5); // Create an invert filter with intensity 50 %
             */
            constructor(intensity: number);
            unit: "%";
            type: "invert";
        }
        /**
         * Opacity filter. Similar to canvasio.Canvas.setGlobalAlpha()
         */
        declare class Opacity extends Base {
            /**
             * 
             * @param intensity The intensity of the opacity filter
             * @example
             * var filter = new canvasio.Filter.Opacity(0.5); // Create an opacity filter with intensity 50 %, thus all objects will be drawn half transparent. 
             */
            constructor(intensity: number);
            unit: "%";
            type: "opacity";
        }
        /**
         * Saturaion filter
         */
        declare class Saturation extends Base {
            /**
             * 
             * @param intensity The intensity of the saturation change
             * @example
             * var filter = new canvasio.Filter.Saturation(0.5); // Create a saturation filter with intensity 50 %
             */
            constructor(intensity: number);
            unit: "%";
            type: "saturation";
        }
        /**
         * Filter that does the sepia effect
         */
        declare class Sepia extends Base {
            /**
             * 
             * @param intensity Intensity of the sepia effect
             * @example
             * var filter = new canvasio.Filter.Sepia(0.5); // Create a filter with the sepia effect of intensity 50 %
             */
            constructor(intensity: number);
            unit: "%";
            type: "sepia";
        }
    }
    /**
     * Rounds a number with the library's rounding constants
     * @param x Number to round
     * @param type Rounding type
     * @example
     * canvasio.round(1 / 3, "coordinate"); // Rounds the 1 / 3 in the coordinate mode
     */
    declare function round(x: number, type: "coordinate" | "angle" = "coordinate"): number;
    /**
     * The canvasio.Image class represents and image you can draw onto a canvas using the canvasio.Canvas.drawImage() function
     */
    declare class Image {
        /**
         * @param image The image source
         * @example
         * const image = new canvasio.Image(document.getElementById("myImage"));
         */
        constructor(image: HTMLImageElement | SVGImageElement | HTMLVideoElement | HTMLCanvasElement | ImageBitmap | OffscreenCanvas);
        /**
         * The image source object
         */
        image: HTMLImageElement | SVGImageElement | HTMLVideoElement | HTMLCanvasElement | ImageBitmap | OffscreenCanvas;
        /**
         * Gets an image from a url source
         * @param url The url of the image
         * @example
         * const image = canvasio.Image.fromUrl("./assets/icon.png"); // Loads the image form ./assets/icon.png
         */
        static fromUrl(url: string): Image;
        /**
         * Creates an image form the ImageData object
         * @param imageData The image data
         */
        static fromImageData(imageData: ImageData): Image;
        /**
         * Resizes the image. This function can deform the image
         * @param width The new width of the image
         * @param height The new height of the image
         * @example
         * const image = canvasio.Image.fromUrl("./assets/icon.png"); // Loads the image form ./assets/icon.png
         * 
         * image.resize(128, 128); // Resizes the image to 128x128 pixels
         */
        resize(width: number, height: number): void;
        /**
         * Crops the image
         * @param rectangle The rectangle represents the new crop area
         * @example
         * const image = canvasio.Image.fromUrl("./assets/icon.png"); // Loads the image
         * 
         * image.crop({
         *      x: 0,
         *      y: 0,
         *      width: 128,
         *      height: 128
         * }); // Crops the image to 128x128 pixels
         */
        crop(rectangle: Rectangle): void;
        /**
         * Gets the method used to draw this image onto the canvas. This method is not intended for direct use.
         */
        getDrawType(): "normal" | "resize" | "crop";
    }
    /**
     * A simple class representing a line dash pattern
     */
    declare class LineDashPattern extends Array<number> {
        constructor(pattern: Array<number>)
    }
    /**
     * Class representing a path, that can be directly drawn onto the canvas
     */
    declare class Path extends Path2D {
        /**
         * 
         * @param canvas The canvas to which the path should be drawn to
         */
        constructor(canvas: Canvas);
        /**
         * The canvas
         */
        canvas: Canvas;
        /**
         * Fills the path
         * @example
         * const canvas = new canvasio.Canvas({ preset: "fullscreen" });
         * const path = canvas.createPath(); // Creates the path
         * // Do something with the path
         * path.fill(); // Fills the path
         */
        fill(): void;
        /**
         * Draws the path
         * @example
         * const canvas = new canvasio.Canvas({ preset: "fullscreen" });
         * const path = canvas.createPath(); // Creates the path
         * // Do something with the path
         * path.draw(); // Draws the path
         */
        draw(): void;
    }
    declare interface dropShadowValues extends Array<number | string> {
        0: number;
        1: number;
        2: number;
        3: string;
        length: 4;
    }
    /**
     * Universal interface for any object from the Geometry library
     */
    declare interface GeometryObject {

    }
    /**
     * Interface for a rectangle
     */
    declare interface Rectangle {
        /**
         * The X coordinate of the upper left corner of the rectangle
         */
        x: number;
        /**
         * The Y coordinate of the upper left corner of the rectangle
         */
        y: number;
        /**
         * Width of the rectangle
         */
        width: number;
        /**
         * Height of the rectangle
         */
        height: number;
    }
    /**
     * Interface for a point
     */
    declare interface Point {
        /**
         * The X coordinate of the point
         */
        x: number;
        /**
         * The Y coordinate of the point
         */
        y: number;
    }
    /**
     * Options for the constructor of the canvasio.Canvas class
     */
    declare interface CanvasConstructorOptions {
        /**
         * Width of the canvas
         */
        width?: number,
        /**
         * Height of the canvas
         */
        height?: number,
        /**
         * The parent HTML element of the canvas
         */
        container?: HTMLElement,
        /**
         * Preset used when creating a canvas. If a preset is specified, all other options will be ignored.
         */
        preset?: "fullscreen" | "small" | "math"
    }
    /**
     * Options for the transformation of a canvas.
     */
    declare interface CanvasTransformOptions {
        /**
         * The amount by which the zero point should be moved on the X axis
         */
        x?: number;
        /**
         * The amount by which the zero point should be moved on the Y axis
         */
        y?: number;
        /**
         * The scale factor for the X axis
         */
        xScale?: number;
        /**
         * The scale factor for the Y axis
         */
        yScale?: number;
        /**
         * The rotation amount
         */
        rotation?: number;
    }
    /**
     * The canvasio.Vector class represents a vector of any length
     */
    declare class Vector extends Array<number> {
        /**
         * 
         * @param values The values for the vector
         * @example
         * const v = new canvasio.Vector(1, 2, 3, 4, 5); // Creates a vector
         */
        constructor(...values: Array<number>);
        /**
         * Multiplies this vector with another vector and returns the result
         * @param vector The vector to multiply this vector with
         * @example
         * const v1 = new canvasio.Vector(2, 2, 4, 4); // Constructs a vectors
         * const v2 = new canvasio.Vector(1, 2, 3, 4); // Constructs a vectors
         * 
         * const product = v1.multiply(v2); // Multiplies the vectors
         * // Expected output: canvasio.Vector(2, 4, 12, 16)
         */
        multiply(vector: Vector): Vector;
        /**
         * Multiplies the vector by a number
         * @param n The number to multiply this vector with
         * @example
         * const v1 = new canvasio.Vector(1, 2, 3, 5); // Constructs a vectors
         * 
         * const product = v1.multiply(5);
         * // Expected output: canvasio.Vector(5, 10, 15, 25)
         */
        multiply(n: number): Vector;
        /**
         * Subtracts this vector from another vector and returns the result
         * @param vector The vector to subtract this vector from
         * @example
         * const v1 = new canvasio.Vector(2, 2, 4, 4); // Constructs a vectors
         * const v2 = new canvasio.Vector(1, 2, 3, 4); // Constructs a vectors
         * 
         * const product = v1.subtract(v2); // Subtracts the vectors
         * // Expected output: canvasio.Vector(1, 0, 1, 0)
         */
        subtract(vector: Vector): Vector;
        /**
         * Subtracts a number from this vector
         * @param n The number to subtract
         * @example
         * const v1 = new canvasio.Vector(1, 2, 3, 5); // Constructs a vectors
         * 
         * const product = v1.subtract(5);
         * // Expected output: canvasio.Vector(-4, -3, -2, 0)
         */
        subtract(n: number): Vector;
        /**
         * Adds this vector to another vector and returns the result
         * @param vector The vector to add this vector to
         * @example
         * const v1 = new canvasio.Vector(2, 2, 4, 4); // Constructs a vectors
         * const v2 = new canvasio.Vector(1, 2, 3, 4); // Constructs a vectors
         * 
         * const product = v1.add(v2); // Adds the vectors
         * // Expected output: canvasio.Vector(3, 4, 7, 8)
         */
        add(vector: Vector): Vector;
        /**
         * Adds a number to this vector
         * @param n The number to add
         * @example
         * const v1 = new canvasio.Vector(1, 2, 3, 5); // Constructs a vectors
         * 
         * const product = v1.add(5);
         * // Expected output: canvasio.Vector(6, 7, 8, 10)
         */
        add(n: number): Vector;
        /**
         * Divides this vector by another vector and returns the result
         * @param vector The vector to divide this vector by
         * @example
         * const v1 = new canvasio.Vector(2, 2, 6, 10); // Constructs a vectors
         * const v2 = new canvasio.Vector(1, 2, 3, 4); // Constructs a vectors
         * 
         * const product = v1.divide(v2); // Divides the vectors
         * // Expected output: canvasio.Vector(2, 1, 2, 2.5)
         */
        divide(vector: Vector): Vector;
        /**
         * Divides this vector by a number
         * @param n The number to divide by
         * @example
         * const v1 = new canvasio.Vector(1, 2, 3, 5); // Constructs a vectors
         * 
         * const product = v1.divide(5);
         * // Expected output: canvasio.Vector(0.2, 0.4, 0.6, 1)
         */
        divide(n: number): Vector;
    }
}

export = canvasio;