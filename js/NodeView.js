class NodeView {
    constructor(nodeModel, x, y, depth, mapView) {
        this.mapView = mapView;
        this.radius;
        if (depth == 0) {
            this.radius = this.mapView.bgNodeRadius;
        } else {
            this.radius = this.mapView.nodeRadius;
        }

        this.model = nodeModel;
        this.x = x;
        this.y = y;
        this.depth = depth;

        this.circle = new createjs.Shape(); //ehh
        this.label = new createjs.Text(this.model.label, "16px Georgia");
        // this.command = this.circle.graphics.beginStroke("#009999").command;


        this.renderNode();

        var _this = this;
        this.circle.addEventListener("click", function (event) {
            
            
            // TODO - add in ID's
            if (_this.mapView.lastClickedView != null && _this.mapView.lastClickedView.circle != _this.circle) {


                //displays view as deselected
                _this.mapView.lastClickedView.circle.graphics.clear().beginStroke("#009999").drawCircle(_this.mapView.lastClickedView.x, _this.mapView.lastClickedView.y, _this.mapView.lastClickedView.radius);
                _this.mapView.lastClickedView.circle.graphics.beginFill("#EEFFFF").drawCircle(_this.mapView.lastClickedView.x, _this.mapView.lastClickedView.y, _this.mapView.lastClickedView.radius);
            }

            _this.mapView.lastClickedView = _this;
            

            //displays view as selected
            _this.mapView.lastClickedView.circle.graphics.clear().beginStroke("#EE9999").drawCircle(_this.x, _this.y, _this.radius);
            _this.mapView.lastClickedView.circle.graphics.beginFill("#EEFFFF").drawCircle(_this.x, _this.y, _this.radius);

            _this.mapView.stage.update();
        });


        if (typeof nodeModel.content != "string") {
            if (_this.depth < 1) { //???
                _this.renderContent(nodeModel.content);
            }
            _this.circle.addEventListener("dblclick", function (event) {
                _this.mapView.mainView = new NodeView(nodeModel, _this.mapView.canvasWidth / 2, _this.mapView.canvasHeight / 2, 0, _this.mapView);
                _this.mapView.stage.update();
            });
        } else {
            _this.circle.addEventListener("dblclick", function (event) {
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

        this.mapView.stage.addChild(this.circle);
        this.mapView.stage.addChild(this.label);
        this.mapView.stage.update();

    }


    renderContent(content) {
        var rad = .6 * this.radius;
        var angle = 3 * Math.PI / 2;
        var angleIncrement = 2 * Math.PI / (content.length);
        var i;
        for (i = 0; i < content.length; i++) {
            new NodeView(content[i], this.x + rad * Math.cos(angle), this.y + rad * Math.sin(angle), this.depth + 1, this.mapView);
            angle += angleIncrement;
        }
    }

    updateLabel(newLabel) {

    }

    updateLocation(x, y) {

    }
}