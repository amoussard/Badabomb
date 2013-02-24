var DIRECTION = {
    "BAS"    : 0,
    "GAUCHE" : 1,
    "DROITE" : 2,
    "HAUT"   : 3
}

var DUREE_ANIMATION = 3;
var DUREE_DEPLACEMENT = 10;

function Player(url, x, y, direction) {
    this.position = new Position(x, y);
    this.direction = direction;
    this.animationState = -1;

    // Chargement de l'image dans l'attribut image
    this.image = new Image();
    this.image.playerReference = this;
    this.image.onload = function() {
        if(!this.complete)
            throw "Erreur de chargement du sprite nommé \"" + url + "\".";

        // Taille du personnage

        this.playerReference.width = this.width / 3;
        this.playerReference.height = this.height / 4;
    }
    this.image.src = "sprites/" + url + ".png";
}

Player.prototype.getNextFrame = function() {
    var frame = 0;
    if(this.animationState >= 0) {
        frame = Math.floor(this.animationState / DUREE_ANIMATION) % 3;
        if(frame > 1) {
            frame = -1;
        }
    }
    return frame;
}

Player.prototype.draw = function(context) {
    var frame = 0; // Numéro de l'image à prendre pour l'animation
    var decalageX = 0, decalageY = 0; // Décalage à appliquer à la position du personnage
    if(this.animationState >= DUREE_DEPLACEMENT) {
        // Si le déplacement a atteint ou dépassé le temps nécessaire pour s'effectuer, on le termine
        this.animationState = -1;
    } else if(this.animationState >= 0) {
        // On calcule l'image (frame) de l'animation à afficher
        frame = this.getNextFrame();

        // Nombre de pixels restant à parcourir entre les deux cases
        var pixelsAParcourir = 32 - (32 * (this.animationState / DUREE_DEPLACEMENT));

        // À partir de ce nombre, on définit le décalage en x et y.
        // NOTE : Si vous connaissez une manière plus élégante que ces quatre conditions, je suis preneur
        if(this.direction == DIRECTION.HAUT) {
            decalageY = pixelsAParcourir;
        } else if(this.direction == DIRECTION.BAS) {
            decalageY = -pixelsAParcourir;
        } else if(this.direction == DIRECTION.GAUCHE) {
            decalageX = pixelsAParcourir;
        } else if(this.direction == DIRECTION.DROITE) {
            decalageX = -pixelsAParcourir;
        }

        this.animationState++;
    }

    context.drawImage(
        this.image,
        this.width + frame * this.width, this.direction * this.height, // Point d'origine du rectangle source à prendre dans notre image
        this.width, this.height, // Taille du rectangle source (c'est la taille du personnage)
        (this.position.x * TILESET_GRID) + decalageX, (this.position.y * TILESET_GRID) + decalageY, // Point de destination (dépend de la taille du personnage)
        this.width, this.height // Taille du rectangle destination (c'est la taille du personnage)
    );
}

Player.prototype.getFuturePosition = function(direction)  {
    var coord = new Position(this.position.x, this.position.y);
    switch(direction) {
        case DIRECTION.BAS :
            coord.y++;
            break;
        case DIRECTION.GAUCHE :
            coord.x--;
            break;
        case DIRECTION.DROITE :
            coord.x++;
            break;
        case DIRECTION.HAUT :
            coord.y--;
            break;
    }
    return coord;
}

Player.prototype.move = function(direction, map) {
    // On ne peut pas se déplacer si un mouvement est déjà en cours !
    if(this.animationState >= 0) {
        return false;
    }

    // On change la direction du personnage peu importe ce qu'il y a devant
    this.direction = direction;

    // On vérifie que la case demandée est bien située dans la carte
    var nextPosition = this.getFuturePosition(direction);
    if(nextPosition.x < 0 || nextPosition.y < 0
       || nextPosition.x >= map.getWidth()
       || nextPosition.y >= map.getHeight()
       || map.hasObstacle(nextPosition)) {
        // On retourne un booléen indiquant que le déplacement ne s'est pas fait,
        return false;
    }

    // On effectue le déplacement
    this.position.x = nextPosition.x;
    this.position.y = nextPosition.y;

    this.animationState = 1;

    return true;
}