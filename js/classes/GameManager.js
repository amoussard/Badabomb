function GameManager() {
    this.games = [];

    /**
     *
     * @param game
     */
    this.addGame = function (game) {
        this.games.push(game);
    }

    /**
     *
     * @param gameId
     * @return {*}
     */
    this.getGame = function (gameId) {
        for (var i in this.games) {
            if (this.games[i].id == gameId) {
                return this.games[i];
            }
        }
        return null;
    }

    this.getGames = function () {
        return this.games;
    }

    this.getNbGames = function () {
        return this.games.length;
    }
};

module.exports = GameManager;