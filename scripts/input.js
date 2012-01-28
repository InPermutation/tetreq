define(['jquery', 'controller'], function($, controller){
	$(function(){
		$('body').keydown(function(ev){
			var keycode = ev.keyCode;
			switch(keycode){
				case 65: //A
				case 37: //left arrow
					controller.left();
					break;
				case 68: //D
				case 39: // right arrow
					controller.right();
					break;
				case 83: //S
				case 40: // down arrow
					controller.down();
					break;
				case 87:// W
				case 38:// up arrow
					controller.clockwise();
					break;
				case 32: // space
					controller.drop();
					break;
			}
		})
	});
});
