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
    this.__controllerPath = "menurow";
    if (arguments[0]) {
        __processArg(arguments[0], "__parentSymbol");
        __processArg(arguments[0], "$model");
        __processArg(arguments[0], "__itemTemplate");
    }
    var $ = this;
    var exports = {};
    $.__views.row = Ti.UI.createTableViewRow({
        id: "row",
        backgroundColor: "#FFC526"
    });
    $.__views.row && $.addTopLevelView($.__views.row);
    $.__views.icon = Ti.UI.createImageView({
        id: "icon"
    });
    $.__views.row.add($.__views.icon);
    $.__views.__alloyId0 = Ti.UI.createView({
        id: "__alloyId0"
    });
    $.__views.row.add($.__views.__alloyId0);
    $.__views.title = Ti.UI.createLabel({
        id: "title"
    });
    $.__views.__alloyId0.add($.__views.title);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    $.icon.image = args.image;
    $.title.text = args.title || "";
    $.row.customView = args.customView || "";
    $.row.customTitle = $.title;
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;