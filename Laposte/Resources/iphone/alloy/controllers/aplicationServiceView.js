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
    this.__controllerPath = "aplicationServiceView";
    if (arguments[0]) {
        __processArg(arguments[0], "__parentSymbol");
        __processArg(arguments[0], "$model");
        __processArg(arguments[0], "__itemTemplate");
    }
    var $ = this;
    var exports = {};
    $.__views.win = Ti.UI.createWindow({
        id: "win",
        backgroundColor: "white",
        barColor: "#FFC526",
        title: "Application Services",
        translucent: "false"
    });
    $.__views.win && $.addTopLevelView($.__views.win);
    $.__views.applicationTable = Ti.UI.createTableView({
        id: "applicationTable",
        minRowHeight: "40"
    });
    $.__views.win.add($.__views.applicationTable);
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    var readContents;
    var readFile = Titanium.Filesystem.getFile(Titanium.Filesystem.resourcesDirectory, "/modules/lapostemanifestapp.json");
    if (readFile.exists()) {
        readContents = readFile.read();
        Ti.API.info("File Exists");
        var doc = readContents.text;
        Ti.API.info("Contents = " + doc);
        var jsonObject = JSON.parse(doc);
        var manifest = jsonObject["manifest"];
        var applicationServices = manifest["aplicationsservices"];
        var sections = applicationServices["sections"];
        var apps = applicationServices["app"];
        var count = sections.length;
        var appsCount = apps.length;
        var data = [];
        for (var i = 0; count > i; i++) {
            var title = sections[i].title;
            var id = sections[i].id;
            var sectionItem = Titanium.UI.createTableViewSection();
            sectionItem.headerTitle = title;
            for (var j = 0; appsCount > j; j++) {
                var app = apps[j];
                if (app["section"] == id) {
                    var row = Titanium.UI.createTableViewRow();
                    row.title = app.title;
                    row.subtitle = app.subtitle;
                    sectionItem.add(row);
                }
            }
            data.push(sectionItem);
        }
        $.applicationTable.setData(data);
    }
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;