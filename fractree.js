class Factree {
    constructor(ctx) {
        this.ctx = ctx;
        this.clearBranches();
        this.recalculate();
    }

    update() {
        this.reset();
        this.clearBranches();
        this.recalculate();
    }

    reset() {
        Timer.resetAnimation();
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
                this.getColour(),
                this.getWidth()
            )
        );
    }

    getSliderVal(name) {
        return parseInt(document.getElementById(name).value);
    }

    recalculate() {
        for (let i = 0; i < Config.TREE_DEPTH; i++) {
            this.calculateLayer();
            Timer.animation++;
        }
    }

    createNewBranch(branch){
        let shrinkFactor = this.getSliderVal("shrinkSlider") / 100;
        return new Branch(
            this.ctx,
            branch.x,
            branch.y,
            ...branch.asScaledVector(shrinkFactor),
            this.getColour(),
            this.getWidth()
        );
    }

    getNextAngle(index, max) {
        let multiplier = (index - (max / 2)) / max;
        let foldSliderVal = ((this.getSliderVal("foldSlider") / 10) - 1) / 10;
        let changingAngle = (Timer.animation + 1) / Config.TREE_DEPTH;
        let changing = changingAngle * foldSliderVal + 1;
        let overalAngle = (this.getSliderVal("angleSlider") / 100) * Math.PI * 2;
        return changing * overalAngle * multiplier;
    }

    calculateLayer() {
        let branchesToAdd = [];
        for (let i = 0; i < this.branches[this.branches.length - 1].length; i++) {
            let branch = this.branches[this.branches.length - 1][i];
            for (let j = 0; j < 4; j++) {
                let angle = this.getNextAngle(j, 4 - 1);
                let newBranch = this.createNewBranch(branch);
                newBranch.rotate(angle);
                branchesToAdd.push(newBranch);
            }
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

    getWidth() {
        return (this.getSliderVal("fatSlider") / 100) * (Config.TREE_DEPTH - Timer.animation);
    }

    getColour() {
        let r = 80 + 50 * ((Timer.animation / (Config.TREE_DEPTH - 1))**2);
        let g = 55 + 150 * ((Timer.animation / (Config.TREE_DEPTH - 1))**2);
        let b = 80 + 150 * ((Timer.animation / (Config.TREE_DEPTH - 1))**2);
        let a = 1 - ((Timer.animation / (Config.TREE_DEPTH - 1)) / 1.4);
        return `rgba(${r}, ${g}, ${b}, ${a})`
    }
}