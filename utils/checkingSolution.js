export function checkingSolution (array, size) {
    let sum = 0;
    if(size%2==0){
        sum +=+size;
    }
    array.forEach((element, index) => {
        for(let i = index+1; i<array.length; i++){
            if(element > array[i]){
                sum +=1;
            }
        }
    });
    return(sum);
}