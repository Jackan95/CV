const utils = {
    withGrid(n){
        return n * 16;
    },

    asGridCoord(x,y){
        return `${x*16},${y*16}`;
    },

    nextPostition(initialX, initialY, direction){
        let x = initialX;
        let y = initialY;
        const size = 16;
        if(direction === 'left'){
            x -= size;
        }   
        if(direction === 'right'){
            x += size;
        }
        if(direction === 'up'){
            y -= size;
        }
        if(direction === 'down'){
            y += size;
        }
        return {x, y};
    }


}