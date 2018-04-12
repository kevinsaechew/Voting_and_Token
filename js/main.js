var mainMap;
var user;

function init() {
    load();
}

function load() {
    // create a user
    user = new User("0xa3hc349202913cd2f282", "Ellen");

    // create map model with a Modeling, and Method J node
    var mapModel = new MapModel("CG Animation", user);
    var modelingNM = mapModel.addNode(mapModel.root, new NodeModel("Modeling", []));
    mapModel.addNode(modelingNM, new NodeModel("MethodJ", "https://www.methodj.com/maya-2016-female-body-modeling-tutorial/"));

    // make a view of this model
    var stage = new createjs.Stage("demoCanvas");
    var canvas = document.getElementById('demoCanvas');
    mainMap = new MapView(mapModel, stage, canvas);
}