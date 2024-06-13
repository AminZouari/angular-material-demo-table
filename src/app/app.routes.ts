import { Routes } from '@angular/router';
import { ProductsComponent } from './pages/products/products.component';
import { CustomersComponent } from './pages/customers/customers.component';
import { LoginComponent } from './pages/login/login.component';
import { AppComponent } from './app.component';
import { AdminComponent } from './pages/admin/admin.component';
import { HomeComponent } from './pages/home/home.component';
import { authenticationGuard } from './guards/authentication/authentication.guard';
import { authorizationGuard } from './guards/authorization/authorization.guard';
import { UserTableComponent } from './pages/users/user-table/user-table.component';
import { TodoTableComponent } from './pages/todos/todo-table/todo-table.component';
import { UserDetailsComponent } from './pages/users/user-detail/user-details.component';

export const routes: Routes = [
    {path:"admin",component:AdminComponent,
     title:"Admin",
     canActivate:[authenticationGuard,authorizationGuard],  
     data: {roles:['ADMIN','EDITOR']} ,
        
     children: [
        {path:"products",component:ProductsComponent},
        {path:"customers",component:CustomersComponent},
        {path:"users", component: UserTableComponent},
        {path:"users/:id", component: UserDetailsComponent},
        {path:"todos", component: TodoTableComponent}
     ]},
    
    {path:"", component:HomeComponent},
    {path:"login", component:LoginComponent}

];
