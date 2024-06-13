import { Injectable } from '@angular/core';
import { Todo } from '../../entities/todo/todo';
import { HttpClient } from '@angular/common/http';
import { TODO_API } from '../../constants/constant-api';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(private http : HttpClient ) { }


  public getAll(): Observable<Array<Todo>>{
   
    return this.http.get<Array<Todo>>(TODO_API);
  }
  public getById(id: number): Observable<Todo>{
    return this.http.get<Todo>(TODO_API+'/'+id)
  }
}
