class Config {
    static CANVAS_WIDTH = 1400;
    static CANVAS_HEIGHT = 1000;
    static BRANCH_WIDTH = 1;
    static START = {
        x: 200,
        y: 300
    };
    static X_LENGTH = 80;
    static Y_LENGTH = 80;
    static ANIMATION = {
        fps: 30
    };
    static TREE_DEPTH = 12;
    static COLOURS = {
        background: 'rgb(247, 220, 111)'
    };
}

class Timer {
    static frame = 0;
    static animation = 0;

    static resetFrame() {
        this.frame = 0;
    }

    static resetAnimation() {
        this.animation = 0;
    }
}

class Debug {
    static DEFUALT = 1;
}
