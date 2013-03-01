var http = require('http');
var md5 = require('MD5');
var GameManager = require('./js/classes/GameManager.js');
var Game = require('./js/classes/Game.js');
var Player = require('./js/classes/Player.js');

httpServer = http.createServer(function (request, response) {
}).listen(1338);
console.log('Server running at http://nodejs.test/');


var io = require('socket.io').listen(httpServer) ;
var gameManager = new GameManager();

io.sockets.on('connection', function (socket) {
    socket.on('ask_games_list', function () {
        if (gameManager.getNbGames() == 0) {
            socket.emit('no_game');
            return;
        }
        var games = gameManager.getGames()
        for (var i in games) {
            socket.emit('new_game', games[i].getSendableData());
        }
    });

    socket.on('create_game', function (userId) {
        var game = new Game(userId);
        var player = new Player(userId, socket);
        game.addPlayer(player);
        gameManager.addGame(game);
        socket.emit('create_game_success', game.getSendableData());
        console.log(player.getSendableData());
        socket.emit('user_join', player.getSendableData());
    });

    socket.on('ask_join_game', function (request) {
        var game = gameManager.getGame(request.gameId);
        var player = new Player(request.userId, socket);
        var players = game.getPLayers();
        for (var i in players) {
            socket.emit('user_join', players[i].getSendableData());
        }
        game.addPlayer(player);
        socket.emit('join_game_success', game.getSendableData());
        game.sendEventToAll('user_join', player.getSendableData());
    });
});

