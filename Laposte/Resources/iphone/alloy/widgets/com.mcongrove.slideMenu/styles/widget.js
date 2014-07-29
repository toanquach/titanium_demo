function WPATH(s) {
    var index = s.lastIndexOf("/");
    var path = -1 === index ? "com.mcongrove.slideMenu/" + s : s.substring(0, index) + "/com.mcongrove.slideMenu/" + s.substring(index + 1);
    return path;
}

module.exports = [ {
    isId: true,
    priority: 100000.001,
    key: "Wrapper",
    style: {
        width: "320dp",
        top: "0dp",
        left: "-320dp"
    }
}, {
    isId: true,
    priority: 100000.0011,
    key: "Nodes",
    style: {
        top: "0dp",
        backgroundColor: "#FFC526",
        separatorColor: "#222",
        separatorStyle: Ti.UI.iPhone.TableViewSeparatorStyle.SINGLE_LINE
    }
}, {
    isId: true,
    priority: 100000.0012,
    key: "shadowImage",
    style: {
        contentMode: "aspectfill"
    }
}, {
    isId: true,
    priority: 100000.0013,
    key: "rightView",
    style: {}
} ];