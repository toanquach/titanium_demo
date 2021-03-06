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
        if ("undefined" != typeof _event.row.id) {
            Ti.API.info(_event.row.id);
            alert("menu clicked: " + _event.row.id);
            $.SlideMenu.setIndex(_event.row.id);
        }
    }
    function openMenu() {
        $.AppWrapper.animate({
            left: "245dp",
            duration: 250,
            curve: Ti.UI.ANIMATION_CURVE_EASE_IN_OUT
        });
        $.SlideMenu.Wrapper.animate({
            left: "0dp",
            duration: 250,
            curve: Ti.UI.ANIMATION_CURVE_EASE_IN_OUT
        });
        $.SlideMenu.isCloseMenu = false;
    }
    function closeMenu() {
        $.AppWrapper.animate({
            left: "0dp",
            duration: 250,
            curve: Ti.UI.ANIMATION_CURVE_EASE_IN_OUT
        });
        $.SlideMenu.Wrapper.animate({
            left: "-320dp",
            duration: 250,
            curve: Ti.UI.ANIMATION_CURVE_EASE_IN_OUT
        });
        $.SlideMenu.isCloseMenu = true;
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
        id: "MainWindow",
        backgroundColor: "white",
        barColor: "#FFC526",
        title: "Laposte",
        translucent: "false"
    });
    $.__views.AppWrapper = Ti.UI.createView({
        backgroundColor: "white",
        id: "AppWrapper"
    });
    $.__views.MainWindow.add($.__views.AppWrapper);
    $.__views.SlideMenu = Alloy.createWidget("com.mcongrove.slideMenu", "widget", {
        id: "SlideMenu",
        __parentSymbol: $.__views.MainWindow
    });
    $.__views.SlideMenu.setParent($.__views.MainWindow);
    $.__views.nav = Ti.UI.iOS.createNavigationWindow({
        window: $.__views.MainWindow,
        id: "nav"
    });
    $.__views.nav && $.addTopLevelView($.__views.nav);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var nodes = [ {
        menuHeader: "",
        id: 0,
        title: "Accueil",
        image: "/images/ic_home.png"
    }, {
        id: 1,
        title: "Bureaux favoris",
        image: "/images/ic_star.png"
    }, {
        id: 2,
        title: "Calculs de \ntarifs mémorisés",
        image: "/images/ic_search.png"
    }, {
        id: 3,
        title: "Suivi d’envoi \nen cours",
        image: "/images/ic_send_mail.png"
    }, {
        id: 4,
        title: "Notifications",
        image: "/images/ic_notification.png"
    }, {
        id: 5,
        title: "Visite guidée",
        image: "/images/icon_visite_guidee.png"
    } ];
    Ti.Platform.Android || ($.AppWrapper.width = "320");
    $.SlideMenu.init({
        nodes: nodes,
        color: {
            headingBackground: "#FFC526",
            headingText: "#FFF"
        }
    });
    $.SlideMenu.isCloseMenu = true;
    $.SlideMenu.setIndex(0);
    $.SlideMenu.Nodes.addEventListener("click", handleMenuClick);
    Alloy.Globals.openMenu = function() {
        $.AppWrapper.animate({
            left: "245dp",
            duration: 250,
            curve: Ti.UI.ANIMATION_CURVE_EASE_IN_OUT
        });
        $.SlideMenu.Wrapper.animate({
            left: "0dp",
            duration: 250,
            curve: Ti.UI.ANIMATION_CURVE_EASE_IN_OUT
        });
        $.SlideMenu.isCloseMenu = false;
    };
    Alloy.Globals.closeMenu = function() {
        $.AppWrapper.animate({
            left: "0dp",
            duration: 250,
            curve: Ti.UI.ANIMATION_CURVE_EASE_IN_OUT
        });
        $.SlideMenu.Wrapper.animate({
            left: "-320dp",
            duration: 250,
            curve: Ti.UI.ANIMATION_CURVE_EASE_IN_OUT
        });
        $.SlideMenu.isCloseMenu = true;
    };
    $.AppWrapper.addEventListener("swipe", function(_event) {
        "right" == _event.direction ? openMenu() : "left" == _event.direction && closeMenu();
    });
    var menuButton = Ti.UI.createButton({
        backgroundImage: "/images/menu_black.png",
        image: "/images/menu_black.png",
        toggle: false
    });
    $.MainWindow.setLeftNavButton(menuButton);
    menuButton.addEventListener("click", function() {
        true == $.SlideMenu.isCloseMenu ? openMenu() : closeMenu();
    });
    var mainMenuView = Alloy.createController("mainMenuView").getView();
    $.AppWrapper.add(mainMenuView);
    Alloy.Globals.nav = $.nav;
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;