(function($){
    var gameId = $("#gameId").val();
    $("#gameId").remove();

    var tplPlayer = $('#tplPlayer').html();
    $('#tplPlayer').remove();

    // Connexion au serveur
    var socket = io.connect('http://localhost:1338');

    $("#form-id").submit(function (event) {
        event.preventDefault();
        var userId = $(this).find("#userId").val();
        if (gameId != '') {
            socket.emit('ask_join_game', {
                userId: userId,
                gameId: gameId
            });
        } else {
            socket.emit('create_game', userId);
        }
    });

    socket.on('create_game_success', function (game) {
        $('#id-wrapper').slideUp();
        $('#players-wrapper').slideDown();
        alert("Félicitations ! Vous avez créé une partie !");
    });

    socket.on('join_game_success', function (game) {
        $('#id-wrapper').slideUp();
        $('#players-wrapper').slideDown();
        alert("Félicitations ! Vous avez rejoint la partie !");
    });

    socket.on('user_join', function (player) {
        $('#players').append( '<li class="player">' + Mustache.render(tplPlayer, player) + '</li>' );
    });

})(jQuery);