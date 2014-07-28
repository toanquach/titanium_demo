// Create our node items
var nodes = [
    { menuHeader: "My Tabs", id: 0, title: "Home", image: "/images/home.png" },
    { id: 1, title: "Contact", image: "/images/phone.png" },
    { id: 2, title: "Settings", image: "/images/gear.png" }
];

// Initialize the slide menu
$.SlideMenu.init({
    nodes: nodes,
    color: {
        headingBackground: "#000",
        headingText: "#FFF"
    }
});

// Set the first node as active
$.SlideMenu.setIndex(0);

// Add an event listener on the nodes
$.SlideMenu.Nodes.addEventListener("click", handleMenuClick);

// Handle the click event on a node
function handleMenuClick(_event) {
    if(typeof _event.row.id !== "undefined") {
        // Open the corresponding controller
        openScreen(_event.row.id);
    }
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

$.AppWrapper.addEventListener("swipe", function(_event) {
    if(_event.direction == "right") {
        openMenu();
    } else if(_event.direction == "left") {
        closeMenu();
    }
});