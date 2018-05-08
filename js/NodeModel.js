/* NodeModel is a class which represents a single node whose content contains either a
   * URL link or a list of nodes. The NodeModel has a "weight" which represents its importance
   * in the map. Its weight is adjusted when a user upvotes or downvotes the node.
   */
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