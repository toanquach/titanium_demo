function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function handleClick(_event) {
        if ("undefined" != typeof _event.index) {
            var subMenu = cells[_event.index];
            var sUrl = subMenu.url.toString();
            if (-1 == sUrl.indexOf("html")) {
                alert("Function doesn't implement");
                return;
            }
            var arr = [];
            arr.push({
                isFromSubMenu: true
            });
            arr.push({
                menuInfo: menuInfo
            });
            arr.push({
                moduleInfo: moduleInfo
            });
            arr.push({
                subMenuInfo: subMenu
            });
            var appView = Alloy.createController("pvWebView", arr).getView();
            Alloy.Globals.nav.openWindow(appView);
        }
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "splashSubMenuView";
    if (arguments[0]) {
        __processArg(arguments[0], "__parentSymbol");
        __processArg(arguments[0], "$model");
        __processArg(arguments[0], "__itemTemplate");
    }
    var $ = this;
    var exports = {};
    $.__views.win = Ti.UI.createWindow({
        layout: "vertical",
        id: "win",
        backgroundColor: "white",
        barColor: "#FFC526",
        translucent: "false"
    });
    $.__views.win && $.addTopLevelView($.__views.win);
    $.__views.title = Ti.UI.createView({
        top: 0,
        layout: "vertical",
        height: Ti.UI.SIZE,
        width: "100%",
        id: "title"
    });
    $.__views.win.add($.__views.title);
    $.__views.imageView = Ti.UI.createImageView({
        width: "80dp",
        height: "100dp",
        bottom: "30dp",
        top: "30dp",
        id: "imageView"
    });
    $.__views.title.add($.__views.imageView);
    $.__views.tableView = Ti.UI.createTableView({
        id: "tableView"
    });
    $.__views.win.add($.__views.tableView);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    var menuInfo = args[0].menuInfo;
    var outputDirectory = Ti.Filesystem.applicationCacheDirectory + "/laposte_module";
    var inputDirectory = Ti.Filesystem.resourcesDirectory + "modules/";
    var moduleInfo;
    var item = menuInfo.item;
    var rowTitle = item.title[0];
    $.win.title = rowTitle.text;
    $.win.titleAttributes = {
        color: "#fff"
    };
    var manifestFile = Alloy.Globals.manifestFile;
    var modules = manifestFile.modules;
    var module = modules.module;
    var num = module.length;
    var allMenus = manifestFile.menu;
    var numAllMenu = allMenus.length;
    var idParent = item.id;
    for (var i = 0; num > i; i++) {
        var item = module[i];
        if (item.ref == menuInfo.module) {
            moduleInfo = item;
            var common = Titanium.Filesystem.applicationCacheDirectory + "/laposte_module/" + menuInfo.appid;
            var commonDir = Titanium.Filesystem.getFile(common);
            if (!commonDir.exists()) {
                var compression = require("ti.compression");
                var zipFileName = inputDirectory + menuInfo.appid + ".zip";
                var result = compression.unzip(outputDirectory, zipFileName, true);
                "success" == result && !Ti.Filesystem.getFile(outputDirectory, "a.txt").exists();
            }
        }
    }
    $.win.barColor = moduleInfo.navcolor;
    $.win.backgroundColor = moduleInfo.navcolor;
    var cells = [];
    for (var i = 0; numAllMenu > i; i++) {
        var item = allMenus[i];
        "1" == item.level && item.parent == idParent && cells.push(item);
    }
    var numCells = cells.length;
    var data = [];
    for (var i = 0; numCells > i; i++) {
        var cell = cells[i];
        var row = Titanium.UI.createTableViewRow();
        var item = cell.item;
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
            image: "/images/" + cell.icone
        });
        customView.add(imgView);
        var label = Ti.UI.createLabel({
            left: 80,
            height: 80,
            top: 0,
            width: 230,
            font: {
                fontFamily: "DINPro-Regular",
                fontSize: "20dp"
            }
        });
        label.text = rowTitle.text;
        customView.add(label);
        row.add(customView);
        data.push(row);
    }
    $.tableView.setData(data);
    $.tableView.removeEventListener("click", handleClick);
    $.tableView.addEventListener("click", handleClick);
    var arr = menuInfo.icone.split(".");
    $.imageView.image = "/images/" + arr[0] + "_logo.png";
    Ti.Platform.Android || $.tableView.setSeparatorInsets({
        left: 0,
        right: 0
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;