import { Component, OnInit, Input } from '@angular/core';
import {Task} from "./task/task.model"
import {TaskService} from "./tasks.service"

@Component({
  selector: 'tdl-tasks',
  templateUrl: './tasks.component.html'
})

export class TasksComponent implements OnInit {
@Input() tasks: Task[]


  constructor(private taskService: TaskService) { }
  interval: any;

  ngOnInit() {
      this.refreshData();
      this.interval = setInterval(() => {
          this.refreshData();
      }, 5000);
  }

  refreshData(){
    this.taskService.getTasks()
    .subscribe(tasks=> this.tasks = tasks);
  }

  addNewTask(task: Task)
  {
    this.taskService.addNewTask(task)
    .subscribe((r: Task) => {
      this.tasks.push(r);
    });
  }

  deleteTask(task: Task)
  {
    this.taskService.deleteTask(task.Id)
    .subscribe((r: Task) => {
      this.refreshData();
    });
  }



}
