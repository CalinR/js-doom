import View from './view'
import Player from './player'
import {map} from './map'

class Main {
    constructor(){
        window.deltaTime = 0;
		window.lastUpdate = Date.now();
        this.map = map;
        this.absoluteView = new View(100, 100, 3);
        this.transformedView = new View(100, 100, 3);
        this.perspectiveView = new View(100, 100, 3);
        this.player = new Player({ x: 50, y: 50, rotation: 0 });
        this.gameLoop();
    }

    gameLoop(){
        let currentFrameTime = Date.now();
		window.deltaTime = (currentFrameTime - window.lastUpdate) / 1000.0; // Convert delta time from milliseconds to seconds
		window.lastUpdate = currentFrameTime;

        this.drawAbsoluteView();
        this.drawTransformedView();
        this.drawPerspectiveView();

        window.requestAnimationFrame(() => this.gameLoop());
    }

    drawAbsoluteView(){
        this.absoluteView.clear();
        this.drawPlayer(this.absoluteView, this.player.x, this.player.y, this.player.radians);
        this.absoluteView.context.beginPath();
        this.absoluteView.context.moveTo(this.map[0].x,this.map[0].y);
        for(let point of this.map){
            this.absoluteView.context.lineTo(point.x, point.y);
        }
        this.absoluteView.context.stroke();
        this.absoluteView.context.closePath();
    }

    drawTransformedView(){
        let x = this.transformedView.width / 2;
        let y = this.transformedView.height / 2;
        let rotation = -90 * Math.PI / 180;

        this.transformedView.clear();
        this.drawPlayer(this.transformedView, x, y, rotation);

        this.transformedView.context.beginPath();
        
        for(let i=0; i<this.map.length; i++){
            let radians = this.player.radians;
            let point = this.map[i];
            let pointX =  point.x - this.player.x;
            let pointY =  point.y - this.player.y;
            let transformedZ = pointX * Math.cos(radians) + pointY * Math.sin(radians);
            let transformedX = pointX * Math.sin(radians) - pointY * Math.cos(radians);

            if(i==0){
                this.transformedView.context.moveTo(x - transformedX, y - transformedZ);
            }
            else {
                this.transformedView.context.lineTo(x - transformedX, y - transformedZ);
            }
        }
        this.transformedView.context.stroke();
        this.transformedView.context.closePath();
    }

    drawPerspectiveView(){
        let x = this.perspectiveView.width / 2;
        let y = this.perspectiveView.height / 2;
        this.perspectiveView.clear();
        this.perspectiveView.context.beginPath();
        let previousPoints = [];

        for(let i=0; i<this.map.length; i++){
            let radians = this.player.radians;
            let point = this.map[i];
            let pointX =  point.x - this.player.x;
            let pointY =  point.y - this.player.y;
            let transformedZ = pointX * Math.cos(radians) + pointY * Math.sin(radians);
            let transformedX = pointX * Math.sin(radians) - pointY * Math.cos(radians);
            let x1 = -transformedX * 16 / transformedZ;
            let y1a = -x / transformedZ;
            let y1b =  y / transformedZ

            if(i==0){
                this.perspectiveView.context.moveTo(x + x1, y + y1a);
                this.perspectiveView.context.lineTo(x + x1, y + y1b);
            }
            else {
                if(previousPoints.length){
                    this.perspectiveView.context.moveTo(previousPoints[0], previousPoints[1]);
                }
                this.perspectiveView.context.lineTo(x + x1, y + y1a);
                this.perspectiveView.context.lineTo(x + x1, y + y1b);
                if(previousPoints.length){
                    this.perspectiveView.context.lineTo(previousPoints[2], previousPoints[3]);
                }
            }

            previousPoints = [x+ x1, y + y1a, x + x1, y + y1b];
        }
        this.perspectiveView.context.stroke();
        this.perspectiveView.context.closePath();
    }

    drawPlayer(view, x, y, rotation){
        let width = 4;
        let height = 4;
        view.context.save();
        view.context.fillStyle = '#000';
        view.context.translate(x, y);
        view.context.fillRect(-width/2, -height/2, width, height);
        view.context.fillStyle = 'red';
        view.context.rotate(rotation);
        view.context.fillRect(4, -1, 6, 2);
        view.context.restore();
    }
}

new Main();