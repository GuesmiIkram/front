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
        // Check if the content is empty
        if (!this.pub.contenu || this.pub.contenu.trim() === '') {
            this.warningMessage = 'Veuillez saisir une annonce avant de publier.';
            return; // Prevent form submission
        }

        
        this.warningMessage = ''; // Clear warning message
        console.log('Données de la publication:', this.pub);
        
        this.pubService.createpub(this.pub).subscribe({
            next: (response) => {
                this.message = 'Publication effectuée avec succès !';
                console.log(response);

                // Show alert message
                alert(this.message);

                // Redirect to homepage after the alert is dismissed
                this.router.navigate(['/accueil']); // Update the path according to your routing setup
            },
            error: (err) => {
                this.message = 'Une erreur est survenue lors de la publication.';
                console.error(err);
                alert(this.message); // Show alert for error message
            }
        });
    }
}
