// default base blocks
const input = document.querySelector('input');
const btn = document.querySelector('button');
const box = document.querySelector('.box');

// default task array
let tasks = [];

//add events to button 
btn.addEventListener('click', addTask);
// load tasks from localstorage
window.addEventListener('load',loadTasks);

// generate unic id for every task
function makeid() {
    let text = "";
    let possible = "0123456789";
    for (let i = 0; i < 5; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length)
    );
    return text;
}

function saveTasks(){
    localStorage.clear(); // clean storage before save info
    let STORE = JSON.stringify(tasks);
    try {
        localStorage.setItem("tasksList", STORE);
    } catch (err) {
        console.log(err);
    }
};

function loadTasks(){
    let tasksStore = JSON.parse(localStorage.getItem("tasksList"));
    (tasksStore) ? tasks = tasksStore : tasks.push({
        id: makeid(),
        task: 'Learn JS...',
        done: false
    });
    render()   
};

function render(){
    // clear parent block for render new data
    box.innerHTML = '';
    tasks.forEach(element => {
        let task = document.createElement('div');
        task.className = 'task';
        task.setAttribute('data-key',element.id);
        let task_status;
        if (element.done) {
            task_status="checked"
            task.classList.add('complete');
        };
        task.innerHTML = `<input type="checkbox" ${task_status}><p>${element['task']}</p><i>X</i>`;
        box.appendChild(task);
    });
    // set listener to every element
    let list = document.querySelectorAll('.task');
    list.forEach(element => {
        element.addEventListener('click',setCheckTask);
        element.childNodes[2].addEventListener('click',deleteTask);
    });
    saveTasks();
};

function addTask(){
    if(input.value==='') input.value=`new task...`;
    
    tasks.push({
        id: makeid(),
        task: input.value,
        done: false
    })
    render();
    console.log(tasks)
    input.value='';// clear input 
};

function deleteTask(e){
    tasks = tasks.filter((element)=>{
        return element['id'] !== e.target.parentNode.dataset.key;
    })
    render();  
};

function setCheckTask(){
    // if key === task key -> set checked status to task and set a class, 
    // else remove status and class
    if (this.childNodes[0].checked) {
       this.classList.add('complete');
        tasks.forEach((element,index)=>{
           if(element.id == this.dataset.key) {
               element.done = true;
           } 
        });
    } else {
        this.classList.remove('complete');
        tasks.forEach((element,index)=>{
            if(element.id == this.dataset.key) {
                element.done = false;
            } 
        });
    };
    render();
}


