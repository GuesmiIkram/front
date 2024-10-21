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

  constructor(private voitureService: VoitureService) {}

  onImageChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.imageFile = file;  // Enregistrer l'image
    }
  }

  onSubmit(): void {
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
  }
}
