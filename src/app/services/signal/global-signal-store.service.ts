import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class GlobalSignalStoreService {
  isMenuOpened = signal(true);
  isToolBarShowed = signal(true);
  isHomePage = signal(false);
  constructor() { }
  
  public toogleMenu(){
    
    
    this.isMenuOpened.update((value) => !value);
  }

 
  public toogleToolBar(){
    this.isToolBarShowed.update((value) => !value);
  }

 
}
