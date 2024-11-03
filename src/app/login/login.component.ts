import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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

    constructor(private http: HttpClient, private router: Router) {}

    login() {
        const loginData = {
            telephone: this.telephone,
            password: this.password
        };
    
        this.http.post('http://localhost:8081/api/proprietaires/login', loginData).subscribe(
            (response: any) => {  // Assume que la réponse contient l'ID de l'utilisateur
                console.log('Login successful:', response);
                localStorage.setItem('userId', response.proprietaireId);  // Sauvegarder l'ID
                this.router.navigate(['/publier-annonce']);
            },
            error => {
                console.error('Login failed:', error);
                this.errorMessage = 'Échec de la connexion.';
            }
        );
    }
    
}


