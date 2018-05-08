class MapView {
    constructor(mapModel, stage, canvas, currUser) {
        this.model = mapModel;
        this.stage = stage;
        this.mainView = null;
        this.canvas = canvas;
        this.canvasWidth = canvas.width;
        this.canvasHeight = canvas.height;
        this.nodeRadius = 40;
        this.bgNodeRadius = 280; // Larger Node Radius
        
        this.selectedNodes = [];
        this.mapView = this;
        this.currUser = currUser;
        this.mainFont = "24px Georgia";
        this.loadMapView();
    }

    loadMapView() {
        this.createBackButton();
        this.stage.enableMouseOver(10);

        this.mainView = new NodeView(this.model.root, this.canvasWidth / 2, this.canvasHeight / 2, 0, this.mapView, this.mainFont);
        
        this.addButtons();
        this.stage.update();
    }



    addButtons() {
        var _this = this;
        var button = document.getElementById("zoom-out-button");
        
        button.addEventListener("click", function (event) {
            if (_this.mainView != null && _this.mainView.model.parent != null) { // "mainView.model.parent != null" to prevent console error
                _this.mainView = new NodeView(_this.mainView.model.parent, _this.canvasWidth / 2, _this.canvasHeight / 2, 0, _this.mapView, _this.mainFont);
                _this.stage.update();
            }
        }, false);
    
        // There's an add-link button that simply takes in a URL and creates a link node
        var addLinkButton = document.getElementById("add-link-button");
        addLinkButton.addEventListener("click", function (event) {
            var nodeName = "new link";
            var linkURL = document.getElementById('link-name').value;
            var newNode = new NodeModel(nodeName, linkURL, _this.currUser);
            _this.mainView.model.addNode(newNode);
            _this.mainView = new NodeView(_this.mainView.model, _this.canvasWidth / 2, _this.canvasHeight / 2, 0, _this.mapView, _this.mainFont);
            _this.stage.update();
    
        });
    
        // _this adds a completely new node that can be clicked 
        var addNodeButton = document.getElementById("add-node-button");
        addNodeButton.addEventListener("click", function (event) {
            var nodeName = document.getElementById('node-name').value;
            var content = [];
            var newNode = new NodeModel(nodeName, content, _this.currUser);
            newNode.parent = _this.mainView.model; // ^^ Maybe the parent can be added to the NodeModel constructor
            _this.mainView.model.addNode(newNode);
            _this.mainView = new NodeView(_this.mainView.model, _this.canvasWidth / 2, _this.canvasHeight / 2, 0, _this.mapView, _this.mainFont);
            _this.stage.update();
        });

        // this removes a selected node
        var deleteNodeButton = document.getElementById("delete-node-button");
        deleteNodeButton.addEventListener("click", function (event) {
            var i;
            for(i = 0; i < _this.selectedNodes.length; i++){
                _this.selectedNodes[i].delete();
                _this.model.removeNode(_this.selectedNodes[i].model);
            }
            _this.stage.update();
        });

        // this removes a selected node
        var groupNodeButton = document.getElementById("group-node-button");
        groupNodeButton.addEventListener("click", function (event) {
            var contentNodes = [];
            var i;
            for(i = 0; i < _this.selectedNodes.length; i++){
                contentNodes.push(_this.selectedNodes[i]);
                _this.selectedNodes[i].delete();
                _this.model.removeNode(_this.selectedNodes[i].model);
            }
            _this.stage.update();
        });
    
        var editLabelButton = document.getElementById("edit-label-button");
        editLabelButton.addEventListener("click", function (event) {
            var newLabelName = document.getElementById('label-name').value;
            //console.log(newLabelName);
    
            //TODO: Make a method that's UpdateLabelText() in the View, which updates the model
            var i;
            for(i = 0; i < _this.selectedNodes.length; i++){
                _this.selectedNodes[i].model.label = newLabelName;
                _this.selectedNodes[i].label.text = newLabelName;
            }
            
            _this.stage.update();
        });

        var upvoteButton = document.getElementById("Upvote-button");
        upvoteButton.addEventListener("click", function (event) {
            var i;
            for(i = 0; i < _this.selectedNodes.length; i++){
                _this.selectedNodes[i].model.upvote();
                _this.selectedNodes[i].renderNode();
            }
            _this.stage.update();
        });

        var downvoteButton = document.getElementById("Downvote-button");
        downvoteButton.addEventListener("click", function (event) {
            var i;
            for(i = 0; i < _this.selectedNodes.length; i++){
                _this.selectedNodes[i].model.downvote();
                _this.selectedNodes[i].renderNode();
            }
            _this.stage.update();
        });
    }
    createBackButton() {
        var backLabel = new createjs.Text("back", "Bold 16px Arial");
        backLabel.x = this.canvas.width / 2;
        backLabel.y = 50;
        backLabel.color = "#558888";
        backLabel.set({ textAlign: 'center' });
        backLabel.cursor = "pointer";
        var _this = this;
        backLabel.addEventListener("click", function (event) {
            if (_this.mainView != null && _this.mainView.model.parent != null) { // "_this.mainView.model.parent != null" to prevent console error
                _this.mainView = new NodeView(_this.mainView.model.parent, _this.canvasWidth / 2, _this.canvasHeight / 2, 0, _this.mapView, "24px Georgia");
                _this.stage.update();
            }
        }, false);

        this.stage.addChild(backLabel);
    }
}