define(['jquery', 'controller', 'view', 'model'], function($, controller, view, model){
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
		});

        $(view.controls.reset).click(model.reset);
        $(view.controls.left).click(controller.left);
        $(view.controls.right).click(controller.right);
        $(view.controls.rotate).click(controller.clockwise);
        $(view.controls.drop).click(controller.drop);
	});
});
