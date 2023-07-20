const pName = document.getElementById('ProcessName');
const pBurstTime = document.getElementById('ProcessBurstTime');
const pPriority = document.getElementById('ProcessPriority');
const pTimeQuantum = document.getElementById('ProcessTimeQuantum');
const addBtn = document.getElementById('AddButton');
const showBtn = document.getElementById('ShowButton');
const clrBtn = document.getElementById('ClearButton');
const rstBtn = document.getElementById('ResetButton');
const pListTable = document.querySelector('#JobsTable > table > tbody');
const fcfsDiv = document.getElementById('FCFS');
let gcCount = 0;

window.onbeforeunload = () => resetPage();
window.onload = () => pName.focus();

function addProcess() {
    if (pName.value == "" || pBurstTime.value == "") {
        alert("Please enter all the fields with proper inputs!!");
    }
    else {
        let process = document.createElement('tr');
        process.innerHTML = `<td>${pName.value}</td><td>${pBurstTime.value}</td><td>${pPriority.value}</td></tr>`;
        pListTable.appendChild(process);
        clearEntries();
    }
}

function showGanttCharts() {
    if (gcCount >= 1)
        clearGanttCharts();
    else {
        gcCount++;
    }
    let processTime = 0, randomColor = 0, burstTime = 0, totalTime = 0;
    let process = document.createElement('div');
    process.setAttribute('class', "GanttChart");
    for (tableRow = 0; tableRow < pListTable.childElementCount; tableRow++) {
        randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
        burstTime = parseInt(pListTable.children[tableRow].children[1].textContent);
        let pWidth = 30*burstTime;
        if(pWidth>=200)
            pWidth=150;
        else if(pWidth>=150)
            pWidth=100;
        else if(pWidth>=100)
            pWidth=80;
        process.innerHTML += `
            <span><sup>${processTime}</sup></span>
            <p style="width: ${pWidth}px; background-color: ${randomColor}">${pListTable.children[tableRow].children[0].textContent}</p>`;
        totalTime += processTime;
        processTime += burstTime;
    }
    process.innerHTML += `
            <span><sup>${processTime}</sup></span>`
    fcfsDiv.appendChild(process);
    fcfsDiv.children[1].textContent += (totalTime / (pListTable.childElementCount)).toString();
}

function clearEntries() {
    pName.value = "";
    pBurstTime.value = "";
    pPriority.value = "";
    pName.focus();
}

function resetPage() {
    clearEntries();
    pTimeQuantum.value = "";
    pListTable.innerHTML = "";
    processCount = 0;
    clearGanttCharts();
    gcCount = 0;
    fcfsDiv.children[1].textContent = "Average Waiting Time: ";
}

function clearGanttCharts() {
    fcfsDiv.removeChild(fcfsDiv.children[2]);
    fcfsDiv.children[1].textContent = "Average Waiting Time: ";
}