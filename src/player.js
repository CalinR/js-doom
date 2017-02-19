import GameObject from './game-object'

class Player extends GameObject {
    constructor({ x = 0, y = 0, rotation = 0 } = {}){
        super({ x, y, rotation });

        this.speed = 0;
        this.direction = 0;
        this.moveSpeed = 50;
        this.rotationSpeed = 90;

        this.bindControls();
    }

    bindControls(){
        document.onkeydown = (e) => {
            let key = e.keyCode ? e.keyCode : e.which;
            
            switch(key){
                case 38: // Up arrow
                    this.speed = 1;
                    break;
                case 40: // Down arrow
                    this.speed = -1;
                    break;
                case 37: // Left arrow
                    this.direction = -1;
                    break;
                case 39: // Right arrow
                    this.direction = 1;
                    break;
            }
        }

        document.onkeyup = (e) => {
            let key = e.keyCode ? e.keyCode : e.which;
            
            switch(key){
                case 38: // Up arrow
                    this.speed = 0;
                    break;
                case 40: // Down arrow
                    this.speed = 0;
                    break;
                case 37: // Left arrow
                    this.direction = 0;
                    break;
                case 39: // Right arrow
                    this.direction = 0;
                    break;
            }
        }
    }

    update(){
        this.rotation += (this.direction * this.rotationSpeed) * window.deltaTime;
        
        if(this.rotation > 360){
            this.rotation = 0;
        }
        else if(this.rotation < 0){
            this.rotation += 360;
        }

        let moveStep = (this.speed * this.moveSpeed);

        let moveX = Math.cos(this.radians) * moveStep;
        let moveY = Math.sin(this.radians) * moveStep;

        let newX = this.x + (moveX * window.deltaTime);
        let newY = this.y + (moveY * window.deltaTime);

        this.x = newX;
        this.y = newY;
    }
}

export default Player;