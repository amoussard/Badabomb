var TILESET_GRID = 32;
var ZOOM = 1;
var map = new Map("map");
var player = new Player("perso1", 1, 1, DIRECTION.BAS);

window.onload = function() {
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');

    canvas.width = map.getWidth() * TILESET_GRID * ZOOM;
    canvas.height = map.getHeight() * TILESET_GRID * ZOOM;

    setInterval(function() {
        map.draw(ctx);
        player.draw(ctx);
    }, 40);

    window.onkeydown = function(event) {
        var canvas = document.getElementById('canvas');
        var ctx = canvas.getContext('2d');
        var e = event || window.event;
        var key = e.which || e.keyCode;
        switch(key) {
            case 38 : case 122 : case 119 : case 90 : case 87 : // Flèche haut, z, w, Z, W
            player.move(DIRECTION.HAUT, map);
            break;
            case 40 : case 115 : case 83 : // Flèche bas, s, S
            player.move(DIRECTION.BAS, map);
            break;
            case 37 : case 113 : case 97 : case 81 : case 65 : // Flèche gauche, q, a, Q, A
            player.move(DIRECTION.GAUCHE, map);
            break;
            case 39 : case 100 : case 68 : // Flèche droite, d, D
            player.move(DIRECTION.DROITE, map);
            break;
            default :
                //alert(key);
                // Si la touche ne nous sert pas, nous n'avons aucune raison de bloquer son comportement normal.
                return true;
        }
        return false;
    }
}

