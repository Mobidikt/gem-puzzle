export function gemStyle (size, cellSize) {
    const gem =document.querySelectorAll('.cell');
    cellSize = document.querySelector('.cell').offsetWidth;
    gem.forEach(item=>{
        let backgroundSize = 0;
        item.style.backgroundSize = '';
        const scale = 100/size;
        if(size == 3) {
            backgroundSize = 400;
        } else if (size == 4) {
            backgroundSize = 500;
        } else {
            backgroundSize = 900;
        }
        const number = item.textContent;
        const left = number% size;
        const top = (number-left) /size;
        item.style.height = `${cellSize}px`;
        item.style.width = `${cellSize}px`;
        item.style.backgroundSize = `${backgroundSize}%`;
        if(number%size == 0){
            item.style.backgroundPositionY = `${scale*top}%`;
        } else {item.style.backgroundPositionY = `${scale*top+scale}%`;}
        item.style.backgroundPositionX= `${scale*left-scale}%`;
    });
}