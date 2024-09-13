import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from './../services/auth.service';
import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const roleGuard: CanActivateFn = (route, state) => {
  const roles = route.data["roles"] as string[];
  const authService = inject(AuthService);
  const matSnackbar = inject(MatSnackBar);
  const router = inject(Router);
  const userRoles = authService.getRoles();

  if(!authService.IsLoggedIn()){
    router.navigate(['/login']);
    matSnackbar.open("You must login first!", "Ok", {
      duration:5000,
    });

    return false;
  }

  if(roles.some((role)=>userRoles?.includes(role))) {return true;}
  router.navigate(['/']);
  matSnackbar.open('You dont have permission to view this page', 'Ok', {
    duration:5000,
  });

  return false;
};

