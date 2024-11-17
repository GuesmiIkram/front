// login.component.ts
import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  telephone: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    const loginData = {
      telephone: this.telephone,
      password: this.password
    };

    this.authService.loginWithPhone(loginData).subscribe({
      next: (response: any) => {
        console.log('Login successful:', response);
        localStorage.setItem('userId', response.proprietaireId);
        this.router.navigate(['/dashboardProp']);
      },
      error: error => {
        console.error('Login failed:', error);
        this.errorMessage = 'Échec de la connexion.';
      }
    });
  }
}
