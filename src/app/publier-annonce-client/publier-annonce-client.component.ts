import { Component } from '@angular/core';
import { Router } from '@angular/router'; // Import Router
import { pub } from '../models/pub';
import { pubService } from '../services/pubService';

@Component({
    selector: 'app-publier-annonce-client',
    templateUrl: './publier-annonce-client.component.html',
    styleUrls: ['./publier-annonce-client.component.css']
})
export class PublierAnnonceClientComponent {
    pub: pub = new pub();
    message: string = '';
    warningMessage: string = '';

    constructor(private pubService: pubService, private router: Router) {} // Inject Router

    

    onSubmit(): void {
        if (!this.pub.contenu || this.pub.contenu.trim() === '') {
            this.warningMessage = 'Veuillez saisir une annonce avant de publier.';
            return;
        }
    
        this.warningMessage = ''; 
        const userId = localStorage.getItem('userId');
        if (!userId) {
            this.message = "Utilisateur non connecté.";
            return;
        }
    
        this.pub.idClient = Number(userId); 
        console.log('ID du client:', this.pub.idClient); 
        console.log('Données de la publication avant envoi:', this.pub);
        this.pubService.createpub(this.pub).subscribe({
            next: (response) => {
                console.log('Réponse de l\'API:', response); 
                this.message = 'Publication effectuée avec succès !';
                alert(this.message);
                this.router.navigate(['/dashboardClient']);
            },
            error: (err) => {
                console.error('Erreur lors de la publication:', err);
                this.message = 'Une erreur est survenue lors de la publication.';
                alert(this.message);
            }
        });
    }
    
}
