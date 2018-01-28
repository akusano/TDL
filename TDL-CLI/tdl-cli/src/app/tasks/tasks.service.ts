import {Injectable} from  "@angular/core"
import {Http, Headers, RequestOptions} from '@angular/http'

import {Observable} from 'rxjs/Observable'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'
import{Task} from "./task/task.model"
import {TDL_API} from "../API.API"
import {ErroHandler} from "../app.error-handler"

@Injectable()
export class TaskService{
   constructor(private http: Http ){}

      getTasks(): Observable<Task[]>{
        return this.http.get(`${TDL_API}/tasks/`)
        .map(response => response.json());
      }

      addNewTask(task: Task) : Observable<Task>
      {
        const headers = new Headers()
        headers.append('Content-Type','application/json')
         return this.http.post(`${TDL_API}/tasks/`,JSON.stringify(task), new RequestOptions({headers: headers}))
            .map(response=> response.json())
      }

      saveTask(task: Task) : Observable<Task>
      {
        const headers = new Headers()
        headers.append('Content-Type','application/json')
         return this.http.put(`${TDL_API}/tasks/${task.Id}`,JSON.stringify(task), new RequestOptions({headers: headers}))
            .map(response=> response.json())
      }

      deleteTask(id: number) : Observable<Task>
      {
        const headers = new Headers()

        headers.append('Content-Type','application/json')
         return this.http.delete(`${TDL_API}/tasks/${id}`, new RequestOptions({headers: headers}))
            .map(response=> response.json())
      }

}
