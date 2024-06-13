import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatListItem, MatNavList } from '@angular/material/list';
import { MatDrawer, MatSidenavModule } from '@angular/material/sidenav';
import { RouterModule, RouterOutlet } from '@angular/router';
import { GlobalSignalStoreService } from '../../services/signal/global-signal-store.service';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [MatDrawer,MatListItem,
    MatNavList,MatSidenavModule,
    RouterModule,MatButtonModule

     ],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {
  constructor(public globalSignalStore: GlobalSignalStoreService) {}
}
