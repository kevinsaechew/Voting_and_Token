class NodeModel {
    constructor(label, content) {
        this.label = label;
        this.parent = null;
        this.content = content;
        this.weight = 1;

        if (typeof this.content != "string") {
            var i;
            for (i = 0; i < this.content.length; i++) {
                this.content[i].parent = this;
            }
        }
    }

    upvote(){
        this.weight += .1;
    }

    downvote(){
        console.log("HERE");
        this.weight -= .1;
    }
}