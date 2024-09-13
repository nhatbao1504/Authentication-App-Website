import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { RegisterComponent } from './pages/register/register.component';
import { AccountComponent } from './pages/account/account.component';
import { authGuard } from './guards/auth.guard';
import { UsersComponent } from './pages/users/users.component';
import { roleGuard } from './guards/role.guard';

export const routes: Routes = [
  {
    path:'',
    component:HomepageComponent
  },
  {
    path:'login',
    component:LoginComponent
  },
  {
    path:'register',
    component:RegisterComponent
  },
  {
    path:'account/:id',
    component:AccountComponent,
    canActivate:[authGuard]
  },
  {
    path:'users',
    component:UsersComponent,
    canActivate:[roleGuard],
    data:{
      roles:['Admin'],
    },
  },
];
