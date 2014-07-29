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
    this.__controllerPath = "mainMenuView";
    if (arguments[0]) {
        __processArg(arguments[0], "__parentSymbol");
        __processArg(arguments[0], "$model");
        __processArg(arguments[0], "__itemTemplate");
    }
    var $ = this;
    var exports = {};
    $.__views.mainMenuTable = Ti.UI.createTableView({
        id: "mainMenuTable",
        width: "320",
        backgroundColor: "transparent"
    });
    $.__views.mainMenuTable && $.addTopLevelView($.__views.mainMenuTable);
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    var readContents;
    var readFile = Titanium.Filesystem.getFile(Titanium.Filesystem.resourcesDirectory, "/modules/lapostemanifestapp.json");
    if (readFile.exists()) {
        readContents = readFile.read();
        var doc = readContents.text;
        var jsonObject = JSON.parse(doc);
        var manifest = jsonObject.manifest;
        var allMenus = manifest.menu;
        var menus = [];
        var data = [];
        var countAllMenus = allMenus.length;
        for (var i = 0; countAllMenus > i; i++) {
            var item = allMenus[i];
            "0" == item.level && menus.push(item);
        }
        Ti.API.info("num cell: " + menus.length);
        var countMainMenu = menus.length;
        for (var i = 0; countMainMenu > i; i++) {
            var menuInfo = menus[i];
            var row = Titanium.UI.createTableViewRow();
            var item = menuInfo.item;
            var rowTitle = item.title[0];
            Ti.API.info("Menu Info: " + rowTitle.text);
            var customView = Ti.UI.createView({
                left: 0,
                top: 0,
                height: 80
            });
            var imgView = Ti.UI.createImageView({
                left: 10,
                top: 10,
                width: 60,
                height: 60,
                image: "/images/preparer_un_envoi_map.png"
            });
            customView.add(imgView);
            var label = Ti.UI.createLabel({
                left: 80,
                height: 30,
                top: 25,
                width: 230
            });
            label.text = rowTitle.text;
            label.font = "{fontFamily: 'DINPro-Regular', fontSize: 44}";
            customView.add(label);
            row.add(customView);
            data.push(row);
        }
        $.mainMenuTable.setData(data);
    }
    Ti.Platform.Android || $.mainMenuTable.setSeparatorInsets({
        left: 0,
        right: 0
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;