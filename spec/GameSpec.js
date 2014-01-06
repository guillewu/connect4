describe("Game", function() {
  var game;

  beforeEach(function() {
    game = new Connect.Game();
  });
  
	describe("initialization", function() {
		it("should have a board", function() {
			expect(game.board instanceof Connect.Board).toEqual(true);
		});

		it("should have two players", function() {
			expect(game.p1 instanceof Connect.Player).toEqual(true);
			expect(game.p2 instanceof Connect.Player).toEqual(true);
		});
	});
});