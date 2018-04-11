class MapModel {
    constructor(name) {
        this.name = name;
        this.root = new NodeModel(name, []); // Creates root node
        this.nodes = {};
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