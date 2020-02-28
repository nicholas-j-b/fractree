class Factree {
    constructor(ctx) {
        this.ctx = ctx;
        this.clearBranches();
        this.recalculate();
    }

    update() {
        this.clearBranches();
        this.recalculate();
    }

    clearBranches() {
        this.branches = [];
        this.branches.push([]);
        this.branches[0].push(
            new Branch(
                this.ctx,
                Config.START.x,
                Config.START.y,
                this.getSliderVal("lengthSlider"),
                this.getSliderVal("lengthSlider"),
                this.getColour()
            )
        );
    }

    getSliderVal(name) {
        return parseInt(document.getElementById(name).value);
    }

    recalculate() {
        Timer.resetAnimation();
        for (let i = 0; i < Config.TREE_DEPTH; i++) {
            this.calculateLayer();
            Timer.animation++;
        }
    }

    calculateLayer() {
        let branchesToAdd = [];
        for (let i = 0; i < this.branches[this.branches.length - 1].length; i++) {
            let branch = this.branches[this.branches.length - 1][i];
            let shrinkFactor = this.getSliderVal("shrinkSlider") / 100;
            let b1 = new Branch(
                this.ctx,
                branch.x,
                branch.y,
                ...branch.asScaledVector(shrinkFactor),
                this.getColour()
            );
            let b2 = new Branch(
                this.ctx,
                branch.x,
                branch.y,
                ...branch.asScaledVector(shrinkFactor),
                this.getColour()
            );
            let foldSliderVal = ((this.getSliderVal("foldSlider") / 10) - 1) / 10;
            let changingAngle = (Timer.animation + 1) / Config.TREE_DEPTH;
            let changing = changingAngle * foldSliderVal + 1;
            let overalAngle = (this.getSliderVal("angleSlider") / 100) * Math.PI * 2;
            let angle = changing * overalAngle
            b1.rotate(angle);
            b2.rotate(-angle);
            branchesToAdd.push(b1);
            branchesToAdd.push(b2);
        }
        this.branches.push(branchesToAdd);
    }

    draw() {
        for (let i = 0; i < this.branches.length; i++) {
            for (let branch of this.branches[i]) {
                branch.draw();
            }
        }
    }

    getColour() {
        let r = 200 - 100 * (Timer.animation / (Config.TREE_DEPTH - 1));
        let g = 100 + 40 * (Timer.animation / (Config.TREE_DEPTH - 1));
        let b = 55 + 200 * (Timer.animation / (Config.TREE_DEPTH - 1));
        return `rgb(${r}, ${g}, ${b})`
    }
}