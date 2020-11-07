const field = document.querySelector('.field');
const cellSize = 100;
const empty ={
    top: 0,
    left: 0
};

const cells = [];
const moves = 0;

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
    const isFinished = cells.every(cell => {
        return cell.value === cell.top * 4 +cell.left;
    })
    if(isFinished) {
        alert('You won');
    }
}

const numbers = [...Array(15).keys()].sort(()=>Math.random()-0.5);

for ( let i=1; i<=15; i++){
    console.log(numbers);
    const value = numbers[i-1]+1;
    const cell = document.createElement('div');
    cell.className= 'cell';
    cell.textContent= value;

    const left = i% 4;
    const top = (i-left) /4;

    cells.push({
        value: value,
        left: left,
        top: top,
        element: cell
    });

    cell.style.left = `${left * cellSize}px`;
    cell.style.top = `${top * cellSize}px`;

    field.append(cell);

    cell.addEventListener('click', ()=>{move(i)});
}