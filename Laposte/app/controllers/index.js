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
},2000);


$.spiner.animate(a);
$.index.open();
