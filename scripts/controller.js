define(['model', 'view'], function(model, view){
	var spawnNew = function(){
		var piece = model.pieces[Math.floor(Math.random() * model.pieces.length)];
		var M = Math.floor(model.width/2);
		model.fallingType = piece;
		switch(piece){
			case 'I':
				model.falling = [[0,M-1],[0,M],[0,M+1],[0,M+2]];
				break;
			case 'J':
				model.falling = [[0,M-1],[0,M],[0,M+1],[1,M+1]];
				break;
			case 'L':
				model.falling = [[1,M-1],[0,M-1],[0,M],[0,M+1]];
				break;
			case 'O':
				model.falling = [[1,M],[0,M],[1,M+1],[0,M+1]];
				break;
			case 'S':
				model.falling = [[1,M-1],[1,M],[0,M],[0,M+1]];
				break;
			case 'Z':
				model.falling = [[0,M-1],[0,M],[1,M],[1,M+1]];
				break;
			case 'T':
				model.falling = [[0,M-1],[0,M],[1,M],[0,M+1]];
				break;
		}
	};
	var fall = function(){
		if(model.falling.every(function(t){
			return t[0]+1<model.height && !(model.board[t[0]+1][t[1]]);
		}))
			model.falling = model.falling.map(function(t){ return [t[0]+1, t[1]]; });
		else
		{
			model.falling.forEach(function(b){
				model.board[b[0]][b[1]] = model.fallingType;
			});
			model.falling = null;
		}
		view.update();
	};
	var moveLeft = function(){
		if(!model.falling) return;
		if(model.falling.every(function(b){
			return b[1]>0 && !model.board[b[0]][b[1]-1];
		}))
		{
			model.falling = model.falling.map(function(b){ return [b[0], b[1]-1]; });
			view.update();
		}
	};
	var moveRight = function(){
		if(!model.falling) return;
		if(model.falling.every(function(b){
			return b[1]<model.width-1 && !model.board[b[0]][b[1]+1];
		}))
		{
			model.falling = model.falling.map(function(b){return [b[0], b[1]+1]; });
			view.update();
		}
	};
	var gap = 30; // how many frames per gravity tick
	var remaining=gap;
	var tick = function(){
		var lost = false;
		if(model.falling == null)
		{
			spawnNew();
			lost = !model.falling.every(function(c){ return !model.board[c[0]][c[1]]; });
			view.update();
		}

		if(!lost){
			remaining--;
			if(remaining<=0){
				remaining=gap;
				fall();
			}
		}

		if(lost)
		{
			clearInterval(interval);
			alert("You lose!");
		}
	};
	var interval= setInterval(tick, 32);
	tick();
	return {
		left: moveLeft,
		right: moveRight,
		down: fall
	};
});
