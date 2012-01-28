define(['model', 'view'], function(model, view){
	var tick = function(){
		view.update();
	};
	tick();
	return setInterval(tick, 32);
});
