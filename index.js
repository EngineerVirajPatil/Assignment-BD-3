const express = require('express');
const { resolve } = require('path');

const app = express();
const port = 3000;

let tasks = [
  { taskId: 1, text: 'Fix bug #101', priority: 2 },
  { taskId: 2, text: 'Implement feature #202', priority: 1 },
  { taskId: 3, text: 'Write documentation', priority: 3 }
];

let cors = require('cors');

app.use(cors());

function addTaskToTheList(tasks,task){
   tasks.push(task);
   return tasks;
}

function sortByPriorityInAscending(task1,task2){
 return task1.priority-task2.priority;
}

function editPriorityByTaskId(tasks,taskId,priority){
  for(let i=0;i<tasks.length;i++){
    if(tasks[i].taskId===taskId){
       tasks[i].priority=priority;
    }     
  }
  return tasks;
}

function editTextByTaskId(tasksCopy,taskId,text){
  for(let i=0;i<tasksCopy.length;i++){
    if(tasksCopy[i].taskId===taskId){
      tasksCopy[i].text=text;
    }     
  }
  return tasksCopy;
}

function deleteTaskByTaskId(taskObj,taskId){
  return taskObj.taskId!=taskId;
}

function filterTaskByPriority(taskObj,priority){
  return taskObj.priority===priority;
}

// /tasks/add?taskId=4&text=Review%20code&priority=1
app.get('/tasks/add',(req, res)=>{
 let taskId=parseInt(req.query.taskId);
 let text=req.query.text;
 let priority=parseInt(req.query.priority);
 let task={taskId:taskId, text:text, priority:priority};
 let tasksCopy=tasks.slice();
 let result=addTaskToTheList(tasksCopy,task);
 res.json({tasks:result});
})

// /tasks
app.get('/tasks',(req, res)=>{
  res.json({tasks:tasks});
 })

 // /tasks/sort-by-priority
app.get('/tasks/sort-by-priority',(req, res)=>{
 let result=tasks.sort(sortByPriorityInAscending);
 res.json({tasks:result});
})


// /tasks/edit-priority?taskId=1&priority=1
app.get('/tasks/edit-priority',(req, res)=>{
 let taskId=parseInt(req.query.taskId);
 let priority=parseInt(req.query.priority);
 let tasksCopy=tasks.slice();
 let result=editPriorityByTaskId(tasksCopy,taskId,priority);
 res.json({tasks:result});
})

// /tasks/edit-text?taskId=3&text=Update%20documentation
app.get('/tasks/edit-text',(req, res)=>{
  let taskId=parseInt(req.query.taskId);
  let text=req.query.text;
  let tasksCopy=tasks.slice();
  let result=editTextByTaskId(tasksCopy,taskId,text);
  res.json({tasks:result});
 })

 // /tasks/delete?taskId=2
 app.get('/tasks/delete',(req, res)=>{
  let taskId=parseInt(req.query.taskId);
  let tasksCopy=tasks.slice();
  let result=tasksCopy.filter(taskObj=>deleteTaskByTaskId(taskObj,taskId));
  res.json({tasks:result});
 })

 // /tasks/filter-by-priority?priority=1
 app.get('/tasks/filter-by-priority',(req, res)=>{
  let priority=parseInt(req.query.priority);
  let result=tasks.filter(taskObj=>filterTaskByPriority(taskObj,priority));
  res.json({tasks:result});
 })

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
