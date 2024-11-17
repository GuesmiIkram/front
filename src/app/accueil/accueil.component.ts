import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})
export class AccueilComponent {
  isLoading: boolean = false;
  errorMessage: string = '';
  constructor(private authService: AuthService, private router: Router) {}
  modalVisible: boolean = false;

  openModal() {
    this.modalVisible = true;
  }
  signOut(): void {
    localStorage.clear();
    this.authService.signOut();
  }
  
  closeModal() {
    this.modalVisible = false;
  }
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
              this.router.navigate(['/publier-annonce-client']);
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
  }
  


