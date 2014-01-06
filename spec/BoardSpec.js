describe("Board", function() {
  var board;
  var p1;
  var p2;

  beforeEach(function() {
    board = new Connect.Board();
    p1 = new Connect.Player("red", "p1");
    p2 = new Connect.Player("yellow", "p2")
  });

  describe("initialization", function() {
    it("should have valid_moves", function() {
      expect(board.valid_moves).toEqual([0,0,0,0,0,0,0]);
    });

    describe("board.platform", function() {
      it("should have 6 rows", function() {
        expect(board.platform.length).toEqual(6);
      });

      it("should have 7 columns", function() {
        for (var i = 0; i < board.platform.length; i++) {
          expect(board.platform[i].length).toEqual(7);
        }
      });
    });
  });

  describe("#no_more_moves", function() {
    it("should return true if no more moves", function() {
      board.valid_moves = [6,6,6,6,6,6,6];
      expect(board.no_more_moves()).toEqual(true);
    });

    it("should return false if there are moves left", function() {
      board.valid_moves = [0,0,0,0,0,0,0];
      expect(board.no_more_moves()).toEqual(false);
    });
  });

  describe("#check_win", function() {
    it("should detect vertical win", function() {
      board.move(p1, 0);
      board.move(p1, 0);
      board.move(p1, 0);
      board.move(p1, 0);
      expect(board.check_win(p1, [3, 0])).toEqual(true);
    });

    it("should detect horizontal win", function() {
      board.move(p2, 0);
      board.move(p2, 1);
      board.move(p2, 2);
      board.move(p2, 3);
      expect(board.check_win(p2, [0, 3])).toEqual(true);
    });

    it("should detect top left to bottom right win", function() {
      board.move(p1, 0);
      board.move(p1, 0);
      board.move(p1, 0);
      board.move(p1, 1);
      board.move(p1, 1);
      board.move(p1, 2);
      board.move(p2, 0);
      board.move(p2, 1);
      board.move(p2, 2);
      board.move(p2, 3);
      expect(board.check_win(p2, [0, 3])).toEqual(true);
    });

    it("should detect top right to bottom left win", function() {
      board.move(p2, 6);
      board.move(p2, 6);
      board.move(p2, 6);
      board.move(p2, 5);
      board.move(p2, 5);
      board.move(p2, 4);
      board.move(p1, 3);
      board.move(p1, 4);
      board.move(p1, 5);
      board.move(p1, 6);
      expect(board.check_win(p1, [3, 6])).toEqual(true);
    });
  });

  describe("#move", function() {
    beforeEach(function() {
      board.move(p1, 0);
    });

    it("should make first move and have one player", function() {
      expect(board.platform[0][0]).toEqual(p1);
    });

    it("should make second move and have two players", function() {
      board.move(p2, 0);
      expect(board.platform[1][0]).toEqual(p2);
    });

    it("should update valid_moves accordingly", function() {
      expect(board.valid_moves).toEqual([1,0,0,0,0,0,0])
    });

    it("shouldn't affect board.platform if no more moves available", function() {
      board.move(p2, 0);
      board.move(p1, 0);
      board.move(p2, 0);
      board.move(p1, 0);
      board.move(p2, 0);
      board.move(p1, 0);
      expect(board.platform[6]).toEqual(undefined);
      expect(board.platform[5][0]).toEqual(p2);
    });
  });
});