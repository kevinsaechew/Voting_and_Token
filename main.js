var stage; // Stage/Canvas
const nodeRadius = 40;
const bgNodeRadius = 200; // Larger Node Radius
var canvas = document.getElementById('demoCanvas');
var canvasWidth = canvas.width;
var canvasHeight = canvas.height;
var mainView = null;

var lastClickedView = null;
//var lastCommand = null;




var button = document.getElementById("zoom-out-button");
button.addEventListener("click", function (event) {
    if (mainView != null && mainView.model.parent != null) { // "mainView.model.parent != null" to prevent console error
        console.log(mainView.model);
        mainView = new NodeView(mainView.model.parent, canvasWidth / 2, canvasHeight / 2, 0);
        stage.update();
    }
}, false);

// There's an add-link button that simply takes in a URL and creates a link node
var addLinkButton = document.getElementById("add-link-button");
addLinkButton.addEventListener("click", function (event) {
    var nodeName = "new link";
    var linkURL = document.getElementById('link-name').value;
    var newNode = new NodeModel(nodeName, linkURL);
    mainView.model.content.push(newNode);
    mainView = new NodeView(mainView.model, canvasWidth / 2, canvasHeight / 2, 0);
    stage.update();

});

// This adds a completely new node that can be clicked 
var addNodeButton = document.getElementById("add-node-button");
addNodeButton.addEventListener("click", function (event) {
    var nodeName = document.getElementById('node-name').value;
    var linkURL = [];
    var newNode = new NodeModel(nodeName, linkURL);
    newNode.parent = mainView.model; // ^^ Maybe the parent can be added to the NodeModel constructor
    mainView.model.content.push(newNode);
    mainView = new NodeView(mainView.model, canvasWidth / 2, canvasHeight / 2, 0);
    stage.update();
    console.log("here");
});

var editLabelButton = document.getElementById("edit-label-button");
editLabelButton.addEventListener("click", function (event) {
    var newLabelName = document.getElementById('label-name').value;
    //console.log(newLabelName);
    
    //TODO: Make a method that's UpdateLabelText() in the View, which updates the model
    lastClickedView.model.label= newLabelName;
    lastClickedView.label.text = newLabelName;
    stage.update();
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
    backLabel.set({ textAlign: 'center' });
    backLabel.cursor = "pointer"
    backLabel.addEventListener("click", function (event) {
        if (mainView != null && mainView.model.parent != null) { // "mainView.model.parent != null" to prevent console error
            console.log(mainView.model);
            mainView = new NodeView(mainView.model.parent, canvasWidth / 2, canvasHeight / 2, 0);
            stage.update();
        }
    }, false);

    stage.addChild(backLabel);


    stage.enableMouseOver(10);

}

function displayNode() {
    var testModels = [];

    var last = new NodeModel("MethodJ", "https://www.methodj.com/maya-2016-female-body-modeling-tutorial/");
    testModels.push(new NodeModel("First", [last]));



    testParentModel = new NodeModel("CG Animation", testModels);
    mainView = new NodeView(testParentModel, canvasWidth / 2, canvasHeight / 2, 0);

    stage.update();
}


class MapModel {
    constructor(name) {
        this.name = name;
        this.root = new NodeModel(name, null, false, null); // Creates root node
        this.nodes = {};
    }

    addNode() {



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
        if (depth == 0) {
            this.radius = bgNodeRadius;
        } else {
            this.radius = nodeRadius;
        }

        this.model = nodeModel;
        this.x = x;
        this.y = y;
        this.depth = depth;

        this.circle = new createjs.Shape(); //ehh
        this.label = new createjs.Text(this.model.label, "16px Georgia");
        // this.command = this.circle.graphics.beginStroke("#009999").command;

        var _this = this;

        this.renderNode();

        this.circle.addEventListener("click", function (event) {

            // TODO - add in ID's
            if (lastClickedView != null && lastClickedView.circle != _this.circle) {


                //displays view as deselected
                lastClickedView.circle.graphics.clear().beginStroke("#009999").drawCircle(lastClickedView.x, lastClickedView.y, lastClickedView.radius);
                lastClickedView.circle.graphics.beginFill("#EEFFFF").drawCircle(lastClickedView.x, lastClickedView.y, lastClickedView.radius);
            }

            lastClickedView = _this;

            //displays view as selected
            lastClickedView.circle.graphics.clear().beginStroke("#EE9999").drawCircle(_this.x, _this.y, _this.radius);
            lastClickedView.circle.graphics.beginFill("#EEFFFF").drawCircle(_this.x, _this.y, _this.radius);

            stage.update();
        });


        if (typeof nodeModel.content != "string") {
            if (this.depth < 1) { //???
                this.renderContent(nodeModel.content);
            }
            this.circle.addEventListener("dblclick", function (event) {
                mainView = new NodeView(nodeModel, canvasWidth / 2, canvasHeight / 2, 0);
                stage.update();
            });
        } else {
            this.circle.addEventListener("dblclick", function (event) {
                window.open(nodeModel.content);
            });
        }
    }

    renderNode() {
        //background ellipse
        //this.circle = new createjs.Shape();
        this.circle.graphics.beginFill("#EEFFFF").drawCircle(this.x, this.y, this.radius);
        this.circle.graphics.beginStroke("#009999").drawCircle(this.x, this.y, this.radius);

        //if this is not the top-level node, show pointer cursor on hover
        if (this.depth > 0) {
            this.circle.cursor = "pointer";
        }

        //var label = new createjs.Text(this.model.label, "16px Georgia");
        this.label.x = this.x;
        this.label.y = this.y - 9;
        this.label.color = "#004444";
        this.label.set({ textAlign: 'center' });

        stage.addChild(this.circle);
        stage.addChild(this.label);
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

    updateLocation(x, y) {

    }
}