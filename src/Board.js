(function(root) {
	var Connect = root.Connect = (root.Connect || {});

	var Board = Connect.Board = function() {
		this.platform = new Array(6);
		for (var i = 0; i < this.platform.length; i++) {
			this.platform[i] = new Array(7);
		};
		this.valid_moves = [0,0,0,0,0,0,0];
	};

	Board.prototype.no_more_moves = function() {
		for (var i = 0; i < this.valid_moves.length; i++) {
			if (this.valid_moves[i] !== 6) return false;
		}
		return true;
	};

	Board.prototype.update_circles = function(player, col) {
		var row = this.valid_moves[col];
		$("div[data-row=" + row + "][data-col=" + col + "]").addClass(player.color);
	};

	Board.prototype.announce_turn = function(player) {
		$(".turn").html("It is the turn of: " + player.color.toUpperCase());
	};

	Board.prototype.end_game = function(player) {
		if (typeof player === "undefined") {
			$(".turn").html("It's a TIE!");
		} else {
			$(".turn").html(player.color.toUpperCase() + " player won!");
		}
		$(".content").append("<a href='" + document.URL + "'>Play Again</a>");
		$(".circle").unbind();
	};

	Board.prototype.check_win = function(player, pos) {
		var counter = 0;
		var row = pos[0];
		var col = pos[1];
		var vectors = [{x:1, y:0}, {x:0, y:1}, {x:1, y:1}, {x:-1, y:1}];

		for (var i = 0; i < vectors.length; i++) {
			counter = 0;
			dirX = vectors[i].x;
			dirY = vectors[i].y;
			startCol = col - (vectors[i].x * 3)
			startRow = row - (vectors[i].y * 3)
			for (var step = 0; step < 7; step++, startCol += dirX, startRow += dirY) {
				if (startCol < 0 || startCol > 6 || startRow < 0 || startRow > 5) continue;
				if (this.platform[startRow][startCol] === player) {
					counter += 1;
					if (counter >= 4) return true;
				} else {
					counter = 0;
				}
			}
		}
		return false;
	};

	Board.prototype.move = function(player, col) {
		if (this.valid_moves[col] === 6) {
			alert("invalid move");
		} else {
			var row = this.valid_moves[col];
			this.platform[row][col] = player;
			this.valid_moves[col] += 1;
			return ([row, col]);	
		}
	};
})(this);