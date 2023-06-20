const boxes=document.querySelectorAll(".box");
const gameInfo=document.querySelector(".game-info");
const newGamebtn=document.querySelector(".btn")

let currentPlayer;
let gameGrid;

const winningPositions=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
];

function initGame(){
    currentPlayer="X";
    gameGrid=["","","","","","","","",""];
    boxes.forEach((box,index)=>{
        
        box.innerText="";
        box.style.pointerEvents="all";
        box.classList.remove("win");
        //box.classList=`box box${index+1}`;

    })
    newGamebtn.classList.remove("active");
    gameInfo.innerText=`Current Player -${currentPlayer.toUpperCase()}`;
};
initGame();

boxes.forEach((box,index)=>{
    box.addEventListener("click",()=>{
        handleClick(box,index);
    });

});

function handleClick(box,index){
    if(gameGrid[index]===""){
        box.innerText=currentPlayer.toUpperCase();
        box.style.pointerEvents="none";
        gameGrid[index]=currentPlayer;
        swapturn();
        checkGameOver();
    }

};

function swapturn(){
    if(currentPlayer==="X"){
        currentPlayer="O";
    }else{
        currentPlayer="X";
    }
    gameInfo.innerText=`Current Player-${currentPlayer.toUpperCase()}`;
};
function checkGameOver(){
    let answer="";

    winningPositions.forEach((position)=>{
        if((gameGrid[position[0]]!==""|| gameGrid[position[1]]!=="" ||gameGrid[position[2]]!=="") && (gameGrid[position[0]]===gameGrid[position[1]]) && (gameGrid[position[1]]===gameGrid[position[2]]) ){

            if(gameGrid[position[0]]==="X"){
                answer="X";
            }else{
                answer="0";
            }

            boxes.forEach(box=>{
                box.style.pointerEvents="none";
            })
            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");


        }
    });

    //we have winner
    if(answer!==""){
        gameInfo.innerHTML=`Winner Player-${answer}`;
        newGamebtn.classList.add("active");
        return ;
    }
    let fillCount=0;
    gameGrid.forEach((box)=>{
        if(box!==""){
            fillCount++;
        }
    });
    if(fillCount==9){
        
            gameInfo.innerHTML="Game Tied Well Played";
            newGamebtn.classList.add("active");
            return;
        
    }
}

newGamebtn.addEventListener("click",()=>{
    initGame();
});
