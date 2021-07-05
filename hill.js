export class Hill {
    
    
    constructor(color, speed, total){
        this.color = color;
        this.speed = speed;
        this.total = total;
    } //언덕이 여러개이기 때문에 파라밑어로 받아오게함

    resize(stageWidth, stageHeight){
        this.stageWidth = stageWidth;
        this.stageHeight = stageHeight;
        

        this.points = [];
        this.gap = Math.ceil(this.stageWidth/(this.total-2));

        for(let i=0;i<this.total;i++){
            console.log(this.stageHeight);
            this.points[i] = {
                    x: i * this.gap,
                    y: this.getY()
            };
        }
    }


    draw(ctx){
        //this.canvas = document.createElement('canvas');
        //this.ctx = this.canvas.getContext("2d"); 파라미터로 받아오기 때문에 상관 없음 파라미터로 받아와서 사용하면 기능들이 안보이기 때문에 먼저 써주고 바꾸면댐
        
        ctx.fillStyle = this.color;
        ctx.beginPath();
         
        let cur = this.points[0];
        let prev = cur;

        let dots =[];
        cur.x += this.speed;
        ctx.moveTo(cur.x, cur.y);

        let prevCx = cur.x;
        let prevCy = cur.y;

        for(let i = 1; i<this.points.length; i++){
        cur = this.points[i];
        cur.x += this.speed;
        const cx = (prev.x + cur.x) /2;
        const cy = (prev.y + cur.y) /2;
        ctx.quadraticCurveTo(prev.x, prev.y, cx, cy);
       
        dots.push({
            x1: prevCx,
            y1: prevCy,
            x2: prev.x,
            y2: prev.y,
            x3: cx,
            y3: cy,
        });
        
        prev = cur;
        prevCx = cx;
        prevCy = cy;
        }
        ctx.lineTo(prev.x, prev.y);
        ctx.lineTo(this.stageWidth, this.stageHeight);
        ctx.lineTo(this.points[0].x, this.stageHeight);
        ctx.fill();//캔버스에 그리고 마ㅣ막에 fill 써줘야 그려짐
        //console.log(dots);
        return dots;

    } //언덕을  캠퍼스에그리는 함수


    getY(){
        const min = this.stageHeight/8;
        const max = this.stageHeight - min;
        return min + Math.random() * max;
    }//언덕의 y값을 랜덤으로 주는 함수
}