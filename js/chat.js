(function($){

    var msg = $('#msgtpl').html();
    var lastmsg = false;
    $('#msgtpl').remove();

    // Connexion au serveur
    var socket = io.connect('http://localhost:1337');

    $("#loginform").submit(function (event) {
        event.preventDefault();
        socket.emit('login', {
            username: $('#username').val(),
            mail: $('#mail').val()
        });
    });

    /**
     * Gestion des messages
     */

    $('#form').submit(function(event){
        event.preventDefault();
        socket.emit('newmsg', {message : $('#message').val() });
        $('#message').val('');
        $('#message').focus();
        return false;
    });

    socket.on('newmsg', function(message){
        if(lastmsg != message.user.id){
            $('#messages').prepend('<div class="sep"></div>');
            lastmsg = message.user.id;
        }
        $('#messages').prepend( '<div class="message">' + Mustache.render(msg, message) + '</div>' );
        $("#messages").animate({ scrollTop: $("#messages").prop("scrollHeight") }, 500);
    });

    /**
     * Gestion des connectés
     */

    socket.on('logged', function(){
        $('#login').fadeOut();
        $('#users, #messages, #form').show();
        $('#message').focus();
    });

    socket.on('newusr', function(user){
        console.log("remove " + user.id);
        $('#'+user.id).remove();
        $('#users').append('<img src="' + user.avatar + '" id="' + user.id + '">')
    });

    socket.on('disusr', function(user){
        console.log("remove " + user.id);
        $('#'+user.id).slideUp(100, function(){
            $(this).remove();
        })
    })

})(jQuery);