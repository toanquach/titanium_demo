var leftData = [];
var rightData = [];

if (OS_IOS || OS_ANDROID) {
	//Alloy.Globals.Map = require('ti.map');
}

function createSection() {
	var section = Ti.UI.createTableViewSection();

	var customView = Ti.UI.createView({
		height : 'auto',
		backgroundColor : "#EEE",
		backgroundGradient : {
			type : "linear",
			startPoint : {
				x : "0%",
				y : "0%"
			},
			endPoint : {
				x : "0%",
				y : "100%"
			},
			colors : [{
				color : "#EEE",
				offset : 0.0
			}, {
				color : "#CCC",
				offset : 1.0
			}]
		}
	});

	var customLabel = Ti.UI.createLabel({
		top : 8,
		bottom : 8,
		left : 10,
		right : 10,
		height : 'auto',
		text : 'HEADER',
		font : {
			fontSize : 12,
			fontWeight : 'bold'
		},
		color : '#666666'
	});

	customView.add(customLabel);

	section.headerView = customView;
	for (var j = 1; j < 4; j++) {
		var args = {
			title : 'Row ' + j,
			customView : 'view' + j,
			image : "images/ic_search.png"
		};
		section.add(Alloy.createController('menurow', args).getView());
	}

	return section;
}

function rowSelect(e) {
	// if (currentView.id != e.row.customView) {
		// $.ds.contentview.remove(currentView);
		// currentView = Alloy.createController(e.row.customView).getView();
		// $.ds.contentview.add(currentView);
	// }
}

for (var i = 0; i < 4; i++) {
	leftData[i] = createSection();
	rightData[i] = createSection();
}

var menuTitles = [
    {title: 'Accueil'},
    {title: 'Bureaux et relais favoris'},
    {title: 'Recherches memorisees'},
    {title: 'Produits preferes'},
    {title: 'Suivi d_envoi en cours'},
    {title: 'Notifications'}
];

var numCell = menuTitles.length;
var cells = [];
for (var i=0; i < numCell; i++) 
{
	var row = Ti.UI.createTableViewRow({
  		height: Ti.UI.SIZE,
  		minHeight:40
	});
	row.title = menuTitles[i].title;
	
	cells.push(row);
};


// Pass data to widget leftTableView and rightTableView
$.ds.leftTableView.data = cells;
//$.ds.rightTableView.data = rightData;

var currentView = Alloy.createController("view1").getView();
$.ds.contentview.add(currentView);

// Swap views on menu item click
$.ds.leftTableView.addEventListener('click', function selectRow(e) {
	alert(e.index);
	rowSelect(e);
	$.ds.toggleLeftSlider();
});
// $.ds.rightTableView.addEventListener('click', function selectRow(e) {
	// rowSelect(e);
	// $.ds.toggleRightSlider();
// });

// Set row title highlight colour (left table view)
// var storedRowTitle = null;
// $.ds.leftTableView.addEventListener('touchstart', function(e) {
	// storedRowTitle = e.row.customTitle;
	// storedRowTitle.color = "#FFF";
// });
// $.ds.leftTableView.addEventListener('touchend', function(e) {
	// storedRowTitle.color = "#666";
// });
// $.ds.leftTableView.addEventListener('scroll', function(e) {
	// if (storedRowTitle != null)
		// storedRowTitle.color = "#666";
// });
// 
// // Set row title highlight colour (right table view)
// var storedRowTitle = null;
// $.ds.rightTableView.addEventListener('touchstart', function(e) {
	// storedRowTitle = e.row.customTitle;
	// storedRowTitle.color = "#FFF";
// });
// $.ds.rightTableView.addEventListener('touchend', function(e) {
	// storedRowTitle.color = "#666";
// });
// $.ds.rightTableView.addEventListener('scroll', function(e) {
	// if (storedRowTitle != null)
		// storedRowTitle.color = "#666";
// });

Ti.App.addEventListener("sliderToggled", function(e) {
	if (e.direction == "right") {
		$.ds.leftMenu.zIndex = 2;
		$.ds.rightMenu.zIndex = 1;
	} else if (e.direction == "left") {
		$.ds.leftMenu.zIndex = 1;
		$.ds.rightMenu.zIndex = 2;
	}
});

var IOS7Plus = function isiOS7Plus()
{
	// iOS-specific test
	if (Titanium.Platform.name == 'iPhone OS')
	{
		var version = Titanium.Platform.version.split(".");
		var major = parseInt(version[0],10);

		// Can only test this support on a 3.2+ device
		if (major >= 7)
		{
			return true;
		}
	}
	return false;
};

var iOS7 = IOS7Plus();
var theTop = iOS7 ? 20 : 0;

$.win.top = theTop;




if (Ti.Platform.osname === 'iphone')
	$.win.open({
		transition : Titanium.UI.ANIMATION_CURVE_LINEAR
	});
else
	$.win.open();
