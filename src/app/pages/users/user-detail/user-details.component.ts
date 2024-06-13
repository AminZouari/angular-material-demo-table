import { Component } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { UserService } from '../../../services/user/user.service';
import { Subscription } from 'rxjs';
import { User } from '../../../entities/user/user';

@Component({
  selector: 'app-user-details',
  standalone: true,
  imports: [],
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.css'
})
export class UserDetailsComponent {
  subscription!: Subscription
  userId!: string;
  user!: User;
  error: boolean = false;
  constructor(private route: ActivatedRoute, private userService: UserService){
  }

  ngOnInit(){
    this.userId = this.route.snapshot.params['id'];
    this.handleGetUser(Number(this.userId));
  }
  handleGetUser(id: number){
    this.subscription = this.userService.getById(id).subscribe({
      next: (data) => {
        this.user = data;
      },
      error: (err) => this.error = true
  });
  }
}
