/* MapModel is a class which represents a single map which contains a reference to 
   * a root node as well as a list of nodes associated with that root node. The map
   * also keeps track of its author.
   */

class MapModel {
    constructor(name, author) {
        this.name = name;
        this.root = new NodeModel(name, [], author); // Creates root node
        this.nodes = {};
        this.author = author;
    }

    // Adds a new node to an existing node's list
    addNode(existingNode, newNode) {
        existingNode.addNode(newNode);
        return newNode;
    }

    removeNode(node) {
        // TODO
    }

    groupUnderParent() {
        // TODO
    }

    upvote() {
        // TODO (currently this functionality is in the node classes)
    }

    downvote() {
        // TODO (currently this functionality is in the node classes)
    }
}