import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Http, HttpModule } from '@angular/http'

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { TaskComponent } from './tasks/task/task.component';
import {FormsModule} from   '@angular/forms';
import { TasksComponent } from './tasks/tasks.component'
import { TaskService } from './tasks/tasks.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,

    TaskComponent,
    TasksComponent
  ],
  imports: [
    BrowserModule,HttpModule,FormsModule
  ],
  providers: [TaskService],
  bootstrap: [AppComponent]
})
export class AppModule { }
