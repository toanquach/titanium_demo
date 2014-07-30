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
    this.__controllerPath = "cguView";
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
        title: "CGU",
        translucent: "false"
    });
    $.__views.win && $.addTopLevelView($.__views.win);
    $.__views.scrollView = Ti.UI.createScrollView({
        id: "scrollView",
        showVerticalScrollIndicator: "true",
        showHorizontalScrollIndicator: "true",
        height: "100%",
        width: "100%"
    });
    $.__views.win.add($.__views.scrollView);
    $.__views.cgu = Ti.UI.createLabel({
        text: "La Poste\nSociété anonyme au capital\nde 3.800.000.000 euros\n356 000 000 RCS PARIS\nSiège social : 44 boulevard de Vaugirard - 75757 PARIS CEDEX 15\nTél : 01 55 44 00 00\n\nDirectrice de la publication\nNathalie Andrieux\n\nDirectrice adjointe de la publication et directrice de la rédaction\nIsabelle Cambreleng\n\nConception, création et développement technique\nDigitas France - 36 rue Raspail\n92300 Levallois-Perret\nwww.digitas.fr\n\nHébergement\nOrange Business Services\nSAS au capital de 27 900 000 euros, immatriculé au RCS de Paris\nsous le n° B 442 954 962 dont le siège social est situé au :\n106 rue du Temple - 75003 Paris\nTél : 01 53 90 85 00\n\nPour contacter l’éditeur :\nDirection du Numérique \nGroupe La Poste \nCP R92 - Tour Cristal - 7 quai André Citroën 75015 Paris\n",
        id: "cgu",
        top: "10dp",
        left: "10dp",
        width: "300dp"
    });
    $.__views.scrollView.add($.__views.cgu);
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;