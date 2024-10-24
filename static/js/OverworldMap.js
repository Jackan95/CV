class OverworldMap{
    constructor(config){
        this.gameObjects = config.gameObjects;

        this.walls = config.walls || {};

        this.lowerImage = new Image();
        this.lowerImage.src = config.lowerSrc;

        this.upperImage = new Image();
        this.upperImage.src = config.upperSrc;

        this.places = config.places || [];
    }


    drawLowerImage(ctx, cameraPerson){
        ctx.drawImage(this.lowerImage, utils.withGrid(10.5) - cameraPerson.x,
         utils.withGrid(6) - cameraPerson.y);
    }

    drawUpperImage(ctx, cameraPerson){
        ctx.drawImage(this.upperImage, utils.withGrid(10.5) - cameraPerson.x,
         utils.withGrid(6) - cameraPerson.y);
    }

    isSpaceTaken(currentX, currentY, direction){
        const {x, y} = utils.nextPostition(currentX, currentY, direction);
        return this.walls[`${x},${y}`] || false;
    }

}

    window.OverworldMaps = {

        Bedroom: {
            lowerSrc: "static/images/maps/CVroom.png",
            upperSrc: "static/images/maps/wardrobe.png",
            gameObjects: {
                hero: new Person({
                    isPlayerControlled: true,
                    x: utils.withGrid(5),
                    y: utils.withGrid(5),
                    src: "static/images/characters/hero.png",
                }),
                    
            },
            walls: {
              
                [utils.asGridCoord(1, 4)] : true,
                [utils.asGridCoord(2, 4)] : true,
                [utils.asGridCoord(3, 4)] : true,
                [utils.asGridCoord(9, 8)] : true,
                [utils.asGridCoord(9, 9)] : true,
              
            },
            places: [
                { x: 6, y: 4, direction: 'up', message: 'Bachelor in Information Systems' },
                { x: 9, y: 4, direction: 'up', message: 'Certificate: Harvard CS50X' },
                { x: 2, y: 5, direction: 'up'}
            ]
        },

        Computer: {
            lowerSrc: "static/images/maps/computer_screen.png",
            gameObjects: {
                hero: new Person({
                    isPlayerControlled: true,
                    x: utils.withGrid(5),
                    y: utils.withGrid(5),
                })
            },
            
            places: [
                {name: "Exit", x: 560, y: 190, width: 30, height: 40},
                {name: "LinkedIn", x: 410, y: 190, width: 30, height: 40},
            ]
            }
        }    
    

    for (let x = 0; x <= 10; x++) {
        window.OverworldMaps.Bedroom.walls[utils.asGridCoord(x, 3)] = true;
    }

    for (let x = 0; x <= 10; x++) {
        window.OverworldMaps.Bedroom.walls[utils.asGridCoord(x, 10)] = true;
    }

    for (let y = 0; y <= 10; y++) {
        window.OverworldMaps.Bedroom.walls[utils.asGridCoord(0, y)] = true;
    }

    for (let y = 0; y <= 10; y++) {
        window.OverworldMaps.Bedroom.walls[utils.asGridCoord(11, y)] = true;
    }