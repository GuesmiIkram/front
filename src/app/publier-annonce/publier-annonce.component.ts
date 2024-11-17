import { Component } from '@angular/core';
import { VoitureService } from '../services/VoitureService';
import { Voiture } from '../models/Voiture';
import { Disponibilite } from '../models/Disponibilite';

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
      this.imageFile = file;
      this.voiture.imagePath = file.name; 
      console.log(file);  // Enregistrer l'image
    }
  }

  
  addDisponibilite(): void {
    this.voiture.disponibilites.push(new Disponibilite());
  }

  removeDisponibilite(index: number): void {
    this.voiture.disponibilites.splice(index, 1);
  }

  validateDisponibilites(): boolean {
    for (const disponibilite of this.voiture.disponibilites) {
      const dateDebut = new Date(disponibilite.dateDebutDisponibilite);
      const dateFin = new Date(disponibilite.dateFinDisponibilite);
      if (dateDebut > dateFin) {
        this.warningMessage = "La date de début ne peut pas être supérieure à la date de fin dans les disponibilités.";
        return false;
      }
    }
    this.warningMessage = null; // Aucune erreur
    return true;
  }

  onSubmit(): void {
    // Validation des champs requis
    if (!this.voiture.marque || !this.voiture.modele || !this.voiture.annee || 
        !this.voiture.prix || !this.voiture.couleur || 
        !this.voiture.typeCarburant || !this.voiture.nombrePassagers || 
        !this.voiture.nombreChevaux || !this.voiture.nombrePortes || 
        !this.voiture.montantCaution || this.voiture.disponibilites.length === 0) {
      this.message = "Tous les champs doivent être remplis.";
      return;
    }

    const userId = localStorage.getItem('userId');
    if (!userId) {
        this.message = "Utilisateur non connecté.";
        return;
    }

    this.voiture.proprietaireId = Number(userId);

    if (this.validateDisponibilites()) {
      console.log('Données de la voiture :', this.voiture);
      this.voitureService.createVoiture(this.voiture).subscribe(
        (data)=>{
          alert(data);
          const fd : FormData = new FormData();
          fd.append("imageFile",this.imageFile);
          this.voitureService.enregistrerImageVoiture(fd,data).subscribe(
            (data)=>{
              alert(data);
            },
            (error)=>{
              console.log(error.error)
            }
          )
        },
        (error) => {
          this.message = 'Une erreur est survenue lors de la publication.';
          console.error(error);
        }
      );
    } else {
      this.message = "";  // Réinitialiser le message si les disponibilités ne sont pas valides
    }
  }
}