const generateNewArrayEl = document.getElementById('new_array');
const dialogBox = document.getElementById('dialog_box');
const arraySize = document.getElementById('arraySize');
const okDialogBox = document.getElementById('okDialogButton');
const closeDialogBox = document.getElementById('closeDialogButton');
const speedInput = document.getElementById('speed');
const bubbleSortEl = document.getElementById('bubble_sort');
const insertionSortEl = document.getElementById('insertion_sort');
const selectionSortEl = document.getElementById('selection_sort');
const mergeSortEl = document.getElementById('merge_sort');
const quickSortEl = document.getElementById('quick_sort');
const barsContainerEl = document.getElementById('bars_container');
const containerEl = document.getElementById('container');

let min = 20;
let max = 400;
let noOfBars = 0;
let unsortedArray;
let s = Number(speedInput.value);
let speed = 1000 / s;
let initialized = false;

speedInput.addEventListener('input', function () {
    s = Number(speedInput.value);
    speed = 1000 / s;
});

function createRandomArray() {
    noOfBars = Number(arraySize.value);
    unsortedArray = new Array(noOfBars);
    for(let i=0; i<noOfBars; i++) {
        unsortedArray[i] = Math.floor(Math.random() * (max - min + 1)) + min;
    }
    // unsortedArray = [400];
}

function renderBars(arr) {
    for(let i=0; i<arr.length; i++) {
        let bar = document.createElement('div');
        bar.className = 'bar';
        bar.style.height = `${arr[i]}px`;
        barsContainerEl.appendChild(bar);
    }
}

function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

function disableButtons() {
    generateNewArrayEl.disabled = true;
    bubbleSortEl.disabled = true;
    insertionSortEl.disabled = true;
    selectionSortEl.disabled = true;
    mergeSortEl.disabled = true;
    quickSortEl.disabled = true;
}

function enableButtons() {
    generateNewArrayEl.disabled = false;
    bubbleSortEl.disabled = false;
    insertionSortEl.disabled = false;
    selectionSortEl.disabled = false;
    mergeSortEl.disabled = false;
    quickSortEl.disabled = false;
}

async function bubbleSort(arr, n){
    disableButtons()
    let bars = document.getElementsByClassName('bar');

    var i, j, temp;
    var swapped;
    for (i = 0; i <= n - 1; i++){
        swapped = false;
        for (j = 0; j < n - i - 1; j++){
            bars[j].style.backgroundColor = 'blueViolet';
            bars[j+1].style.backgroundColor = 'blueViolet';
            if (arr[j] > arr[j + 1]) 
            {
                // Swap arr[j] and arr[j+1]
                temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
                bars[j].style.height = `${arr[j]}px`;
                // bars[j].textContent = ` ${arr[j]}`;
                bars[j+1].style.height = `${arr[j+1]}px`;
                // bars[j+1].textContent = ` ${arr[j+1]}`;
                swapped = true;
            }
            await sleep(speed);
            bars[j].style.backgroundColor = 'purple';
            bars[j+1].style.backgroundColor = 'purple';
        }
        bars[n - i - 1].style.backgroundColor = 'blue';
        if(i == n-1)
            break;
        await sleep(speed);

        // IF no two elements were 
        // swapped by inner loop, then break
        if (swapped == false) {
            for(let k=0; k<n - i - 1; k++) {
                bars[k].style.backgroundColor = 'blue';
            }
            break;
        }
    }

    enableButtons();
}

async function insertionSort(arr, n){
    disableButtons()
    let bars = document.getElementsByClassName('bar');
    bars[0].style.backgroundColor = 'blue';

    for (let i = 1; i < arr.length; i++) {
        let key = arr[i];
        bars[i].style.backgroundColor = 'blueViolet';
        await sleep(speed);
        let j = i - 1;

        /* Move elements of arr[0..i-1], that are
           greater than key, to one position ahead
           of their current position */
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            bars[j + 1].style.height = `${arr[j]}px`;
            bars[j+1].style.backgroundColor = 'blueViolet';
            await sleep(speed);
            bars[j+1].style.backgroundColor = 'blue';
            j--;
        }
        arr[j + 1] = key;
        bars[j + 1].style.height = `${key}px`;
        bars[j+1].style.backgroundColor = 'blueViolet';
        await sleep(speed);
        bars[i].style.backgroundColor = 'blue';
        bars[j+1].style.backgroundColor = 'blue';
    }
    
    enableButtons();
}

async function selectionSort(arr, n){
    disableButtons()
    let bars = document.getElementsByClassName('bar');
    for (let i = 0; i <= n - 1; i++) {
    
        // Assume the current position holds
        // the minimum element
        let min_idx = i;
        bars[i].style.backgroundColor = 'blue';
        if(i == n-1)
            continue;
        
        // Iterate through the unsorted portion
        // to find the actual minimum
        for (let j = i + 1; j < n; j++) {
            bars[j].style.backgroundColor = 'blueViolet';
            if (arr[j] < arr[min_idx]) {
            
                // Update min_idx if a smaller element is found
                min_idx = j;
            }
            await sleep(speed);
            bars[j].style.backgroundColor = 'purple';
        }
        bars[min_idx].style.backgroundColor = 'blueViolet';
        await sleep(speed);
        // Move minimum element to its
        // correct position
        let temp = arr[i];
        arr[i] = arr[min_idx];
        arr[min_idx] = temp;
        bars[i].style.height = `${arr[i]}px`;
        bars[min_idx].style.height = `${arr[min_idx]}px`;
        bars[i].style.backgroundColor = 'blueViolet';
        bars[min_idx].style.backgroundColor = 'purple';
        await sleep(speed);
        bars[i].style.backgroundColor = 'blue';
    }   
    
    enableButtons();
}

async function merge(arr, left, mid, right) {
    let bars = document.getElementsByClassName('bar');
    const n1 = mid - left + 1;
    const n2 = right - mid;

    // Create temp arrays
    const L = new Array(n1);
    const R = new Array(n2);

    // Copy data to temp arrays L[] and R[]
    for (let i = 0; i < n1; i++) {
        L[i] = arr[left + i];
    }

    for (let j = 0; j < n2; j++) {
        R[j] = arr[mid + 1 + j];
    }

    let i = 0, j = 0;
    let k = left;

    // Merge the temp arrays back into arr[left..right]
    while (i < n1 && j < n2) {
        if (L[i] <= R[j]) {
            arr[k] = L[i];
            i++;
        } else {
            arr[k] = R[j];
            j++;
        }
        k++;
    }

    // Copy the remaining elements of L[], if there are any
    while (i < n1) {
        arr[k] = L[i];
        i++;
        k++;
    }

    // Copy the remaining elements of R[], if there are any
    while (j < n2) {
        arr[k] = R[j];
        j++;
        k++;
    }

    bars[mid].style.marginRight = "2px";
    bars[mid+1].style.marginLeft = "2px";

    for(let i=left; i<k; i++) {
        bars[i].style.height = `${arr[i]}px`;
    }
}

async function mergeSort_implement(arr, left, right) {                 
    let bars = document.getElementsByClassName('bar');
    if (left >= right)                                
        return;

    const mid = Math.floor(left + (right - left) / 2);

    bars[mid].style.marginRight = "5px";
    bars[mid+1].style.marginLeft = "5px";
    await sleep(speed);

    // await mergeSort_implement(arr, left, mid);
    // await mergeSort_implement(arr, mid + 1, right);

    // run concurrently
    await Promise.all([
        mergeSort_implement(arr, left, mid),
        mergeSort_implement(arr, mid + 1, right)
    ]);

    await sleep(speed);
    merge(arr, left, mid, right);
}

async function mergeSort(arr, left, right) {
    let bars = document.getElementsByClassName('bar');
    disableButtons();
    await mergeSort_implement(arr, left, right);
    for(let i=0; i<bars.length; i++) {
        bars[i].style.backgroundColor = "blue";
    }
    enableButtons();
}

// Partition function
async function partition(arr, low, high)
{
    let bars = document.getElementsByClassName('bar');   
    console.log('hello');

    // Choose the pivot
    let pivot = arr[high];
    bars[high].style.backgroundColor = "pink";

    // Index of smaller element and indicates
    // the right position of pivot found so far
    let i = low - 1;
    bars[low].classList.add("denotei");

    // Traverse arr[low..high] and move all smaller
    // elements to the left side. Elements from low to
    // i are smaller after every iteration
    for (let j = low; j <= high - 1; j++) {
        bars[j].style.backgroundColor = "blueViolet";
        await sleep(speed);
        if (arr[j] < pivot) {
            i++;
            swap(arr, i, j);
            await sleep(speed);
            bars[i].classList.remove("denotei");;
        }
        bars[i+1].classList.add("denotei");
        bars[j].style.backgroundColor = "purple";
    }

    // Move pivot after smaller elements and
    // return its position
    await sleep(speed);
    swap(arr, i + 1, high);
    bars[high].style.backgroundColor = "purple";
    bars[i+1].classList.remove("denotei");
    bars[i+1].style.backgroundColor = "blue";
    await sleep(speed);

    return i + 1;
}

// Swap function
function swap(arr, i, j)
{
    let bars = document.getElementsByClassName('bar');   
    let temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
    bars[i].style.height = `${arr[i]}px`;
    bars[j].style.height = `${arr[j]}px`;
}

// The QuickSort function implementation
async function quickSort_implement(arr, low, high)
{
    let bars = document.getElementsByClassName('bar');   
    if (low < high) {

        // pi is the partition return index of pivot
        let pi = await partition(arr, low, high);

        // Recursion calls for smaller elements
        // and greater or equals elements
        // await quickSort_implement(arr, low, pi - 1);
        // await quickSort_implement(arr, pi + 1, high);

        // running concurrently
        await Promise.all([
            quickSort_implement(arr, low, pi - 1), // Sort left partition
            quickSort_implement(arr, pi + 1, high) // Sort right partition
        ]);
    } else {
        bars[low].style.backgroundColor = "blue";
    }
}

async function quickSort(arr, low, high) {
    disableButtons();
    await quickSort_implement(arr, low, high);
    enableButtons();
}

generateNewArrayEl.addEventListener('click', ()=> {
    barsContainerEl.innerHTML = " ";
    dialogBox.showModal();
});

okDialogBox.addEventListener('click', ()=> {
    dialogBox.close();
    initialized = true;
    createRandomArray();
    renderBars(unsortedArray);
});

closeDialogBox.addEventListener('click', ()=> {
    dialogBox.close();
});

bubbleSortEl.addEventListener('click', ()=> {
    if(initialized)
        bubbleSort(unsortedArray, noOfBars);
});

insertionSortEl.addEventListener('click', ()=> {
    if(initialized)
        insertionSort(unsortedArray, noOfBars);
});

selectionSortEl.addEventListener('click', ()=> {
    if(initialized)
        selectionSort(unsortedArray, noOfBars);
});

mergeSortEl.addEventListener('click', ()=> {
    if(initialized)
        mergeSort(unsortedArray, 0, noOfBars-1);
});

quickSortEl.addEventListener('click', ()=> {
    if(initialized)
        quickSort(unsortedArray, 0, noOfBars-1);
});

















