const PI2 = Math.PI * 2; //360도
const COLORS = [
    "#4b45ab",
    "#554fb8",
    "#605ac7",
    "#2a91a8",
    "#2e9ab2",
    "#32a5bf",
    "#81b144",
    "#85b944",
    "#8fc549",
    "#e0af27",
    "#eeba2a",
    "#fec72e",
    "#bf342d",
    "#ca3931",
    "#d7423a",
  ];
  
export class Polygon {
    constructor(x, y, radius, sides){
        this.x =x;
        this.y =y; 
        this.radius=radius;
        this.sides = sides;
        this.rotate=0;
      //  console.log(x, y, radius, sides);
    }

    animate(ctx, moveX){
        ctx.save();
        //ctx.fillStyle = '#000';
        //ctx.beginPath();
        const angle2 =PI2 /4;


        ctx.translate(this.x, this.y);//좌표이동이라고 생각하면댐 이걸 rotate 뒷부분에 넣으면 0,0을 중심으로 돌아감****

        


        const angle = PI2 /this.sides;
       // console.log("aa"+angle);
        //console.log("x" +this.x, this.y);
        //캔버스와 원점 x단위를 y그리드에서 수평으로, 단위를 수직으로 이동하여 현재 행렬에 변환 변환을 추가
        this.rotate += moveX *0.008 + 0.00065;
        ctx.rotate(this.rotate);

    for(let i=0; i<this.sides; i++){
        const x = this.radius * Math.cos(angle * i); //코사인(0) = 1
        const y = this.radius * Math.sin(angle * i); //사인(0) = 0
        
        
        // ctx.beginPath();
        // ctx.moveTo(20, 140);   // Move pen to bottom-left corner
        // ctx.lineTo(120, 10);   // Line to top corner
        // ctx.lineTo(220, 140);  // Line to bottom-right corner
        // ctx.closePath();       // Line to bottom-left corner
        // ctx.stroke(); //삼각형 그리기

        //(i==0) ? ctx.moveTo(x, y) : ctx.lineTo(x,y);
        //  ctx.beginPath();
        // ctx.arc(x,y,30,0,PI2, false);
        // ctx.fill();
        ctx.save();
        ctx.fillStyle = COLORS[i];
        ctx.translate(x,y);
        ctx.rotate(((360 / this.sides) * i + 45) * Math.PI / 180) ;
        ctx.beginPath();
        for( let j = 0 ; j< 4 ; j++){
            const x2 = 50 * Math.cos(angle2 * j);
            const y2 = 50 * Math.sin(angle2 * j);
            (j == 0) ? ctx.moveTo(x2, y2) :ctx.lineTo(x2, y2);
        }
        ctx.fill();
        ctx.closePath();
        ctx.restore();

    }
    
   // ctx.fill();
   // ctx.closePath(); //삼각형같은거 만들때 사용 lineTo 사용후 닫기할때 사용
    ctx.restore();
    }
         
}