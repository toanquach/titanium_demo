var args = arguments[0] || {};

/*
 * 
 * Read json manifest and create tableviewcell
 * 
 */
var readContents;
var readFile = Titanium.Filesystem.getFile(Titanium.Filesystem.resourcesDirectory,'/modules/lapostemanifestapp.json');        
 
if (readFile.exists()) 
{
    readContents = readFile.read();
     
    var doc = readContents.text;
	var jsonObject = JSON.parse(doc);
	var manifest = jsonObject.manifest;
	var allMenus = manifest.menu;
	var menus = [];
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
		
		/*
		 * Add Menu Event
		 */
		customView.addEventListener('click', function(){
			if(menuInfo.moneid == 'lex')
			{
				
			}
		});
	} 
	
	$.mainMenuTable.setData(data);
}

if(!Ti.Platform.Android)
{
	$.mainMenuTable.setSeparatorInsets({left:0, right:0});
}
