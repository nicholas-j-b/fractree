class Branch {
    constructor(ctx, originX, originY, x, y, colour, width) {
        this.colour = colour;
        this.ctx = ctx;
        this.originX = originX;
        this.originY = originY;
        this.x = x + this.originX;
        this.y = y + this.originY;
        this.width = width;
    }

    draw() {
        this.ctx.beginPath();
        this.ctx.moveTo(this.originX, this.originY);
        this.ctx.lineTo(this.x, this.y);
        this.ctx.closePath();

        this.ctx.lineWidth = this.width;
        this.ctx.strokeStyle = this.colour;
        this.ctx.stroke();
    }

    asVector() {
        return [this.x - this.originX, this.y - this.originY];
    }

    asScaledVector(scale) {
        return [scale * (this.x - this.originX), scale * (this.y - this.originY)];
    }

    transpose(x, y) {
        this.originX -= x;
        this.originY -= y;
        this.x -= x;
        this.y -= y;
    }

    rotate(theta) {
        let currentX = this.originX;
        let currentY = this.originY;
        this.transpose(currentX, currentY);
        let x = this.x * Math.cos(theta) - this.y * Math.sin(theta);
        let y = this.x * Math.sin(theta) + this.y * Math.cos(theta);
        this.x = x;
        this.y = y;
        this.transpose(-currentX, -currentY);
    }

}