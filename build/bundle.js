(function(){function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s}return e})()({1:[function(require,module,exports){
'use strict';

// default base blocks
var input = document.querySelector('input');
var btn = document.querySelector('button');
var box = document.querySelector('.box');

// default task array
var tasks = [];

//add events to button 
btn.addEventListener('click', addTask);
// load tasks from localstorage
window.addEventListener('load', loadTasks);

// generate unic id for every task
function makeid() {
    var text = "";
    var possible = "0123456789";
    for (var i = 0; i < 5; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }return text;
}

function saveTasks() {
    localStorage.clear(); // clean storage before save info
    var STORE = JSON.stringify(tasks);
    try {
        localStorage.setItem("tasksList", STORE);
    } catch (err) {
        console.log(err);
    }
}

function loadTasks() {
    var tasksStore = JSON.parse(localStorage.getItem("tasksList"));
    tasks = tasksStore;
    render();
}

function render() {
    // clear parent block for render new data
    box.innerHTML = '';
    tasks.forEach(function (element) {
        var task = document.createElement('div');
        task.className = 'task';
        task.setAttribute('data-key', element.id);
        var task_status = void 0;
        if (element.done) {
            task_status = "checked";
            task.classList.add('complete');
        };
        task.innerHTML = '<input type="checkbox" ' + task_status + '><p>' + element['task'] + '</p><i>X</i>';
        box.appendChild(task);
    });
    // set listener to every element
    var list = document.querySelectorAll('.task');
    list.forEach(function (element) {
        element.addEventListener('click', setCheckTask);
        element.childNodes[2].addEventListener('click', deleteTask);
    });
    saveTasks();
};

function addTask() {
    if (input.value === '') input.value = 'new task...';
    tasks.push({
        id: makeid(),
        task: input.value,
        done: false
    });
    render();
    input.value = ''; // clear input 
};

function deleteTask(e) {
    tasks = tasks.filter(function (element) {
        return element['id'] !== e.target.parentNode.dataset.key;
    });
    render();
};

function setCheckTask() {
    var _this = this;

    // if key === task key -> set checked status to task and set a class, 
    // else remove status and class
    if (this.childNodes[0].checked) {
        this.classList.add('complete');
        tasks.forEach(function (element, index) {
            if (element.id == _this.dataset.key) {
                element.done = true;
            }
        });
    } else {
        this.classList.remove('complete');
        tasks.forEach(function (element, index) {
            if (element.id == _this.dataset.key) {
                element.done = false;
            }
        });
    };
    render();
}

},{}]},{},[1]);
