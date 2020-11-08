const resetBtn = document.querySelector('.btn__reset');
const infoMove = document.querySelector('.moves');
const field = document.querySelector('.field');
let startSizeField = 3;
let cellSize = 100;
let empty ={
    value: startSizeField*startSizeField,
    top: 0,
    left: 0
};

let cells = [];
let moves = 0;


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
    infoMove.textContent =`Совершено ${moves} шагов.`
    const isFinished = cells.every(cell => {
        console.log(cells)
        return cell.value === cell.top * startSizeField +cell.left+1;

    });
    console.log(isFinished);
    if(isFinished) {
        console.log(1)
        alert('You won');
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
    // console.log(top);
    
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
    infoMove.textContent =`Совершено ${moves} шагов.`;
    startTimer()
});
init(startSizeField);
infoMove.textContent =`Совершено ${moves} шагов.`;

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
function startTimer(){
 startTime = new Date();
 showTime();
}
function showTime() {
  let today = new Date();
  let timer = today - startTime;
  let hour = ((timer/360000).toFixed())%60,
  min = ((timer/60000).toFixed())%60
  sec = ((timer/1000).toFixed())%60;



  // // 12hr Format
  // hour = hour % 12 || 12;
//   weekDay.innerHTML = `${week}, ${day} ${month}.`;
function addZero(n) {
  return (parseInt(n, 10) < 10 ? '0' : '') + n;
}
  // Output Time
  time.innerHTML = `Потрачено времени: ${addZero(hour)}<span>:</span>${addZero(min)}<span>:</span>${addZero(sec)} `;

  setTimeout(showTime, 1000);
}
startTimer();
