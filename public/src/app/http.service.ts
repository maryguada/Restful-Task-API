import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  constructor(private _http: HttpClient) {  
    // this.getTasks();
  }

  getTasks(){
    return this._http.get('/tasks');  }

}
