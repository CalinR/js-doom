export default class GameObject {
    constructor({ x = 0, y = 0, rotation = 0 } = {}){
        this.x = x;
        this.y = y;
        this.rotation = rotation;
        setTimeout(() => {
            this.objectLoop();
        }, 100)
    }

    get radians(){
        return this.rotation * Math.PI / 180;
    }

    set radians(radians){
        this.rotation = radians * 180 / Math.PI;
    }

    update(){
        
    }

    objectLoop(){
        this.update();
        window.requestAnimationFrame(() => this.objectLoop());
    }
}