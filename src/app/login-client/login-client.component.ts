// login-client.component.ts
import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-client',
  templateUrl: './login-client.component.html',
  styleUrls: ['./login-client.component.css']
})
export class LoginClientComponent {
  isLoading: boolean = false;
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  signInWithFB(): void {
    this.isLoading = true;
    this.authService.signInWithFacebook()
      .then(userData => {
        if (userData) {
          const clientData = {
            id: userData.id,
            name: userData.name,
            email: userData.email,
            profilePicture: userData.photoUrl
          };
          this.authService.registerClient(clientData).subscribe({
            next: (response: any) => {
              localStorage.setItem('userId', response.id.toString());
              console.log('Client logged in or registered:', response);
              this.router.navigate(['/dashboardClient']);
            },
            error: error => {
              console.error('Login/Registration failed:', error);
              this.errorMessage = 'Failed to register or log in. Please try again.';
            },
            complete: () => {
              this.isLoading = false;
            }
          });
        } else {
          this.errorMessage = 'Failed to log in with Facebook.';
          this.isLoading = false;
        }
      })
      .catch(error => {
        this.errorMessage = 'Facebook login failed: ' + error;
        this.isLoading = false;
      });
  }

  signOut(): void {
    this.authService.signOut();
  }
}
