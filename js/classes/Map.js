function Map(nom) {

    // Création de l'objet XmlHttpRequest
    var xhr = getXMLHttpRequest();
// Chargement du fichier
    xhr.open("GET", './maps/' + nom + '.json', false);
    xhr.send(null);
    if (xhr.readyState != 4 || (xhr.status != 200 && xhr.status != 0)) // Code == 0 en local
    {
        throw new Error("Impossible de charger la carte nommée \"" + nom + "\" (code HTTP : " + xhr.status + ").");
    }
    var mapJsonData = xhr.responseText;
    // Analyse des données
    var mapData = JSON.parse(mapJsonData);

    this.tileset = new Tileset(mapData.tileset);
    this.map = mapData.map;

    this.aObstacle = [];
    this.generateObstacle();
}

// Pour récupérer la taille (en tiles) de la carte
Map.prototype.getHeight = function() {
    return this.map.length;
}
Map.prototype.getWidth = function() {
    return this.map[0].length;
}

Map.prototype.draw = function(context) {
    for (var y = 0; y < this.getHeight(); y++) {
        for (var x = 0; x < this.getWidth(); x++) {
            this.tileset.drawTile(2, context, x * TILESET_GRID, y * TILESET_GRID);
        }
    }
    for (var iObstacle in this.aObstacle) {
        this.aObstacle[iObstacle].draw(context);
    }
}

Map.prototype.generateObstacle = function() {
    for (var y = 0; y < this.map.length; y++) {
        var line = this.map[y];
        for (var x = 0; x < line.length; x++) {
            if (line[x] == 1) {
                this.aObstacle.push(new Obstacle(x, y, this.tileset));
            }
        }
    }
}

Map.prototype.hasObstacle = function (position) {
    for (var iObstacle in this.aObstacle) {
        var oObstacle = this.aObstacle[iObstacle];
        if (oObstacle.position.x == position.x && oObstacle.position.y == position.y) {
            return true;
        }
    }
}