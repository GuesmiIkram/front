import { Component } from '@angular/core';
import { Proprietaire } from '../models/Proprietaire';
import { ProprietaireService } from '../services/ProprietaireService';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-proprietaire',
  templateUrl: './create-proprietaire.component.html',
  styleUrls: ['./create-proprietaire.component.css'],
})
export class CreateProprietaireComponent {
  proprietaire: Proprietaire = {
    nom: '',
    email: '',
    telephone: '',
    password: '',
  };

  warningMessage: string = ''; // Warning message

  constructor(private proprietaireService: ProprietaireService, private router: Router) {}

  onSubmit() {
    // Reset warning message
    this.warningMessage = '';

    // Validate fields
    
    if (!this.isFormValid()) {
      this.warningMessage = 'Tous les champs sont requis et le numéro de téléphone doit être unique et de 8 chiffres.';
      return; // Stop if form is invalid
    }

    // Call service to create Proprietaire
    this.proprietaireService.createProprietaire(this.proprietaire).subscribe(
      (response) => {
          if (response.message) {
              alert(response.message); // Show alert with success message
              this.router.navigate(['/login']); // Redirect to login page
          }
      },
      (error) => {
          console.error('Erreur lors de la création du propriétaire', error);
          this.warningMessage = error.error.error || 'Erreur lors de la création, veuillez réessayer.'; // Handle error with message
      }
  );
  
  }

  isFormValid(): boolean {
    const { nom, email, telephone, password } = this.proprietaire;
    const isTelephoneValid = this.isTelephoneValid(telephone);
    return (
      nom.length > 0 &&
      email.length > 0 &&
      telephone.length > 0 &&
      password.length > 0 &&
      isTelephoneValid
    );
  }

  isTelephoneValid(telephone: string): boolean {
    // Check if telephone is 8 digits long
    return /^\d{8}$/.test(telephone);
  }
}
