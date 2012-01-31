define(function(){
	var HEIGHT = 20;
	var WIDTH = 10;
	var board = [];
	for(var y = 0; y<HEIGHT; y++)
	{
		board[y] = [];
		for(var x = 0; x<WIDTH; x++)
		{
			board[y][x] = '';
		}
	}

	return {
		pieces: 'IJLOSZT'.split(''),
		height: HEIGHT,
		width: WIDTH,
		board: board,
		falling: null,
		fallingType: null,
		next: null,
		nextType: null,
		cleared: 0,
		score: 0
	};
});
