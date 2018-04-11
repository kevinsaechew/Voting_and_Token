var stage; // Stage/Canvas
const nodeRadius = 40;
const bgNodeRadius = 200; // Larger Node Radius
var canvas = document.getElementById("demoCanvas");
var canvasWidth = canvas.width;
var canvasHeight = canvas.height;
var mainView = null;

var button = document.getElementById("zoom-out-button");
button.addEventListener("click", function(event) {
    if(mainView != null && mainView.model.parent != null) { // "mainView.model.parent != null" to prevent console error
        console.log(mainView.model);
        mainView = new NodeView(mainView.model.parent, canvasWidth/2, canvasHeight/2, 0);
        stage.update();
    }
}, false);

// There's an add-link button that simply takes in a URL and creates a link node
var addLinkButton = document.getElementById("add-link-button");
addLinkButton.addEventListener("click", function(event) {
    var nodeName = "new link";
    var linkURL = document.getElementById('link-name').value;
    var newNode = new NodeModel(nodeName, linkURL);
    mainView.model.content.push(newNode);
    mainView = new NodeView(mainView.model, canvasWidth/2, canvasHeight/2, 0);
    stage.update();

});

// This adds a completely new node that can be clicked 
var addNodeButton = document.getElementById("add-node-button");
addNodeButton.addEventListener("click", function(event) {
    var nodeName = document.getElementById('node-name').value;
    var linkURL = [];
    var newNode = new NodeModel(nodeName, linkURL);
    newNode.parent = mainView.model; // ^^ Maybe the parent can be added to the NodeModel constructor
    mainView.model.content.push(newNode);
    mainView = new NodeView(mainView.model, canvasWidth/2, canvasHeight/2, 0);
    stage.update();
    console.log("here");
});

function init() {
    load();
    displayNode();
}

function load() {
    stage = new createjs.Stage("demoCanvas");
    

    var backLabel = new createjs.Text("back", "Bold 16px Arial");
    backLabel.x = canvas.width / 2;
    backLabel.y = 50;
    backLabel.color = "#558888";
    backLabel.set({textAlign:'center'});
    backLabel.cursor = "pointer"
    backLabel.addEventListener("click", function(event) {
        if(mainView != null && mainView.model.parent != null) { // "mainView.model.parent != null" to prevent console error
            console.log(mainView.model);
            mainView = new NodeView(mainView.model.parent, canvasWidth/2, canvasHeight/2, 0);
            stage.update();
        }
    }, false);

    stage.addChild(backLabel);

    
    stage.enableMouseOver(10);

}

function displayNode() {
    var testModels = [];

    var last = new NodeModel("MethodJ", "https://www.methodj.com/maya-2016-female-body-modeling-tutorial/");
    testModels.push(new NodeModel("modeling", [last]));

    

    testParentModel = new NodeModel("CG Animation", testModels);
    mainView = new NodeView(testParentModel, canvasWidth/2, canvasHeight/2, 0);

    stage.update();
}


class MapModel {
    constructor(name) {
        this.name = name;
        this.root = new NodeModel(name, null, false, null); // Creates root node
        this.nodes = {};
    }

    addNode(){



    }

    removeNode(){

    }

    groupUnderParent(){

    }

    upvote(){

    }

    downvote(){

    }

}


class NodeModel {
    constructor(label, content) {
        this.label = label;
        this.parent = null;
        this.content = content;

        if(typeof this.content != "string") {
            var i;
            for (i = 0; i < this.content.length; i++) {
                this.content[i].parent = this;
            }
        }
    }
}


class User {
    constructor(address, name) {
        this.address = address;
        this.name = name;
        this.prestige = 0;

    }
}


class NodeView {
    constructor(nodeModel, x, y, depth) {
        this.radius;
        if(depth == 0) {
            this.radius = bgNodeRadius;
        } else {
            this.radius = nodeRadius;
        }

        this.model = nodeModel;
        this.x = x;
        this.y = y;
        this.depth = depth;
        
        this.circle = null; //ehh

        this.renderNode();
        
        if(typeof nodeModel.content != "string") {
            

            if (this.depth < 1){ //???
                
                this.renderContent(nodeModel.content);
            }
            this.circle.addEventListener("dblclick", function(event){
                mainView = new NodeView(nodeModel, canvasWidth/2, canvasHeight/2, 0);
                stage.update();
            });
        } else {
            this.circle.addEventListener("dblclick", function(event){ // Changed to double-clicking
                window.open(nodeModel.content);
            });
        }
    }

    renderNode() {
        //background ellipse
        this.circle = new createjs.Shape();
        this.circle.graphics.beginFill("#EEFFFF").drawCircle(this.x, this.y, this.radius);
        this.circle.graphics.beginStroke("#009999").drawCircle(this.x, this.y, this.radius);
        
        //if this is not the top-level node, show pointer cursor on hover
        if(this.depth > 0) {
            this.circle.cursor = "pointer";
        }

        var label = new createjs.Text(this.model.label, "16px Georgia");
        label.x = this.x;
        label.y = this.y - 9;
        label.color = "#004444";
        label.set({textAlign:'center'});

        stage.addChild(this.circle);
        stage.addChild(label);
    }

    
    renderContent(content) {
        var rad = .6 * this.radius;
        var angle = 3 * Math.PI / 2;
        var angleIncrement = 2 * Math.PI / (content.length);
        var i;
        for (i = 0; i < content.length; i++) {
            new NodeView(content[i], this.x + rad * Math.cos(angle), this.y + rad * Math.sin(angle), this.depth + 1);
            angle += angleIncrement;
        }
    }

    updateLabel(newLabel) {

    }

    updateLocation(x, y){

    }
  }