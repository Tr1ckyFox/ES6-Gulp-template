
let tasks = [
    {id: 25456, task: "Test task for this", done: false}
];

window.addEventListener('load',loadTasks);

const input = document.querySelector('input');
const btn = document.querySelector('button');
const box = document.querySelector('.box');

btn.addEventListener('click', addTask);

function makeid() {
    var text = "";
    var possible = "0123456789";
    for (var i = 0; i < 5; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
  
    return text;
}

function saveTasks(){
    localStorage.clear();
    let STORE = JSON.stringify(tasks);
    try {
        localStorage.setItem("tasksList", STORE);
    } catch (err) {
        console.log(err)
    }
    
}

function loadTasks(){
    let tasksStore = JSON.parse(localStorage.getItem("tasksList"));
    tasks = tasksStore;
    render();
}

function render(){

    // обнуляем содержимое блока
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

    let list = document.querySelectorAll('.task');
    list.forEach(element => {
        element.addEventListener('click',setCheckTask);
        element.childNodes[2].addEventListener('click',deleteTask);
    });

    saveTasks()

};

function addTask(){
    if(input.value==='') input.value=`new task # ${tasks.length+1}`;
    
    tasks.push({
        id: makeid(),
        task: input.value,
        done: false
    })

    render();
    input.value='';

};

function deleteTask(e){

    tasks = tasks.filter((element)=>{
        return element['id'] !== e.target.parentNode.dataset.key;
    })
    console.log(tasks)
    render();  
    
};

function setCheckTask(){
   // если ключ совпадает, то ставим статус таска - готов, иначе убираем его
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


