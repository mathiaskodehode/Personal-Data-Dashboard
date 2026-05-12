import { Clamp } from "./helperFunctions.js";

export class Vector2 {
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }

    Normalized() {
        const x2 = Math.pow(this.x, 2);
        const y2 = Math.pow(this.y, 2);
        const length = Math.sqrt(x2 + y2);
        if (length === 0) return new Vector2(0, 0);
        return new Vector2(this.x / length, this.y / length);
    }

    Clamp(xMin, xMax, yMin, yMax) {
        this.x = Clamp(this.x, xMin, xMax);
        this.y = Clamp(this.y, yMin, yMax);
        return this;
    }
}
