var args = arguments[0] || {};
var isFromSubMenu = args[0].isFromSubMenu;
var menuInfo = args[1].menuInfo;

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

if (isFromSubMenu == false) {
	// check and unzip module file
	var manifestFile = Alloy.Globals.manifestFile;
	var modules = manifestFile.modules;
	var module = modules.module;
	var num = module.length;

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
	var htmlFile = Titanium.Filesystem.applicationCacheDirectory + '/laposte_module/' + menuInfo.appid + '/' + menuInfo.url;
	$.webview.url = htmlFile;

	$.win.barColor = moduleInfo.navcolor;
	$.win.backgroundColor = moduleInfo.navcolor;
}
else
{
	moduleInfo = args[2].moduleInfo;
	var subMenuInfo = args[3].subMenuInfo;
	
	var htmlFile = Titanium.Filesystem.applicationCacheDirectory + '/laposte_module/' + menuInfo.appid + '/' + subMenuInfo.url;
	$.webview.url = htmlFile;
	
	$.win.barColor = moduleInfo.navcolor;
	$.win.backgroundColor = moduleInfo.navcolor;
	
	$.win.remove($.title);
	$.webview.top = 0;
}
