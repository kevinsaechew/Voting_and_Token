var mainMap;

function init() {
    load();
}

function load() {
    // create map model with a Modeling, and Method J node
    var mapModel = new MapModel("CG Animation");
    var modelingNM = mapModel.addNode(mapModel.root, new NodeModel("Modeling", []));
    mapModel.addNode(modelingNM, new NodeModel("MethodJ", "https://www.methodj.com/maya-2016-female-body-modeling-tutorial/"));

    // make a view of this model
    var stage = new createjs.Stage("demoCanvas");
    var canvas = document.getElementById('demoCanvas');
    mainMap = new MapView(mapModel, stage, canvas);
}