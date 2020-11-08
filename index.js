const resetBtn = document.querySelector('.btn__reset');
const infoMove = document.querySelector('.moves');
const field = document.querySelector('.field');
let results = [];
let startSizeField = 3;
let cellSize = 100;
let empty ={
    value: startSizeField*startSizeField,
    top: 0,
    left: 0
};

let cells = [];
let moves = 0;
let isFinished= false;

cells.push(empty);
const audio = document.querySelector(`audio[data-key=tink]`);

function playSound(){
  audio.currentTime = 0;
  audio.play();
}

function move(index) {
    const cell = cells[index];
    const leftDiff = Math.abs(empty.left-cell.left);
    const leftTop = Math.abs(empty.top-cell.top);

    if(leftDiff+leftTop> 1){
        return;
    }

    cell.element.style.top= `${empty.top * cellSize}px`;
    cell.element.style.left= `${empty.left * cellSize}px`;
    

    const emptyTop = empty.top;
    const emptyLeft= empty.left;
    empty.left=cell.left;
    empty.top=cell.top;
    cell.top=emptyTop;
    cell.left=emptyLeft;
    moves = moves+1;
    playSound();
    infoMove.textContent =`Совершено ${moves} ходов.`
    isFinished = cells.every(cell => {
        return cell.value === cell.top * startSizeField +cell.left+1;

    });

    if(isFinished) {
        open();
        popupText.textContent = `Вы решили головоломку за ${addZero(hour)}:${addZero(min)}:${addZero(sec)} и ${moves} ходов.`
    }
}

function init(size){
    
const count =size*size-1
cells = [];
const numbers = [...Array(count).keys()].sort(()=>Math.random()-0.5);
field.textContent=''
for ( let i=0; i<=count-1; i++){
    const value = numbers[i]+1;
    const cell = document.createElement('div');
    cell.className= 'cell';
    cell.textContent= value;
    
    const left = i% size;
    const top = (i-left) /size;
    
    cells.push({
        value: value,
        left: left,
        top: top,
        element: cell
    });
    
    field.append(cell);
    cellSize = document.querySelector('.cell').offsetWidth;
    cell.style.left = `${left * cellSize}px`;
    cell.style.top = `${top * cellSize}px`;
    // cell.style.backgroundPositionY = `${25*top+25}%`;
    // cell.style.backgroundPositionX= `${25*left}%`;
    cell.addEventListener('click', ()=>{move(i)});
}
empty ={
    value:size*size,
    left: size-1,
        top: size-1
    };
    cells.push(empty);
const gem =document.querySelectorAll('.cell');
cellSize = document.querySelector('.cell').offsetWidth;
gem.forEach(item=>{item.style.height = `${cellSize}px`;
item.style.width = `${cellSize}px`;

});
field.style.height = `${cellSize*size}px`;
field.style.width = `${cellSize*size}px`;
}

resetBtn.addEventListener('click', ()=>{
    startSizeField = objSel.value;
    init(startSizeField);
    resetBtn.textContent = `Начать игру заново`;
    moves = 0;
    infoMove.textContent =`Совершено ${moves} ходов.`;
    startTimer();
});
init(startSizeField);
infoMove.textContent =`Совершено ${moves} ходов.`;

const objSel = document.getElementById("list");
objSel.options[0] = new Option("Размер поля 3*3", "3");
objSel.options[1] = new Option("Размер поля 4*4", "4");
objSel.options[2] = new Option("Размер поля 8*8", "8");
objSel.addEventListener('click', ()=>{
    if(startSizeField == objSel.value) {
        return resetBtn.textContent = `Начать игру заново`; 
    }
    return resetBtn.textContent = `Начать игру с полем ${objSel.value}*${objSel.value}`;
});

const time = document.querySelector('.time');
let startTime ;
let timer = 0;
let hour = 0,
  min = 0,
  sec = 0;
function startTimer(){
 startTime = new Date();
 showTimer();
}
function addZero(n) {
  return (parseInt(n, 10) < 10 ? '0' : '') + n;
}
function showTimer() {
  let today = new Date();
  timer = today - startTime;
  hour = ((timer/360000).toFixed())%60;
  min = ((timer/60000).toFixed())%60;
  sec = ((timer/1000).toFixed())%60;
  time.textContent = `Потрачено времени: ${addZero(hour)}:${addZero(min)}:${addZero(sec)} `;
  let timerTimeout= setTimeout(showTimer, 1000);
    if(isFinished) {
        clearTimeout(timerTimeout);}
    }
startTimer();

const popup = document.querySelector('.popup');
const closeBtn = document.querySelector('.popup__close');
const popupText = document.querySelector('.popup__text');
closeBtn.addEventListener('click', ()=>{
    close();
})
function close() {
    popup.classList.remove("popup_opened");
    document.removeEventListener("keydown", this._handleEscClose);
    document.removeEventListener("click", this._overlayClose);
  }
  function  handleEscClose(e) {
    if (e.key === "Escape") {
        close();
    }
  };
 function overlayClose(e) {
    if (e.target.classList.contains("popup")) {
      close();
    }
  };
  function open() {
    popup.classList.add("popup_opened");
    document.addEventListener("keydown", this._handleEscClose);
    document.addEventListener("click", this._overlayClose);
  }