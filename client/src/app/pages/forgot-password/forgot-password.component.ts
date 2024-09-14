import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [FormsModule, MatSnackBarModule, MatIconModule],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css'
})
export class ForgotPasswordComponent {
  email!: string;
  authService = inject(AuthService);
  matSnackBar = inject(MatSnackBar);
  showEmailSent = false;
  isSubmitting = false;

  forgotPassword() {
    this.isSubmitting = true;
    this.authService.forgotPassword(this.email).subscribe({
      next: (response) => {
        if (response.isSuccess) {
          this.matSnackBar.open(response.message, "Close", {
            duration: 5000
          })
          this.showEmailSent = true;
        } else {
          this.matSnackBar.open(response.message, "Close", {
            duration: 5000,
          });
        }
      },
      error: (error: HttpErrorResponse) => {
        this.matSnackBar.open(error.message, "Close", {
          duration: 5000
        });
      },
      complete:() => {
        this.isSubmitting = false;
      }
    })
  }
}
