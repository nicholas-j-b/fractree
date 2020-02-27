function begin() {
    var canvas = document.getElementById("standardCanvas");
    var ctx = canvas.getContext("2d");
    this.sketch = new Sketch(canvas, ctx);
}

class Sketch {
    constructor(canvas, ctx) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.factree = new Factree(ctx);
        var self = this;
        setInterval(function() {self.update(self)}, 1000 / Config.ANIMATION.fps);
    }

    update(self) {
        self.draw(self);
        Timer.frame++;
        self.factree.update();
    }

    draw(self) {
        self.ctx.fillStyle = Config.COLOURS.background;
        self.ctx.fillRect(0, 0, Config.CANVAS_WIDTH, Config.CANVAS_HEIGHT);
        self.factree.draw();
    }
}