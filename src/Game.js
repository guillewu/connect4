(function(root) {
	var Connect = root.Connect = (root.Connect || {});

	var Game = Connect.Game = function() {
		this.board = new Connect.Board;
		this.p1 = new Player("red", "p1");
		this.p2 = new Player("yellow", "p2");
	};

	Game.prototype.start = function() {
		var currentPlayer = this.p1;
		var that = this;
		this.board.announce_turn(currentPlayer);

		$(".circle").on("click", function(event) {
			var col = $(event.currentTarget).data().col;

			that.board.update_circles(currentPlayer, col);
			var pos = that.board.move(currentPlayer, col);
			if (that.board.check_win(currentPlayer, pos)) {
				that.board.end_game(currentPlayer);
				return;
			} else if (that.board.no_more_moves()) {
				that.board.end_game();
				return;
			}
			currentPlayer = (currentPlayer === that.p1 ? that.p2 : that.p1);
			that.board.announce_turn(currentPlayer);
		});
	};

	var Player = Connect.Player = function(color, name) {
		this.color = color;
		this.name = name;
	};
})(this);