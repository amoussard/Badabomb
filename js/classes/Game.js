function Game(id) {
    this.id = id;
    this.players = [];

    /**
     * Add a player to the game
     * @param player
     */
    this.addPlayer = function (player) {
        this.players.push(player);
    }

    this.sendEventToAll = function (event, param) {
        for (var i in this.players) {
            var player = this.players[i];
            player.socket.emit(event, param);
        }
    }
    /**
     * Return the number of players
     * @return {Number}
     */
    this.getNbPLayers = function () {
        return this.players.length;
    }

    this.getPLayers = function () {
        return this.players;
    }

    this.getSendableData = function () {
        //noinspection JSValidateTypes
        return {
            id: this.id,
            nbPlayers: this.getNbPLayers()
        };
    }
};

module.exports = Game;