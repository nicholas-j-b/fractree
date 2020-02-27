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
                Config.X_LENGTH, 
                Config.Y_LENGTH, 
                this.getColour()
            )
        );
    }
    
    recalculate() {
        Timer.resetAnimation();
        for (let i = 0; i < Config.ANIMATION.totalIterations; i++) {
            this.calculateLayer();
        Timer.animation++;
        }
    }

    calculateLayer() {
        let branchesToAdd = [];
        for (let i = 0; i < this.branches[this.branches.length - 1].length; i++){
            let branch = this.branches[this.branches.length - 1][i];
            let b1 = new Branch(this.ctx, branch.x, branch.y, ...branch.asScaledVector(Config.BRANCH_SIZE_REDUCTION), this.getColour());
            let b2 = new Branch(this.ctx, branch.x, branch.y, ...branch.asScaledVector(Config.BRANCH_SIZE_REDUCTION), this.getColour());
            //let randomTheta = (Math.random() - .5) * Config.THETA;
            let randomTheta = Timer.frame * .003;
            b1.rotate(randomTheta);
            b2.rotate(-randomTheta);
            branchesToAdd.push(b1);
            branchesToAdd.push(b2);
        }
        this.branches.push(branchesToAdd);
    }

    draw() {
        for (let i = 0; i < this.branches.length; i++){
            for (let branch of this.branches[i]) {
                branch.draw();
            }
        }
    }
     
    getColour() {
        let r = 255 - (Timer.animation * 255) / Config.ANIMATION.totalIterations;
        let g = 255 - (Timer.animation * 255) / Config.ANIMATION.totalIterations;
        let b = (Timer.animation * 255) / Config.ANIMATION.totalIterations;
        return `rgb(${r}, ${g}, ${b})`
    }
}