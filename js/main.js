var mainMap;
var mainUser;

function init() {
    load();
}

function load() {
    // hard-code users with the account addresses in Ganache
    mainUser = new User('0x627306090abab3a6e1400e9345bc60c78a8bef57', "Ellen");
    secondUser = new User('0xf17f52151ebef6c7334fad080c5704d77216b732', "Kevin");
    thirdUser = new User('0xc5fdf4076b8f3a5357c5e395ab970b5b54098fef', "Maurice");

    // create map model with a Modeling, and MethodJ node
    var mapModel = new MapModel("CG Animation", mainUser);
    var modelingNM = mapModel.addNode(mapModel.root, new NodeModel("Modeling", [], secondUser));
    var secondUserNM = mapModel.addNode(mapModel.root, new NodeModel("secondUser", [], secondUser));
    var thirdUserNM = mapModel.addNode(mapModel.root, new NodeModel("thirdUser", [], thirdUser));
    mapModel.addNode(modelingNM, new NodeModel("MethodJ", "https://www.methodj.com/maya-2016-female-body-modeling-tutorial/", thirdUser));

    // make a view of this model
    var stage = new createjs.Stage("demoCanvas");
    var canvas = document.getElementById('demoCanvas');
    mainMap = new MapView(mapModel, stage, canvas, mainUser);

    console.log(mapModel);
}


// Key Handling

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