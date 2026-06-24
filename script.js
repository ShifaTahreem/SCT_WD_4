// Elements

const taskInput = document.getElementById("taskInput");

const dateInput = document.getElementById("dateInput");

const timeInput = document.getElementById("timeInput");

const addBtn = document.getElementById("addBtn");

const taskList = document.getElementById("taskList");

const totalTasks = document.getElementById("totalTasks");

const completedTasks = document.getElementById("completedTasks");

const themeBtn = document.getElementById("themeBtn");





// Load saved tasks

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];





// Display tasks

function displayTasks(){


    taskList.innerHTML = "";


    tasks.forEach((task,index)=>{


        const li = document.createElement("li");

        li.className = "task";


        if(task.completed){

            li.classList.add("completed");

        }



        li.innerHTML = `


        <div class="task-info">


            <div class="task-text">

            ${task.title}

            </div>



            <div class="task-date">


            📅 ${task.date || "No Date"}

            ⏰ ${task.time || "No Time"}


            </div>


        </div>





        <div class="actions">


            <button class="complete"
            onclick="completeTask(${index})">

            ✔

            </button>



            <button class="edit"
            onclick="editTask(${index})">

            ✏

            </button>



            <button class="delete"
            onclick="deleteTask(${index})">

            ✖

            </button>


        </div>



        `;



        taskList.appendChild(li);


    });



    updateStats();


    saveTasks();


}








// Add Task

addBtn.addEventListener("click",()=>{


    const title = taskInput.value.trim();


    if(title === ""){

        alert("Please enter a task");

        return;

    }



    const task = {


        title:title,

        date:dateInput.value,

        time:timeInput.value,

        completed:false


    };



    tasks.push(task);



    taskInput.value="";

    dateInput.value="";

    timeInput.value="";



    displayTasks();



});








// Complete Task

function completeTask(index){


    tasks[index].completed =

    !tasks[index].completed;


    displayTasks();


}









// Edit Task

function editTask(index){


    const newTask = prompt(

    "Edit your task:",

    tasks[index].title

    );



    if(newTask && newTask.trim() !== ""){


        tasks[index].title = newTask;


        displayTasks();


    }


}








// Delete Task

function deleteTask(index){


    tasks.splice(index,1);


    displayTasks();


}








// Update Counters

function updateStats(){


    totalTasks.innerText = tasks.length;



    completedTasks.innerText =

    tasks.filter(task=>task.completed).length;


}








// Save

function saveTasks(){


    localStorage.setItem(

    "tasks",

    JSON.stringify(tasks)

    );


}








// Dark Mode

themeBtn.addEventListener("click",()=>{


    document.body.classList.toggle("dark");



    themeBtn.innerText =

    document.body.classList.contains("dark")

    ?

    "☀"

    :

    "🌙";


});








// Initial Load

displayTasks();