class MapModel {
    constructor(name, author) {
        this.name = name;
        this.root = new NodeModel(name, []); // Creates root node
        this.nodes = {};
        this.author = author;
    }

    addNode(existingNode, newNode) {
        //newNode.parent = existingNode;
        existingNode.addNode(newNode);
        return newNode;
    }

    removeNode(node) {
        //delete thisIsObject[node];
    }

    groupUnderParent() {

    }

    upvote() {

    }

    downvote() {

    }

}