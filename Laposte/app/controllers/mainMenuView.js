var args = arguments[0] || {};

/*
 * 
 * Read json manifest and create tableviewcell
 * 
 */
var readContents;
var readFile = Titanium.Filesystem.getFile(Titanium.Filesystem.resourcesDirectory,'/modules/lapostemanifestapp.json');        
var menus = [];
 
if (readFile.exists()) 
{
    readContents = readFile.read();
     
    var doc = readContents.text;
	var jsonObject = JSON.parse(doc);
	var manifest = jsonObject.manifest;
	
	Alloy.Globals.manifestFile = manifest;
	
	var allMenus = manifest.menu;
	
	var data = [];
	var countAllMenus = allMenus.length;
	
	for(var i=0; i<countAllMenus; i++)
	{
		var item = allMenus[i];
		if (item.level == "0") 
		{
			menus.push(item);
		}
	}
	
	/*
	 * 
	 *  Create tableviewcell
	 */
	Ti.API.info('num cell: ' + menus.length);
	
	var countMainMenu = menus.length;
	for(var i = 0; i < countMainMenu; i++)
	{
		var menuInfo = menus[i];
		var row = Titanium.UI.createTableViewRow();
		var item = menuInfo.item;
		var rowTitle = item.title[0];
		Ti.API.info('Menu Info: ' + rowTitle.text);
	
		//row.title = rowTitle.text;
		var customView = Ti.UI.createView(
			{
				left:0,
				top:0,
				height:80	
			}
		);
		
		var imgView = Ti.UI.createImageView({ 
			left:10, 
			top:10, 
			width:60, 
			height:60, 
			image:'/images/' + menuInfo.icone });
		customView.add(imgView);
		
		var label = Ti.UI.createLabel({left:80, height:30, top:25, width:230, font: {fontFamily: 'DINPro-Regular', fontSize: '20dp'}});
		label.text = rowTitle.text;
		//label.font = {fontFamily: 'DINPro-Regular', fontSize: '20dp'};
		customView.add(label);
		
		// Add custom view
		row.add(customView);
		data.push(row);
	} 
	
	$.mainMenuTable.setData(data);
	
	
	$.mainMenuTable.removeEventListener("click", handleClick);
	$.mainMenuTable.addEventListener("click", handleClick);
}

function handleClick(_event) {
	if(typeof _event.index !== "undefined")
	{
		var menuInfo = menus[_event.index];
		var jsonNode = menuInfo.jsonnode;
			Ti.API.info(menuInfo.jsonnode);
			if(jsonNode != '')
			{
				// push CGU, Application Service
				if(jsonNode == 'aplicationsservices')
				{
					var appView = Alloy.createController('aplicationServiceView').getView();
					Alloy.Globals.nav.openWindow(appView);
				}
				else
				{
					var appView = Alloy.createController('cguView').getView();
					Alloy.Globals.nav.openWindow(appView);
				}
			}
			else
			{
				var targetLevel = menuInfo.targetlevel;
				if(targetLevel == '')
				{
					var arr = [];
					arr.push({
					'isFromSubMenu': false
					});
					
					arr.push({
						'menuInfo': menuInfo
					});
					//alert(arr);
					// push pvwebview
					var appView = Alloy.createController('pvWebView',arr).getView();
					Alloy.Globals.nav.openWindow(appView);
				}
				else
				{
					// push submenu
					var arr = [];
					arr.push({
						'menuInfo': menuInfo
					});
					// push pvwebview
					var appView = Alloy.createController('splashSubMenuView',arr).getView();
					Alloy.Globals.nav.openWindow(appView);
				}
			}
	}
};


if(!Ti.Platform.Android)
{
	$.mainMenuTable.setSeparatorInsets({left:0, right:0});
}
