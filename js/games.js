(function($){

    var tplGame = $('#tplGame').html();
    $('#tplGame').remove();

    // Connexion au serveur
    var socket = io.connect('http://localhost:1338');

    socket.emit('ask_games_list');

    socket.on('new_game', function(game){
        console.log(game);
        $('#games').prepend( '<li class="game">' + Mustache.render(tplGame, game) + '</li>' );
        $("#games .loader").remove();
    });

    socket.on('no_game', function(){
        $("#games .loader").remove();
    });

})(jQuery);