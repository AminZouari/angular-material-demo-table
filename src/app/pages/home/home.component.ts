import { Component } from '@angular/core';
import { GlobalSignalStoreService } from '../../services/signal/global-signal-store.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {


  constructor(private globalStore : GlobalSignalStoreService){}
  ngOnInit(){
    this.globalStore.isHomePage.set(true);
  }
  ngOnDestroy(){
    this.globalStore.isHomePage.set(false);
  }
}
