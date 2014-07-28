function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function handleMenuClick(_event) {
        "undefined" != typeof _event.row.id && openScreen(_event.row.id);
    }
    function openMenu() {
        $.AppWrapper.animate({
            left: "200dp",
            duration: 250,
            curve: Ti.UI.ANIMATION_CURVE_EASE_IN_OUT
        });
        $.SlideMenu.Wrapper.animate({
            left: "0dp",
            duration: 250,
            curve: Ti.UI.ANIMATION_CURVE_EASE_IN_OUT
        });
    }
    function closeMenu() {
        $.AppWrapper.animate({
            left: "0dp",
            duration: 250,
            curve: Ti.UI.ANIMATION_CURVE_EASE_IN_OUT
        });
        $.SlideMenu.Wrapper.animate({
            left: "-200dp",
            duration: 250,
            curve: Ti.UI.ANIMATION_CURVE_EASE_IN_OUT
        });
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "mainView";
    if (arguments[0]) {
        __processArg(arguments[0], "__parentSymbol");
        __processArg(arguments[0], "$model");
        __processArg(arguments[0], "__itemTemplate");
    }
    var $ = this;
    var exports = {};
    $.__views.MainWindow = Ti.UI.createWindow({
        id: "MainWindow"
    });
    $.__views.MainWindow && $.addTopLevelView($.__views.MainWindow);
    $.__views.SlideMenu = Alloy.createWidget("com.mcongrove.slideMenu", "widget", {
        id: "SlideMenu",
        __parentSymbol: $.__views.MainWindow
    });
    $.__views.SlideMenu.setParent($.__views.MainWindow);
    $.__views.AppWrapper = Ti.UI.createView({
        backgroundColor: "white",
        id: "AppWrapper"
    });
    $.__views.MainWindow.add($.__views.AppWrapper);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var nodes = [ {
        menuHeader: "My Tabs",
        id: 0,
        title: "Home",
        image: "/images/home.png"
    }, {
        id: 1,
        title: "Contact",
        image: "/images/phone.png"
    }, {
        id: 2,
        title: "Settings",
        image: "/images/gear.png"
    } ];
    $.SlideMenu.init({
        nodes: nodes,
        color: {
            headingBackground: "#000",
            headingText: "#FFF"
        }
    });
    $.SlideMenu.setIndex(0);
    $.SlideMenu.Nodes.addEventListener("click", handleMenuClick);
    $.AppWrapper.addEventListener("swipe", function(_event) {
        "right" == _event.direction ? openMenu() : "left" == _event.direction && closeMenu();
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;