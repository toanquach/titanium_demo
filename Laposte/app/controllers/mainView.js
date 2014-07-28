// Create our node items
var nodes = [
    { menuHeader: "", id: 0, title: "Accueil", image: "/images/ic_home.png" },
    { id: 1, title: "Bureaux \nfavoris", image: "/images/ic_star.png" },
    { id: 2, title: "Calculs de tarifs mémorisés", image: "/images/ic_search.png" },
    { id: 3, title: "Suivi d’envoi \nen cours", image: "/images/ic_send_mail.png" },
    { id: 4, title: "Notifications", image: "/images/ic_notification.png" },
    { id: 5, title: "Visite guidée", image: "/images/icon_visite_guidee.png" }
];

var isMenuClose = true;

// Initialize the slide menu
$.SlideMenu.init({
    nodes: nodes,
    color: {
        headingBackground: "#FFC526",
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
        //openScreen(_event.row.id);
        Ti.App.Info(_event.row,id);
    }
}

function openMenu() {
    $.AppWrapper.animate({
        left: "250dp",
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
        left: "-250dp",
        duration: 250,
        curve: Ti.UI.ANIMATION_CURVE_EASE_IN_OUT
    });
}

$.AppWrapper.addEventListener("swipe", function(_event) {
    if(_event.direction == "right") {
        openMenu();
        isMenuClose = false;
    } else if(_event.direction == "left") {
        closeMenu();
        isMenuClose = true;
    }
});


/*
 * Set up left nav bar for NAV
 */
var menuButton = Ti.UI.createButton({
    backgroundImage :'/images/menu_black.png', //menu_black.png
    image : '/images/menu_black.png',
    toggle:false // Custom property for menu toggle
});

if (!OS_ANDROID) {
	$.MainWindow.setLeftNavButton(menuButton);	
};


// Add event for menu button
menuButton.addEventListener('click', function(e)
{
	 if(isMenuClose == true) {
        openMenu();
        isMenuClose = false;
    } else if(isMenuClose == false) {
        closeMenu();
        isMenuClose = true;
    }
});


var mainMenuView = Alloy.createController('mainMenuView').getView();
$.AppWrapper.add(mainMenuView);


