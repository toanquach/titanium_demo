var args = arguments[0] || {};

var menuInfo = args[0].menuInfo;

var outputDirectory = Ti.Filesystem.applicationCacheDirectory + '/laposte_module';
var inputDirectory = Ti.Filesystem.resourcesDirectory + 'modules/';
var moduleInfo;

/*
 * set title for window
 */
var item = menuInfo.item;
var rowTitle = item.title[0];
$.win.title = rowTitle.text;
$.win.titleAttributes = {color:'#fff'};

// check and unzip module file
var manifestFile = Alloy.Globals.manifestFile;
var modules = manifestFile.modules;
var module = modules.module;
var num = module.length;

var allMenus = manifestFile.menu;
var numAllMenu = allMenus.length;
var idParent = item.id;

for (var i = 0; i < num; i++) {
	var item = module[i];
	if (item.ref == menuInfo.module) {
		moduleInfo = item;
		var common = Titanium.Filesystem.applicationCacheDirectory + '/laposte_module/' + menuInfo.appid;
		var commonDir = Titanium.Filesystem.getFile(common);
		if (!commonDir.exists()) {
			var compression = require('ti.compression');

			var zipFileName = inputDirectory + menuInfo.appid + '.zip';
			var result = compression.unzip(outputDirectory, zipFileName, true);

			if (result == 'success') {
				if (!Ti.Filesystem.getFile(outputDirectory, 'a.txt').exists()) {
						//alert('FAIL: The unzipped a.txt does not exist!');
				} else {
					//alert('PASS: ');
				}
			}

		}
	}
}

	/*
	 * Load webview
	 */
$.win.barColor = moduleInfo.navcolor;
$.win.backgroundColor = moduleInfo.navcolor;
	

/*
 * load sub menu
 */
var cells = [];
for(var i=0; i < numAllMenu; i++)
{
	var item = allMenus[i];
	if(item.level == '1' && item.parent == idParent)
	{
		cells.push(item);
	}
}

var numCells = cells.length;
var data = [];
for(var i = 0; i < numCells; i++)
{
		var cell = cells[i];
		var row = Titanium.UI.createTableViewRow();
		var item = cell.item;
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
			image:'/images/' + cell.icone });
		customView.add(imgView);
		
		var label = Ti.UI.createLabel({left:80, height:80, top:0, width:230, font: {fontFamily: 'DINPro-Regular', fontSize: '20dp'}});
		label.text = rowTitle.text;
		//label.font = {fontFamily: 'DINPro-Regular', fontSize: '20dp'};			
		customView.add(label);
		
		// Add custom view
		row.add(customView);
		data.push(row);
} 

$.tableView.setData(data);	
$.tableView.removeEventListener("click", handleClick);
$.tableView.addEventListener("click", handleClick);


function handleClick(_event) {
	if(typeof _event.index !== "undefined")
	{
		var subMenu = cells[_event.index];
		var sUrl = subMenu.url.toString();
		if(sUrl.indexOf('html') == -1)
		{
			alert('Function doesn\'t implement');
			return;	
		}
		var arr = [];
		arr.push({
				'isFromSubMenu': true
				});
					
		arr.push({
				'menuInfo': menuInfo
			});
			
		arr.push({'moduleInfo':moduleInfo});
		
		arr.push({'subMenuInfo' : subMenu});
		// push pvwebview
		var appView = Alloy.createController('pvWebView',arr).getView();
		Alloy.Globals.nav.openWindow(appView);
	}
};

var arr = menuInfo.icone.split('.');
$.imageView.image = '/images/' + arr[0] + '_logo.png';

if(!Ti.Platform.Android)
{
	$.tableView.setSeparatorInsets({left:0, right:0});
}