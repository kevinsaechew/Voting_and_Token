var mainMap;
var mainUser;

function init() {
    load();
}

function load() {
    // Creates three users
    mainUser = new User('0x627306090abab3a6e1400e9345bc60c78a8bef57', "Ellen");

    secondUser = new User('0xf17f52151ebef6c7334fad080c5704d77216b732', "Kevin");

    thirdUser = new User('0xc5fdf4076b8f3a5357c5e395ab970b5b54098fef', "Maurice");

    // Creates the root node as well as a CG Animation and MethodJ node to start with
    var mapModel = new MapModel("CG Animation", mainUser);
    var modelingNM = mapModel.addNode(mapModel.root, new NodeModel("Modeling", [], secondUser));
    var secondUserNM = mapModel.addNode(mapModel.root, new NodeModel("secondUser", [], secondUser));
    var thirdUserNM = mapModel.addNode(mapModel.root, new NodeModel("thirdUser", [], thirdUser));
    mapModel.addNode(modelingNM, new NodeModel("MethodJ", "https://www.methodj.com/maya-2016-female-body-modeling-tutorial/", thirdUser));

    // make a view of this model
    var stage = new createjs.Stage("demoCanvas");
    var canvas = document.getElementById('demoCanvas');
    mainMap = new MapView(mapModel, stage, canvas, mainUser);

    // console.log(mapModel);
}