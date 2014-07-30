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
    this.__controllerPath = "pvWebView";
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
        bottom: "20dp",
        top: "20dp",
        id: "imageView",
        image: "/images/lexique_sub_icon.png"
    });
    $.__views.title.add($.__views.imageView);
    $.__views.webview = Ti.UI.createWebView({
        bottom: 0,
        width: "100%",
        id: "webview"
    });
    $.__views.win.add($.__views.webview);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    var isFromSubMenu = args[0].isFromSubMenu;
    var menuInfo = args[1].menuInfo;
    var outputDirectory = Ti.Filesystem.applicationCacheDirectory + "/laposte_module";
    var inputDirectory = Ti.Filesystem.resourcesDirectory + "modules/";
    var moduleInfo;
    var item = menuInfo.item;
    var rowTitle = item.title[0];
    $.win.title = rowTitle.text;
    $.win.titleAttributes = {
        color: "#fff"
    };
    if (false == isFromSubMenu) {
        var manifestFile = Alloy.Globals.manifestFile;
        var modules = manifestFile.modules;
        var module = modules.module;
        var num = module.length;
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
        var htmlFile = Titanium.Filesystem.applicationCacheDirectory + "/laposte_module/" + menuInfo.appid + "/" + menuInfo.url;
        $.webview.url = htmlFile;
        $.win.barColor = moduleInfo.navcolor;
        $.win.backgroundColor = moduleInfo.navcolor;
    } else {
        moduleInfo = args[2].moduleInfo;
        var subMenuInfo = args[3].subMenuInfo;
        var htmlFile = Titanium.Filesystem.applicationCacheDirectory + "/laposte_module/" + menuInfo.appid + "/" + subMenuInfo.url;
        $.webview.url = htmlFile;
        $.win.barColor = moduleInfo.navcolor;
        $.win.backgroundColor = moduleInfo.navcolor;
        $.win.remove($.title);
        $.webview.top = 0;
    }
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;