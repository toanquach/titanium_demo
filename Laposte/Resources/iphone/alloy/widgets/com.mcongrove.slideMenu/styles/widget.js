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
        width: "250dp",
        top: "0dp",
        left: "-250dp",
        backgroundColor: "#FFC526"
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
} ];