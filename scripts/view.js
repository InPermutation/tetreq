define(['jquery', 'model'], function($, model){
	var tetreq = $("<div class='board'></div>")
	$.fn.tetreq = function(){
		this.append(tetreq);
	}

	return {
        	update: function(){
			tetreq.empty();
			var board = model.board;
			for(var y=0;y<board.length;y++)
			{
				var row = $('<div></div>')
				for(var x=0;x<board[y].length;x++)
				{
					var cel = $("<div class='cell'></div>");
					if(board[y][x])
						cel.addClass('block' + board[y][x]);
					row.append(cel);
				}
				tetreq.append(row);
			}
		}
	};
});
