var args = arguments[0] || {};

var readContents;
var readFile = Titanium.Filesystem.getFile(Titanium.Filesystem.resourcesDirectory,'/modules/lapostemanifestapp.json');        
 
if (readFile.exists()) 
{
     readContents = readFile.read();
     Ti.API.info('File Exists');
     
     var doc = readContents.text;
	Ti.API.info('Contents = ' + doc);
	var jsonObject = JSON.parse(doc);
	var manifest = jsonObject['manifest'];
	var applicationServices = manifest['aplicationsservices'];
	
	var sections = applicationServices['sections'];
	var apps = applicationServices['app'];
	var count = sections.length;
	var appsCount = apps.length;
	
	var data = [];
	
	for(var i = 0; i < count; i++)
	{
		var title = sections[i].title;
		var id = sections[i].id;
		var sectionItem = Titanium.UI.createTableViewSection();
		sectionItem.headerTitle = title;
		
		for(var j = 0; j < appsCount; j++)
		{
			var app = apps[j];
			if (app['section'] == id) 
			{
				var row = Titanium.UI.createTableViewRow();
				row.title = app.title;
				row.subtitle = app.subtitle;
				sectionItem.add(row);
			};
		}
	
		data.push(sectionItem);
	} 
	
	$.applicationTable.setData(data);
}