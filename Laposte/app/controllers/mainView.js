// Create our node items
var nodes = [
    { menuHeader: "My Tabs", id: 0, title: "Accueil", image: "/images/ic_home.png" },
    { id: 1, title: "Bureaux \nfavoris", image: "/images/ic_star.png" },
    { id: 2, title: "Calculs de tarifs mémorisés", image: "/images/ic_search.png" },
    { id: 3, title: "Suivi d’envoi \nen cours", image: "/images/ic_send_mail.png" },
    { id: 4, title: "Notifications", image: "/images/ic_notification.png" },
    { id: 5, title: "Visite guidée", image: "/images/icon_visite_guidee.png" }
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
