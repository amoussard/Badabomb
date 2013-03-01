<?php
    $id = "";
    if (isset($_GET["idGame"]) && !empty($_GET["idGame"])) {
        $id = $_GET["idGame"];
    }
?>
<html>
<head>
    <link rel="stylesheet" href="/css/style.css">
</head>
<body>
    <h1>Partie</h1>
    <h2>Menu</h2>
    <ul>
        <li><a href="chat.html">Chat</a></li>
        <li><a href="games.html">Parties</a></li>
    </ul>

    <div id="id-wrapper">
        <h2>Partie</h2>
        <input type="hidden" id="gameId" value="<?php echo $id ?>" />
        <form id="form-id">
            <label for="userId">Pseudo : </label>
            <input type="text" id="userId"/>
            <input type="submit" id="submit" />
        </form>
    </div>

    <div id="players-wrapper" style="display: none;">
        <h2>Joueurs</h2>
        <ul id="players">
            <li class="player" id="tplPlayer" style="display:none;">
                {{id}}
            </li>
        </ul>
    </div>

    <script src="//ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js"></script>
    <script src="js/lib/mustache.js"></script>
    <script src="http://localhost:1338/socket.io/socket.io.js"></script>
    <script src="js/game.js"></script>
</body>
</html>