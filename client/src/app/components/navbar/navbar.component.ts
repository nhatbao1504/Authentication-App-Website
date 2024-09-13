import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { AuthService } from './../../services/auth.service';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, RouterLink } from '@angular/router';
import {MatMenuModule} from '@angular/material/menu'
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, MatIconModule, RouterLink, MatMenuModule, CommonModule, MatSnackBarModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  authService = inject(AuthService);
  matSnackBar = inject(MatSnackBar)
  router = inject(Router);

  isLoggedIn(){
    return this.authService.IsLoggedIn();
  };

  logout=() => {
    this.authService.logout();
    this.matSnackBar.open('Logout success', "Close",{
      duration:5000,
      horizontalPosition:'center'
    });
    this.router.navigate(['/login']);
  };
}
