const resetBtn = document.querySelector('.btn__reset');

const body = document.querySelector('.root');
const infoMove = body.querySelector('.moves');
const field = document.querySelector('.field');
let sizeField = 3;
let cellSize = 100;
let empty ={
    top: 0,
    left: 0
};

let cells = [];
let moves = 0;


cells.push(empty);

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
    infoMove.textContent =`Совершено ${moves} шагов.`
    const isFinished = cells.every(cell => {
        return cell.value === cell.top * 4 +cell.left;
    })
    if(isFinished) {
        console.log(1)
        alert('You won');
    }
}

function init(size){
    empty ={
    top: 0,
    left: 0
};
const count =size*size-1
cells = [];
cells.push(empty);
const numbers = [...Array(count).keys()].sort(()=>Math.random()-0.5);
        field.innerHTML=''
for ( let i=1; i<=count; i++){
    const value = numbers[i-1]+1;
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
const gem =document.querySelectorAll('.cell');
cellSize = document.querySelector('.cell').offsetWidth;
console.log(cellSize);
gem.forEach(item=>{item.style.height = `${cellSize}px`;
item.style.width = `${cellSize}px`;

});
field.style.height = `${cellSize*size}px`;
field.style.width = `${cellSize*size}px`;
}

resetBtn.addEventListener('click', ()=>{
    init(sizeField);
    moves = 0;
    infoMove.textContent =`Совершено ${moves} шагов.`;
});
init(3);
infoMove.textContent =`Совершено ${moves} шагов.`;

const objSel = document.getElementById("list");
objSel.options[0] = new Option("Размер поля 3*3", "3");
objSel.options[1] = new Option("Размер поля 4*4", "4");
objSel.options[2] = new Option("Размер поля 8*8", "8");
objSel.addEventListener('click', ()=>{
    sizeField = objSel.value;
})