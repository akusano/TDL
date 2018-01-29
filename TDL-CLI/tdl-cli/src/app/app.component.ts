import { Component } from '@angular/core';
import {TDL_API} from './api.api'

@Component({
  selector: 'tdl-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

apiRef: string = TDL_API

}
