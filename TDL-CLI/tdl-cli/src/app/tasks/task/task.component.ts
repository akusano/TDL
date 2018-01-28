import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import {Task} from "./task.model"
import {TaskService} from "../tasks.service"

@Component({
  selector: 'tdl-task',
  templateUrl: './task.component.html'
})
export class TaskComponent implements OnInit {
@Output() delete = new EventEmitter<Task>();
@Input() task: Task

  constructor(private taskService: TaskService) { }

  ngOnInit() {

  }

  taskToggle()
  {
    this.task.Done = !this.task.Done;
    this.taskService.saveTask(this.task)
    .subscribe((r: Task) => {
    });
  }

deleteTask()
{
  if(confirm(`Atenção, a tarefa '${this.task.Name}' será excluída, prosseguir?`))
  {
    this.delete.next(this.task);
  }
}

}
