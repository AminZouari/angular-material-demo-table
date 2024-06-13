import { Component, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterModule, RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIcon } from '@angular/material/icon';
import { MatDrawer, MatDrawerContainer, MatDrawerContent, MatSidenavModule } from '@angular/material/sidenav';
import { MatList, MatListItem, MatNavList } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import { AuthenticationService } from './services/authentication/authentication.service';
import { NgIf } from '@angular/common';
import { GlobalSignalStoreService } from './services/signal/global-signal-store.service';
import { Subscribable, Subscription } from 'rxjs';

export interface Authentication {
  username: string,
  roles: string[]
}
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule,
    MatToolbarModule,  
    MatButtonModule,
    MatMenuModule,
    MatSidenavModule,
    MatList,
    MatIcon, 
    MatDrawer, 
    MatNavList,
    MatListItem,
    NgIf
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'AngularMaterialTable';
  loginUrlSubscription!: Subscription
  currentRoute!: string;
  constructor(public authService: AuthenticationService,
    public globalSignalStoreService: GlobalSignalStoreService,
   
  ){
  }

  ngOnInit(){
  
      // this.loginUrlSubscription = this.route.url.subscribe((url) => {
      //   console.log(url[0].path)
      //   this.isToolBarShowed.set( url[0].path !== 'login');
      // });
     
      // console.log(this.route.snapshot.url[0])
      // let currentPath = this.route.snapshot.url[0]?.path
      
      
    
  }
  handleLogout(){
    this.authService.logout();
   
  }

  ngOnDestroy(){
    this.loginUrlSubscription.unsubscribe();
  }
}
