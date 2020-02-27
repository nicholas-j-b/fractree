class Config {
    static CANVAS_WIDTH = 1400;
    static CANVAS_HEIGHT = 1000;
    static THETA = 2;
    static BRANCH_WIDTH = 1;
    static BRANCH_SIZE_REDUCTION = .83;
    static ANIMATION = {
        fps: 2,
        totalIterations: 13
    };
    static COLOURS = {
        background: '#1030A0',
        branch: 'rgb(255, 0, 0)'
    };
}

class Timer {
    static frame = 0;
}

class Debug {
    static DEFUALT = 1;
}
