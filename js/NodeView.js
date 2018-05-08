var keysPressed = [],
    shiftCode = 16;

$(document).on("keyup keydown", function(e) {
    switch(e.type) {
        case "keydown" :
            keysPressed.push(e.keyCode);
            break;
        case "keyup" :
            var idx = keysPressed.indexOf(e.keyCode);
            if (idx >= 0)
                keysPressed.splice(idx, 1);
            break;
    }
});

function isKeyPressed(code) {
    return keysPressed.indexOf(code) >= 0;
}


class NodeView {
    constructor(nodeModel, x, y, depth, mapView, font) {
        this.mapView = mapView;
        
        this.model = nodeModel;

        this.defaultRadius;
        if (depth == 0) {
            this.defaultRadius = this.mapView.bgNodeRadius;
        } else {
            this.defaultRadius = this.mapView.nodeRadius;
        }
        this.radius = this.defaultRadius * 1;//this.model.weight;
        this.font = "18px Georgia";
        if(font != null) {
            this.font = font;
        }
        this.x = x;
        this.y = y;
        this.depth = depth;
        this.selectedStrokeColor = "#EE9999";
        this.normalStrokeColor = "#009999";
        if(typeof nodeModel.content == "string") {
            this.normalStrokeColor = "#FFFFFF";
        }

        this.circle = new createjs.Shape(); //ehh
        this.label = new createjs.Text(this.model.label, this.font);
        // this.command = this.circle.graphics.beginStroke("#009999").command;
        this.mapView.stage.addChild(this.circle);
        this.mapView.stage.addChild(this.label);

        this.renderNode();


        
        var _this = this;
        this.circle.addEventListener("click", function (event) {
            
            
            // TODO - add in ID's
            console.log(isKeyPressed(shiftCode));

            // if shift is pressed

            if (isKeyPressed(shiftCode) == false) {
                // deselect
                if (_this.mapView.selectedNodes.length > 0) {
                    if (_this.mapView.selectedNodes[0].circle != _this.circle) {
                        var i;
                        for(i = 0; i < _this.mapView.selectedNodes.length; i++){
                            _this.deselectNode(_this.mapView.selectedNodes[i]);
                        }
                    }
                }
                _this.mapView.selectedNodes = [];
            }

            _this.selectNode(_this);
            _this.mapView.selectedNodes.push(_this);

            _this.mapView.stage.update();
        });

        // 
        if (typeof nodeModel.content != "string") {

            if (_this.depth == 0) { //???
                _this.renderContent(nodeModel.content, .54*this.radius, "16px Georgia");
            }

            if (_this.depth == 1) { //???
                _this.renderContent(nodeModel.content, 2.1*this.radius, "12px Georgia");
            }
            // Updates the map have a mainview of the selected node and changes the stage
            _this.circle.addEventListener("dblclick", function (event) {
                _this.mapView.mainView = new NodeView(nodeModel, _this.mapView.canvasWidth / 2, _this.mapView.canvasHeight / 2, 0, _this.mapView);
                _this.mapView.stage.update();
            });
        // if the content is a string, then it opens the URL in a new tab
        } else {
            _this.circle.addEventListener("dblclick", function (event) {
                window.open(nodeModel.content);
            });
        }
    }
    
    // Selects a node and is indicated by changing its stroke color
    selectNode(nodeView) {
        this.drawNode(nodeView, nodeView.selectedStrokeColor);
    }

    deselectNode(nodeView) {
        this.drawNode(nodeView, nodeView.normalStrokeColor);
    }

    // Draws a circle representing the node
    drawNode(nodeView, strokeColor) {
        nodeView.circle.graphics.clear().beginFill("#EEFFFF").drawCircle(nodeView.x, nodeView.y, nodeView.radius);
        nodeView.circle.graphics.beginStroke(strokeColor).drawCircle(nodeView.x, nodeView.y, nodeView.radius);
    }

    renderNode() {
        //background ellipse
        //this.circle = new createjs.Shape();

        this.radius = this.defaultRadius * this.model.weight;

        this.drawNode(this, this.normalStrokeColor);

        //if this is not the top-level node, show pointer cursor on hover
        if (this.depth > 0) {
            this.circle.cursor = "pointer";
        }

        //var label = new createjs.Text(this.model.label, "16px Georgia");
        this.label.x = this.x;
        this.label.y = this.y - 9;
        this.label.color = "#004444";
        this.label.set({ textAlign: 'center' });

        
        this.mapView.stage.update();

    }

    // Renders the content of a node by creating new NodeViews in a circular fashion for the NodeModels that are stored
    renderContent(content, rad, font) {
        if(rad == null) {
            rad = .42 * this.radius;
        }
        var angle = 3 * Math.PI / 2;
        var angleIncrement = 2 * Math.PI / (content.length);
        var i;
        for (i = 0; i < content.length; i++) {
            new NodeView(content[i], this.x + rad * Math.cos(angle), this.y + rad * Math.sin(angle), this.depth + 1, this.mapView, font);
            angle += angleIncrement;
        }
    }

    updateLabel(newLabel) {

    }

    updateLocation(x, y) {

    }

    delete() {
        if (typeof this.model.content == "string") {
            this.mapView.stage.removeChild(this.circle);
            this.mapView.stage.removeChild(this.label);
            if(this.model.parent != null){
                this.model.parent.delete(this.model);
            }
            
        }
    }
}