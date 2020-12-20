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
         */
        this.context = this.canvas.getContext("2d");
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
        if (!A || !B) throw new Error("At least two arguments need to be provided.")
        if (C) {
            A = { x: A, y: B };
            B = { x: C, y: D };
        }
        try {
            this.context.moveTo(A.x, A.y);
            this.context.lineTo(B.x, B.y);
            this.context.stroke();
        } catch (e) {
            throw new Error(`Unable to draw line from [${A.x}, ${A.y}] to [${B.x}, ${B.y}]` + e);
        }
    }
}
