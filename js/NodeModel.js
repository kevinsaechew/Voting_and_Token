class NodeModel {
    constructor(label, content, author) {
        this.label = label;
        this.parent = null;
        this.content = content;
        this.weight = 1;
        this.author = author;

        console.log(this.content);
        if (typeof this.content != "string") {
            console.log("set parent");
            var i;
            for (i = 0; i < this.content.length; i++) {
                console.log("for loop");
                this.content[i].parent = this;
            }
        }
    }

    upvote(){
        this.weight += .1;
    }

    downvote(){
        this.weight -= .1;
    }

    addNode(node){
        node.parent = this;
        this.content.push(node);
    }

    delete(node){
    //    var arr = this.content;
    //    for(var i = arr.length; i--;) {
    //         if(arr[i] === item) {
    //             arr.splice(i, 1);
    //         }
    //     }
        var idx = this.content.indexOf(node);
        keysPressed.splice(idx, 1);
    }
}