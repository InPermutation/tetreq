define(['jquery', 'model'], function($, model){
    var controls = {
	    tetreq: $("<div class='board'></div>"),
	    score: $("<div class='score'></div>"),
	    cleared: $("<div class='cleared'></div>"),
	    next: $("<div class='next'></div>"),
        reset: $("<div class='reset'>Reset</div>")
    };

	$.fn.tetreq = function(){
        for(k in controls)
            this.append(controls[k]);
        for(var y=0;y<model.board.length;y++)
		{
			var row = $('<div></div>')
			for(var x=0;x<model.board[y].length;x++)
			{
				var cel = $("<div class='cell'></div>");
				row.append(cel);
			}
			controls.tetreq.append(row);
		}
		for(var y=0;y<2;y++)
		{
			var row = $('<div></div>');
			for(var x=0;x<4;x++)
			{
				var cel = $("<div class='cell'></div>");
				row.append(cel);
			}
			controls.next.append(row);
		}
	}

	return {
        	update: function(){
			controls.score.text("Score: " + model.score);
			controls.cleared.text("Cleared: " + model.cleared);
			for(var piece in model.pieces){
				$('.cell', controls.tetreq).removeClass('block' + model.pieces[piece]);
				$('.cell', controls.next).removeClass('block' + model.pieces[piece]);
			}
			var els = $(controls.tetreq).children();
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
			var els = controls.next.children();
			var M = Math.floor(model.width / 2);
			for(var y=0;y<2;y++)
			{
				var row = els[y];
				var children = $(row).children();
				for(var i in model.next)
				{
					var b = model.next[i];
					if(b[0] == y)
						$(children[b[1]-M+1]).addClass('block'+ model.nextType);
				}
			}
		},
        controls: controls
	};
});
