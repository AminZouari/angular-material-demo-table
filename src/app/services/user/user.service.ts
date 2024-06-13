import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { USER_API } from '../../constants/constant-api';
import { Observable } from 'rxjs';
import { User } from '../../entities/user/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  public getById(id :number): Observable<User>{
    return this.http.get<User>(USER_API+`/${id}`)
  }
  
}
