function Obstacle(x, y, tileset) {
    this.position = new Position(x, y);
    this.tileNumber = 10;
    this.tileSet = tileset;
}

Obstacle.prototype.draw = function(context) {
    this.tileSet.drawTile(this.tileNumber, context, this.position.x * TILESET_GRID, this.position.y * TILESET_GRID);
}