import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { Router } from '@angular/router';
import { GlobalSignalStoreService } from '../../services/signal/global-signal-store.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,MatFormFieldModule,MatCardModule,MatInputModule,MatButtonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  loginFormGroup! : FormGroup;

  constructor(private formBuilder: FormBuilder,
     public authService: AuthenticationService,
     public globalStore: GlobalSignalStoreService,
    private router: Router) {}
  ngOnInit(): void {
    this.loginFormGroup = this.formBuilder.group({
      username : this.formBuilder.control(''),
      password: this.formBuilder.control('')
    })
    this.globalStore.toogleToolBar();
    // this.router.events.subscribe(() => {
    //   if(this.router.url && this.router.url==='/login')
    //     this.isToolBarShowed.set(false);
    //   // console.log(this.currentRoute);
    // });
  }

  handleLogin() {
    let username = this.loginFormGroup.value.username;
    let password = this.loginFormGroup.value.password;
    let isAuthenticated = this.authService.checkLogin(username,password);
    if(isAuthenticated ){
      this.authService.hasAnyRole(['ADMIN','EDITOR']) 
      ? this.router.navigateByUrl("/admin/todos") 
      : this.router.navigateByUrl("")
    }
  }
  ngOnDestroy(){
    this.globalStore.toogleToolBar();

  }

}
