class NodeModel {
    constructor(label, content) {
        this.label = label;
        this.parent = null;
        this.content = content;

        if (typeof this.content != "string") {
            var i;
            for (i = 0; i < this.content.length; i++) {
                this.content[i].parent = this;
            }
        }
    }
}