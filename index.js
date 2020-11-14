import { infoMove, resetBtn, field, resultBtn, popupResult, closePopupResult, objSel, popup, closeBtn, popupText, time, finish } from './utils/constants.js';
import { playSound } from './utils/song.js';
//import './index.css';

let results =[];
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
let startTime ;
let timer = 0;
let hour = 0,
  min = 0,
  sec = 0;
infoMove.textContent =`Совершено ${moves} ходов.`;

objSel.options[0] = new Option("Размер поля 3*3", "3");
objSel.options[1] = new Option("Размер поля 4*4", "4");
objSel.options[2] = new Option("Размер поля 8*8", "8");

function getResult(){
    if (localStorage.getItem('result') === null) {
        return
    } else results = localStorage.getItem('result');
};

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
        open(popup);
        popupText.textContent = `Вы решили головоломку за ${addZero(hour)}:${addZero(min)}:${addZero(sec)} и ${moves} ходов.`
        results.push({
            moves: moves,
            timer: timer
        });
        localStorage.setItem('result', results);
    }
};

function init(size){   
    const count =size*size-1
    cells = [];
    const numbers = [...Array(count).keys()].sort(()=>Math.random()-0.5);
    field.textContent=''
    for ( let i=0; i<=count-1; i++){
        const value = numbers[i]+1;
        const cell = document.createElement('div');
        const left = i% size;
        const top = (i-left) /size;
        cell.className= 'cell';
        cell.textContent= value;
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
        cell.addEventListener('click', ()=>{move(i)});
        // cell.style.backgroundPositionY = `${25*top+25}%`;
        // cell.style.backgroundPositionX= `${25*left}%`;
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
};

function close(popup) {
    popup.classList.remove("popup_opened");
    // document.removeEventListener("keydown", handleEscClose);
    // document.removeEventListener("click", overlayClose);
  }
//   function  handleEscClose(e) {
//     if (e.key === "Escape") {
//         close();
//     }
//   };
//  function overlayClose(e) {
//     if (e.target.classList.contains("popup")) {
//       close();
//     }
//   };
function open(popup) {
    popup.classList.add("popup_opened");
  // document.addEventListener("keydown", handleEscClose);
  // document.addEventListener("click", overlayClose);
}
function sortGem(item){
    return item.value;
}
function finishGame(){
    cells.sort(function(a,b){
        return sortGem(a)-sortGem(b)
    })
    field.textContent='';
    console.log(cells)
    for ( let i=0; i<=cells.length-2; i++){
        const value = cells[i].value;
        const cell = document.createElement('div');
        const left = i% startSizeField;
        const top = (i-left) /startSizeField;
        cell.className= 'cell';
        cell.textContent= value;
        field.append(cell);
        const gem =document.querySelectorAll('.cell');
        cellSize = document.querySelector('.cell').offsetWidth;
        gem.forEach(item=>{item.style.height = `${cellSize}px`;
            item.style.width = `${cellSize}px`;
        });
        cell.style.left = `${left * cellSize}px`;
        cell.style.top = `${top * cellSize}px`;
        cell.addEventListener('click', ()=>{move(i)});
    }
    isFinished=true
    open(popup);
    popupText.textContent = `Вы решили головоломку за ${addZero(hour)}:${addZero(min)}:${addZero(sec)} и ${moves} ходов.`
        // results.push({
        //     moves: moves,
        //     timer: timer
        // });
        // localStorage.setItem('result', results);
};
 function addZero(n) {
  return (parseInt(n, 10) < 10 ? '0' : '') + n;
};
function showTimer() {
    let today = new Date();
    timer = today - startTime;
    hour = ((timer/360000).toFixed())%60;
    min = ((timer/60000).toFixed())%60;
    sec = ((timer/1000).toFixed())%60;
    time.textContent = `Потрачено времени: ${addZero(hour)}:${addZero(min)}:${addZero(sec)} `;
    let timerTimeout= setTimeout(showTimer, 1000);
    if(isFinished) {
        clearTimeout(timerTimeout);
    }
};
function startTimer(){
    startTime = new Date();
    showTimer();
};

closePopupResult.addEventListener('click', ()=>{close(popupResult)});
resultBtn.addEventListener('click', ()=>{
    popupResult.classList.add('popup_opened');
});
objSel.addEventListener('click', ()=>{
    if(startSizeField == objSel.value) {
        return resetBtn.textContent = `Начать игру заново`; 
    }
    return resetBtn.textContent = `Начать игру с полем ${objSel.value}*${objSel.value}`;
});
resetBtn.addEventListener('click', ()=>{
    startSizeField = objSel.value;
    init(startSizeField);
    resetBtn.textContent = `Начать игру заново`;
    moves = 0;
    infoMove.textContent =`Совершено ${moves} ходов.`;
    startTimer();
});
closeBtn.addEventListener('click', ()=>{
    close(popup);
});
finish.addEventListener('click', finishGame);

startTimer();
init(startSizeField);
getResult();