function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "index";
    if (arguments[0]) {
        __processArg(arguments[0], "__parentSymbol");
        __processArg(arguments[0], "$model");
        __processArg(arguments[0], "__itemTemplate");
    }
    var $ = this;
    var exports = {};
    $.__views.index = Ti.UI.createWindow({
        backgroundColor: "white",
        id: "index"
    });
    $.__views.index && $.addTopLevelView($.__views.index);
    $.__views.splashImage = Ti.UI.createImageView({
        id: "splashImage",
        image: "Default-568h@2x.png"
    });
    $.__views.index.add($.__views.splashImage);
    $.__views.spiner = Ti.UI.createImageView({
        id: "spiner",
        image: "images/loading.png",
        height: "40",
        width: "40",
        top: "400"
    });
    $.__views.index.add($.__views.spiner);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var matrix2d = Ti.UI.create2DMatrix();
    matrix2d = matrix2d.rotate(180);
    var a = Ti.UI.createAnimation({
        transform: matrix2d,
        duration: 1e3,
        autoreverse: true,
        repeat: 100
    });
    var menu = function() {
        var menuView = Alloy.createController("mainView").getView();
        menuView.open();
    };
    setTimeout(function() {
        menu(null);
        $.index.close();
    }, 2e3);
    $.spiner.animate(a);
    $.index.open();
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;