import { Component, OnInit } from '@angular/core';
import { HttpService } from './http.service'; 
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Testing This!';
  tasks = []; 
  constructor(private _httpService: HttpService){
  }
  // ngOnInit runs right after the constructor method 
  ngOnInit(){
    this.getTasksFromService()
  }

  getTasksFromService(){
    let observable = this._httpService.getTasks()
    observable.subscribe(data => {
      console.log("Got our data!", data)
      this.tasks = data['tasks']; 
    })
  }
}

