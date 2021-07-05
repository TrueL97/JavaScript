
import{
    WaveGroup
}   from './wavegroup.js';



class App{
    constructor(){
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        document.body.appendChild(this.canvas);

        this.WaveGroup = new WaveGroup();

        window.addEventListener('resize',this.resize.bind(this),false);
        this.resize();

        requestAnimationFrame(this.animate.bind(this));
    }

    resize(){
        this.stageWidth = document.body.clientWidth;
        this.stageHeight = document.body.clientHeight;
       
        this.canvas.width = this.stageWidth * 2; 
        this.canvas.height= this.stageHeight * 2;
        this.ctx.scale(2,2);   //캔버스 사이즈를 2배로 해줘서 레티나 디스플레이에서도 선명하게 보이도록함

        this.WaveGroup.resize(this.stageWidth,this.stageHeight);
    }

    animate(t){
        
        this.ctx.clearRect(0,0,this.stageWidth,this.stageHeight);

        this.WaveGroup.draw(this.ctx);
        requestAnimationFrame(this.animate.bind(this));

        
    }
}

window.onload = () => { //윈도우 로드가 되면 app생성
    console.log("aaasas");
    new App();
};