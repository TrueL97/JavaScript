import{
    Hill
} from './hill.js';

class App{  
    constructor(){
        
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext("2d");
        document.body.appendChild(this.canvas);  //캔버스 추가하고 바디에 추가
            
        this.hills = [
            new Hill('#ff4674', 1.4, 6),
            new Hill('#ffaaaa', 1.5, 10)
        ];

        window.addEventListener('resize', this.resize.bind(this), false);//스크린사이즈 가져오기위해 사용
        this.resize(); // 스크린 사이즈를 가져오기 위해서 리사이즈 이벤트를 걸어줌 

        requestAnimationFrame(this.animate.bind(this)); //백그라운드 동작 및 비활성화시 중지
                                                        //최대 1ms로 제한되며 1초에 60번 동작
                                                        //다수의 애니메이션에도 각각 타이머 값을 생성 및 참조하지 않고 내부의 동일한 타이머 참조

    }
    resize(){
        this.stageWidth = document.body.clientWidth;
        this.stageHeight = document.body.clientHeight;
       
        this.canvas.width = this.stageWidth * 2; 
        this.canvas.height= this.stageHeight * 2;
        this.ctx.scale(2,2);   //캔버스 사이즈를 2배로 해줘서 레티나 디스플레이에서도 선명하게 보이도록함

        for(let i = 0; i<this.hills.length;i++){
            
            this.hills[i].resize(this.stageWidth, this.stageHeight);
            console.log(this.stageHeight);
        }
    }
    animate(){
        requestAnimationFrame(this.animate.bind(this));
        
        
        this.ctx.clearRect(0,0,this.stageWidth,this.stageHeight); //캠버스를 깨끗하게 지워줌
        //console.log("a");
        let dots;
        for (let i =0; this.hills.length; i++){
            dots = this.hills[i].draw(this.ctx);
            
        }
        //requestAnimationFrame(this.animate.bind(this));
    }
}

window.onload = () => { //자바스크립트에서 페이지가 로드되면 자동으로 실행되는 전역콜백함수
    new App();
}