class Overworld{
    constructor(config){
        this.element = config.element;
        this.canvas = this.element.querySelector('.game-canvas');
        this.ctx = this.canvas.getContext('2d');
        this.map = null;

        
    }


    startGameLoop(){
        const step = () => {

            this.ctx.clearRect(0,0, this.canvas.width, this.canvas.height);
           

            const cameraPerson = this.map.gameObjects.hero;

            Object.values(this.map.gameObjects).forEach(object => {
                object.update({
                    arrow: this.direcionInput.direction,
                    map: this.map,

                })
            })

            this.map.drawLowerImage(this.ctx, cameraPerson);
            
            

            
            Object.values(this.map.gameObjects).forEach(object => {
                
                object.sprite.draw(this.ctx, cameraPerson);
            })

            this.map.drawUpperImage(this.ctx, cameraPerson);
            

            requestAnimationFrame(() => {
                step();
            })
        }

        step();
            
    }


    init(){
        this.map = new OverworldMap(window.OverworldMaps.Bedroom);


        this.direcionInput = new DirectionInput();
        this.direcionInput.init();

        window.addEventListener('keydown', (event) => {
            if (event.key === 'e') {
                this.checkPlayerPositionAndDirection();
            }
        });

        window.addEventListener('click', (event) => {
            this.handleMouseClick(event);
        });

       
        this.startGameLoop();      
        
    }

    checkPlayerPositionAndDirection() {
        const player = this.map.gameObjects.hero;
        this.map.places.forEach(place => {
            if (player.x === utils.withGrid(place.x) && player.y === utils.withGrid(place.y) && player.direction === place.direction && player.sprite.currentAnimation === `idle-${place.direction}`) {
                if(place.x === 2 && place.y === 5){
                    this.changeMap("Computer");
                }
                else
                    this.showPopup(place.message);
                }
        });
    }

    handleMouseClick(event) {
        const canvasRect = this.ctx.canvas.getBoundingClientRect();
        const x = event.clientX - canvasRect.left;
        const y = event.clientY - canvasRect.top;
        console.log(`Mouse coordinates: (${x}, ${y})`);

        this.map.places.forEach(place => {
            if (x > place.x && x < place.x + place.width && y > place.y && y < place.y + place.height) {    
                if(place.name === "Exit"){
                    this.changeMap("Bedroom");
                }
                else if(place.name === "LinkedIn"){
                    window.location.href = "https://www.linkedin.com/in/jack-rafiei-529102241/";
                }
            }
            
        });
    }   

    

    changeMap(mapName){
        this.map = new OverworldMap(window.OverworldMaps[mapName]);
        this.startGameLoop();    
    }

    showPopup(message) {
        let popupBox = document.querySelector('.popup-box');
        if (!popupBox) {
            popupBox = document.createElement('div');
            popupBox.className = 'popup-box';
            document.body.appendChild(popupBox);
        }
        popupBox.textContent = message;
        popupBox.style.display = 'block';
        this.map.gameObjects.hero.isPlayerControlled = false;


        let continueMessage = popupBox.querySelector('.continue-message');
            if (!continueMessage) {
                continueMessage = document.createElement('p');
                continueMessage.className = 'continue-message';
                continueMessage.style.position = 'absolute';
                continueMessage.style.bottom = '10px';
                continueMessage.style.right = '10px';
                continueMessage.style.fontSize = '12px';
                continueMessage.style.color = '#888';
                popupBox.appendChild(continueMessage);
            }

        continueMessage.textContent = '(press enter to continue)';
        let canvasRect = this.canvas.getBoundingClientRect();
        console.log("hello" + canvasRect.left);
        
        const hidePopup = () => {
            popupBox.style.display = 'none';
            this.map.gameObjects.hero.isPlayerControlled = true;
            document.removeEventListener('keydown', onEnterPress);
        };
    
        const onEnterPress = (event) => {
            if (event.key === 'Enter') {
                hidePopup();
            }
        };
    
        document.addEventListener('keydown', onEnterPress);
    }


}
        
