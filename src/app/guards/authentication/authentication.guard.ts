import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { PROTECTED_ROUTE_LIST } from '../../constants/constant-auth';



export const authenticationGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  
  const authService = inject(AuthenticationService);
  const router = inject(Router);
  // if(PROTECTED_ROUTE_LIST.includes(state.url) && authService.isAuthenticated){
  //   return true;
  // }
  if(authService.isAuthenticated){
    return true;
  }
  else{
    router.navigateByUrl('login');
    return false;
  }
};
