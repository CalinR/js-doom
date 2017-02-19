class View {
    constructor(width, height, scale){
        this.width = width;
        this.height = height;
        this.scale = scale || 1;
        this.canvas = document.createElement('canvas');
        this.context = this.canvas.getContext('2d');
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        this.canvas.style.width = `${this.width * this.scale}px`;
        this.canvas.style.height = `${this.height * this.scale}px`;
        this.context.mozImageSmoothingEnabled = false;                                                                                   
        this.context.webkitImageSmoothingEnabled = false;                                                                                
        this.context.imageSmoothingEnabled = false;
        document.body.appendChild(this.canvas);
    }

    clear(){
        this.context.clearRect(0, 0, this.width, this.height);
    }
}

export default View;