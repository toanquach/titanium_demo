function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function createSection() {
        var section = Ti.UI.createTableViewSection();
        var customView = Ti.UI.createView({
            height: "auto",
            backgroundColor: "#EEE",
            backgroundGradient: {
                type: "linear",
                startPoint: {
                    x: "0%",
                    y: "0%"
                },
                endPoint: {
                    x: "0%",
                    y: "100%"
                },
                colors: [ {
                    color: "#EEE",
                    offset: 0
                }, {
                    color: "#CCC",
                    offset: 1
                } ]
            }
        });
        var customLabel = Ti.UI.createLabel({
            top: 8,
            bottom: 8,
            left: 10,
            right: 10,
            height: "auto",
            text: "HEADER",
            font: {
                fontSize: 12,
                fontWeight: "bold"
            },
            color: "#666666"
        });
        customView.add(customLabel);
        section.headerView = customView;
        for (var j = 1; 4 > j; j++) {
            var args = {
                title: "Row " + j,
                customView: "view" + j,
                image: "images/ic_search.png"
            };
            section.add(Alloy.createController("menurow", args).getView());
        }
        return section;
    }
    function rowSelect() {}
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "mainView";
    if (arguments[0]) {
        __processArg(arguments[0], "__parentSymbol");
        __processArg(arguments[0], "$model");
        __processArg(arguments[0], "__itemTemplate");
    }
    var $ = this;
    var exports = {};
    $.__views.win = Ti.UI.createWindow({
        id: "win"
    });
    $.__views.win && $.addTopLevelView($.__views.win);
    $.__views.ds = Alloy.createWidget("ds.slideMenu", "widget", {
        id: "ds",
        __parentSymbol: $.__views.win
    });
    $.__views.ds.setParent($.__views.win);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var leftData = [];
    var rightData = [];
    for (var i = 0; 4 > i; i++) {
        leftData[i] = createSection();
        rightData[i] = createSection();
    }
    var menuTitles = [ {
        title: "Accueil"
    }, {
        title: "Bureaux et relais favoris"
    }, {
        title: "Recherches memorisees"
    }, {
        title: "Produits preferes"
    }, {
        title: "Suivi d_envoi en cours"
    }, {
        title: "Notifications"
    } ];
    var numCell = menuTitles.length;
    var cells = [];
    for (var i = 0; numCell > i; i++) {
        var row = Ti.UI.createTableViewRow({
            height: Ti.UI.SIZE,
            minHeight: 40
        });
        row.title = menuTitles[i].title;
        cells.push(row);
    }
    $.ds.leftTableView.data = cells;
    var currentView = Alloy.createController("view1").getView();
    $.ds.contentview.add(currentView);
    $.ds.leftTableView.addEventListener("click", function(e) {
        alert(e.index);
        rowSelect(e);
        $.ds.toggleLeftSlider();
    });
    Ti.App.addEventListener("sliderToggled", function(e) {
        if ("right" == e.direction) {
            $.ds.leftMenu.zIndex = 2;
            $.ds.rightMenu.zIndex = 1;
        } else if ("left" == e.direction) {
            $.ds.leftMenu.zIndex = 1;
            $.ds.rightMenu.zIndex = 2;
        }
    });
    var IOS7Plus = function() {
        var version = Titanium.Platform.version.split(".");
        var major = parseInt(version[0], 10);
        if (major >= 7) return true;
        return false;
    };
    var iOS7 = IOS7Plus();
    var theTop = iOS7 ? 20 : 0;
    $.win.top = theTop;
    "iphone" === Ti.Platform.osname ? $.win.open({
        transition: Titanium.UI.ANIMATION_CURVE_LINEAR
    }) : $.win.open();
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;