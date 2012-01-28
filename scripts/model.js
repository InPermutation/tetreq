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
		height: HEIGHT,
		width: WIDTH,
		board: board,
		next: null
	};
});
