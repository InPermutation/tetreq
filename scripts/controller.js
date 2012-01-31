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
	var clearRows = function(){
		model.board = model.board.filter(function(ro){
				return ro.some(function(c){ return !c; });
			});
		var lines = model.height - model.board.length;
		model.cleared += lines;
		var scores = [0, 100, 300, 500, 800];
		model.score += scores[lines];
		while(model.board.length < model.height)
		{
			var nuro = [];
			while(nuro.length < model.width) nuro.push('');
			model.board.unshift(nuro);
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
			clearRows();
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
	var rotate = function(){
		var topleft = model.falling.reduce(function(p,c,ix,rg){
			return [ Math.min(p[0], c[0]), Math.min(p[1], c[1])];
		}, [model.height, model.width]);
		var translate = model.falling.map(function(e){
			return [e[0]-topleft[0], e[1]-topleft[1]];
		});
		var me = model.fallingType == 'I'? 4 : (model.fallingType=='O'?2:3);
		var rotate = translate.map(function(e){
			return [1-(e[1]-(me-2)), e[0]];
		});
		var deTranslate = rotate.map(function(e){
			return [e[0]+topleft[0], e[1]+topleft[1]];
		});
		if(deTranslate.every(function(e){
			return e[0] < model.height &&
				e[1] < model.width &&
				!model.board[e[0]][e[1]];
		}))
			model.falling = deTranslate;
		view.update();
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
		down: fall,
		clockwise: rotate,
		drop: function(){ while(model.falling) fall(); }
	};
});
