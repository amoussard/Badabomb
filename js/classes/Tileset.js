function Tileset(url) {
    // Chargement de l'image dans l'attribut image
    this.image = new Image();
    this.image.tilesetReference = this;
    this.image.onload = function() {
        if (!this.complete) {
            throw new Error("Erreur de chargement du tileset : \"" + url + "\".");
        }
        // Largeur du tileset en tiles
        this.tilesetReference.width = this.width / TILESET_GRID;
    }
    this.image.src = "tilesets/" + url;

}

Tileset.prototype.getNbTiles = function () {
    var widthNbTiles = this.image.width / TILESET_GRID;
    var heightNbTiles = this.image.height / TILESET_GRID;

    return widthNbTiles * heightNbTiles;
}

Tileset.prototype.drawTile = function(number, context, xTo, yTo) {
    var xSourceInTiles = number % this.width;
    if (xSourceInTiles == 0) {
        xSourceInTiles = this.width;
    }
    var ySourceInTiles = Math.ceil(number / this.width);
    var xSource = (xSourceInTiles - 1) * TILESET_GRID;
    var ySource = (ySourceInTiles - 1) * TILESET_GRID;
    xTo = xTo * ZOOM;
    yTo = yTo * ZOOM;
    context.drawImage(this.image, xSource, ySource, TILESET_GRID, TILESET_GRID, xTo, yTo, TILESET_GRID * ZOOM, TILESET_GRID * ZOOM);
}
