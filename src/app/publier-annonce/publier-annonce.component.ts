import { Component } from '@angular/core';
import { VoitureService } from '../services/VoitureService';
import { Voiture } from '../models/Voiture';

@Component({
  selector: 'app-publier-annonce',
  templateUrl: './publier-annonce.component.html',
  styleUrls: ['./publier-annonce.component.css']
})
export class PublierAnnonceComponent {
  voiture: Voiture = new Voiture();
  imageFile!: File;  // Image sélectionnée
  message: string = '';
  warningMessage: string | null = null;  // Message d'avertissement

  constructor(private voitureService: VoitureService) {}

  onImageChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.imageFile = file;  // Enregistrer l'image
    }
  }
  

  validateDates(): boolean {
    const dateDebut = new Date(this.voiture.dateDebutDisponibilite);
    const dateFin = new Date(this.voiture.dateFinDisponibilite);
    if (dateDebut > dateFin) {
      this.warningMessage = "La date de début ne peut pas être supérieure à la date de fin.";
      return false;
    }
    this.warningMessage = null; // Aucune erreur
    return true;
  }

  onSubmit(): void {
    // Validation des champs requis
    if (!this.voiture.marque || !this.voiture.modele || !this.voiture.annee || 
        !this.voiture.prix || !this.voiture.couleur || !this.voiture.etat || 
        !this.voiture.typeCarburant || !this.voiture.nombrePassagers || 
        !this.voiture.nombreChevaux || !this.voiture.nombrePortes || 
        !this.voiture.dateDebutDisponibilite || !this.voiture.dateFinDisponibilite ||
        !this.voiture.montantCaution) {
      this.message = "Tous les champs doivent être remplis.";
      return;
    }

    if (this.validateDates()) {
      console.log('Données de la voiture :', this.voiture);
      this.voitureService.createVoiture(this.voiture, this.imageFile).subscribe({
        next: (response) => {
          this.message = 'Voiture publiée avec succès !';
          console.log(response);
        },
        error: (err) => {
          this.message = 'Une erreur est survenue lors de la publication.';
          console.error(err);
        }
      });
    } else {
      this.message = "";  // Réinitialiser le message si les dates ne sont pas valides
    }
  }
}
