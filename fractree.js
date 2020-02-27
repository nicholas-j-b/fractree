class Factree {
    constructor(ctx) {
        this.ctx = ctx;
        this.branches = [];
        this.branches.push([]);
        this.branches[0].push(new Branch(ctx, 400, 200, 80, 80, this.getColour()));
    }

    update() {
        let branchesToAdd = [];
        for (let i = 0; i < this.branches[this.branches.length - 1].length; i++){
            let branch = this.branches[this.branches.length - 1][i];
            let b1 = new Branch(this.ctx, branch.x, branch.y, ...branch.asScaledVector(Config.BRANCH_SIZE_REDUCTION), this.getColour());
            let b2 = new Branch(this.ctx, branch.x, branch.y, ...branch.asScaledVector(Config.BRANCH_SIZE_REDUCTION), this.getColour());
            let randomTheta = (Math.random() - .5) * Config.THETA;
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
        let r = 255 -(Timer.frame * 255) / Config.ANIMATION.totalIterations;
        let g = (Timer.frame * 255) / Config.ANIMATION.totalIterations;
        let b = (Timer.frame * 255) / Config.ANIMATION.totalIterations;
        return `rgb(${r}, ${g}, ${b})`
    }


}