var http = require('http');
var md5 = require('MD5');

httpServer = http.createServer(function (request, response) {
}).listen(1337);
console.log('Server running at http://nodejs.test/');


var io = require('socket.io').listen(httpServer) ;
var users = {};
var messages = [];
var history = 10;

io.sockets.on('connection', function (socket) {
    var me = false;

    for (var k in users) {
        socket.emit('newusr', users[k]);
    }
    for (var k in messages) {
        socket.emit('newmsg', messages[k]);
    }

    /**
     * A la connexion
     */
    socket.on('login', function (user) {
        me = user;
        me.id = user.mail.replace(/@/g, '-').replace(/\./g, '-');
        me.avatar = 'https://gravatar.com/avatar/' + md5(user.mail) + '?s=50';
        users[me.id] = me;
        console.log(users);
        // Envoie un event à l'utilisateur concerné
        socket.emit('logged');
        // Envoie un event à tous sauf le concerné
        // socket.broadcast.emit('newusr');
        // Envoie un event à tous les sockets
        io.sockets.emit('newusr', me);
    });

    /**
     * A la déconnexion
     */
    socket.on('disconnect', function () {
        if (!me) {
            return false;
        }

        delete users[me.id];
        io.sockets.emit('disusr', me);
    });

    /**
     * Réception message
     */
    socket.on('newmsg', function (message) {
        message.user = me;
        date = new Date();
        message.h = date.getHours();
        message.m = date.getMinutes();
        messages.push(message);
        if (messages.length > history) {
            messages.shift();
        }
        io.sockets.emit('newmsg', message);
    });

});