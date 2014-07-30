// --------------------------------------------
var matrix2d = Ti.UI.create2DMatrix();
matrix2d = matrix2d.rotate(180); // in degrees
var a = Ti.UI.createAnimation({
    transform: matrix2d,
    duration: 1000,
    autoreverse: true,
    repeat: 100
});

// --------------------------------------------- 
var menu = function(e){
	var mainView = Alloy.createController('mainView').getView();	

	mainView.open();
};

setTimeout(function()
{
    menu(null);
 	$.index.close();  
 	$.spiner.stop();
},2000);

// Create laposte_module
var dir=Titanium.Filesystem.applicationCacheDirectory +'/laposte_module';
var folder =Titanium.Filesystem.getFile(dir);
if(!folder.exists())
{
	folder.createDirectory(); 
}

var outputDirectory = Ti.Filesystem.applicationCacheDirectory + '/laposte_module';
var inputDirectory = Ti.Filesystem.resourcesDirectory + 'modules/';

var common = Titanium.Filesystem.applicationCacheDirectory + '/laposte_module/common';
var commonDir = Titanium.Filesystem.getFile(common);
if(!commonDir.exists())
{
	var compression = require('ti.compression');
	
	var zipFileName = inputDirectory + 'common.zip';
    var result = compression.unzip(outputDirectory, zipFileName, true);
    
    //Ti.API.info(status.text = 'Unzip: ' + result + ', to: ' + outputDirectory);

    if (result == 'success') {
        if (!Ti.Filesystem.getFile(outputDirectory, 'a.txt').exists()) 
        {
            //alert('FAIL: The unzipped a.txt does not exist!');
        }
        else
        {
            //alert('PASS: ');
        }
    }
	
}

$.spiner.animate(a);
$.index.open();
