//DOM
const playground = document.querySelector(".playground > ul");

//Setting
const GAME_ROWS = 20;
const GAME_COLS = 10;

//variables
let score = 0;
let duration = 500;
let downInterval;
let tempMovingItem;

const BLOCKS = {
  tree: [
    [
      [0, 0],
      [0, 1],
      [1, 0],
      [1, 1],
    ],
    [],
    [],
    [],
  ],
};

const movingItem = {
  type: "tree",
  direction: 0,
  top: 0,
  left: 0,
};

init();

//function
function init() {
  /*
    tempMovingItem = movingItem; 
    movingItem.left = 3; // 이렇게 하면 tempMovingItem도 바뀜  왜이러냐 ㅋ
    */
  tempMovingItem = { ...movingItem }; //movingItem 자체를 가져오는게아니라 그안의 값만 가져온다는 느낌
  console.log(tempMovingItem);

  for (let i = 0; i < GAME_ROWS; i++) {
    prependNewLine();
  }
  renderBlocks();
}

function prependNewLine() {
  const li = document.createElement("li");
  const ul = document.createElement("ul");

  for (let j = 0; j < 10; j++) {
    //세로
    const matrix = document.createElement("li");
    ul.prepend(matrix);
  }
  li.prepend(ul);
  playground.prepend(li);
}

function renderBlocks() {
  const { type, direction, top, left } = tempMovingItem;
  console.log(type, direction, top, left);
  console.log(BLOCKS[type][direction]);
  BLOCKS[type][direction].forEach((block) => {
    const x = block[0];
    //console.log(x);
    const y = block[1]; //[x,y] [x,y] [x,y] [x,y] 4번 반복
    // console.log(y);
    console.log({ playground });
    const target = playground.childNodes[y].childNodes[0].childNodes[x]; //childNodes: forEach 나 sum같은 배열함수 사용할수 있게 반환
    //ul.li(61번째줄 li).ul(css에서 가로로 바꿈)
    console.log(target);
    target.classList.add(type);
  });
}
