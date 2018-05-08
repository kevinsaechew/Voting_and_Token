var mainMap;
var mainUser;

function init() {
    load();
}

function load() {
    // create a user
    mainUser = new User('0x627306090abab3a6e1400e9345bc60c78a8bef57', "Ellen");

    secondUser = new User('0xf17f52151ebef6c7334fad080c5704d77216b732', "Kevin");

    thirdUser = new User('0xc5fdf4076b8f3a5357c5e395ab970b5b54098fef', "Maurice");

    // create map model with a Modeling, and Method J node
    var mapModel = new MapModel("CG Animation", mainUser);
    var modelingNM = mapModel.addNode(mapModel.root, new NodeModel("Modeling", [], secondUser));
    mapModel.addNode(modelingNM, new NodeModel("MethodJ", "https://www.methodj.com/maya-2016-female-body-modeling-tutorial/", thirdUser));

    // make a view of this model
    var stage = new createjs.Stage("demoCanvas");
    var canvas = document.getElementById('demoCanvas');
    mainMap = new MapView(mapModel, stage, canvas, mainUser);

    console.log(mapModel);
}