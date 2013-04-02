define(function(){
	var HEIGHT = 20;
	var WIDTH = 10;
    function makeBoard(){
        var board = [];
        for(var y = 0; y<HEIGHT; y++)
        {
            board[y] = [];
            for(var x = 0; x<WIDTH; x++)
            {
                board[y][x] = '';
            }
        }
        return board;
    }

    var model = {
        reset: function() {
            model.pieces = 'IJLOSZT'.split('');
            model.height = HEIGHT;
            model.width = WIDTH;
            model.board = makeBoard();
            model.falling = null;
            model.fallingType = null;
            model.next = null;
            model.nextType = null;
            model.cleared = 0;
            model.score = 0;
            model.period = 30;
            model.ticks = 30;
            model.stopped = false;
        }
    };
    model.reset();

    return model;
});
