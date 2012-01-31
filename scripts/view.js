define(['jquery', 'model'], function($, model){
	var tetreq = $("<div class='board'></div>");
	var score = $("<div class='score'></div>");
	var cleared = $("<div class='cleared'></div>");
	$.fn.tetreq = function(){
		this.append(tetreq);
		this.append(score);
		this.append(cleared);
		for(var y=0;y<model.board.length;y++)
		{
			var row = $('<div></div>')
			for(var x=0;x<model.board[y].length;x++)
			{
				var cel = $("<div class='cell'></div>");
				row.append(cel);
			}
			tetreq.append(row);
		}
	}

	return {
        	update: function(){
			score.text("Score: " + model.score);
			cleared.text("Cleared: " + model.cleared);
			for(var piece in model.pieces)
				$('.cell', tetreq).removeClass('block' + model.pieces[piece]);
			var els = $(tetreq).children();
			if(els.length==0) return;
			for(var y=0;y<model.board.length;y++)
			{
				var row = els[y];
				var children = $(row).children();
				for(var x=0;x<model.board[y].length;x++)
				{
					if(model.board[y][x])
						$(children[x]).addClass('block' + model.board[y][x]);
				}
			}
			for(var ix in model.falling)
			{
				var cel = model.falling[ix]; // [y,x]
				var row = els[cel[0]];
				var children = $(row).children();
				var child = children[cel[1]];
				$(child).addClass('block' + model.fallingType);
			}
		}
	};
});
