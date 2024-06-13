import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { USERS } from '../../constants/constant-auth';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  username: string | undefined;
  roles: string[] | undefined;
  isAuthenticated : boolean | undefined ;
  constructor(private router: Router) { }
  /**
   * don't use this approach in production 
   * this is demo application
   * the login check is handled in backend whith a suitable algorithm 
   */
  public checkLogin(username: string, password: string){
    if(USERS[username] && password=="aze"){
      this.username = username;
      this.roles = USERS[username];
      //console.log(this.roles);
      this.isAuthenticated = true;
      return true;
    }
      
    else {
      this.isAuthenticated = false;
      return false;
    }
  
  } 
  public hasAnyRole(authorizedRoles:string[]){
    let test = false;
    if(this.username && this.roles){
      authorizedRoles.forEach((x) => {
        if(this.roles?.includes(x)) test = true;
      })
    }
    return test;
  }
  public logout(){
    this.isAuthenticated = undefined;
    this.username = undefined;
    this.roles = undefined;
    this.router.navigateByUrl("login")
  }
}
