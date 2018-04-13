class MapModel {
    constructor(name, author) {
        this.name = name;
        this.root = new NodeModel(name, [], author); // Creates root node
        this.nodes = {};
        this.author = author;
    }

    addNode(existingNode, newNode) {
        newNode.parent = existingNode;
        existingNode.content.push(newNode);
        return newNode;
    }

    removeNode() {

    }

    groupUnderParent() {

    }

    upvote() {

    }

    downvote() {

    }

}