// src/app/consulter-offres/consulter-offres.component.ts
import { Component, OnInit } from '@angular/core';
import { Voiture } from '../models/Voiture';
import { VoitureService } from '../services/VoitureService';


@Component({
  selector: 'app-consulter-offres',
  templateUrl: './consulter-offres.component.html',
  styleUrls: ['./consulter-offres.component.css']
})
export class ConsulterOffresComponent implements OnInit {
  voitures: Voiture[] = [];
  message: string = '';
  filterDateDebut: string; // Declare filterDateDebut
  filterDateFin: string;   


  

  constructor(private voitureService: VoitureService) { this.filterDateDebut = '';
    this.filterDateFin = '';}

  ngOnInit(): void {
    this.getVoitures();
  }

  // Méthode pour récupérer les voitures
  getVoitures(): void {
    this.voitureService.getVoitures().subscribe({
      next: (data) => {
        this.voitures = data;
      },
      error: (err) => {
        this.message = 'Une erreur est survenue lors de la récupération des offres.';
        console.error(err);
      }
    });
  }

  filtrerVoitures(): void {
    const dateDebut = new Date(this.filterDateDebut);
    const dateFin = new Date(this.filterDateFin);

    this.voitures = this.voitures.filter(voiture => {
      const debutDisponibilite = new Date(voiture.dateDebutDisponibilite);
      const finDisponibilite = new Date(voiture.dateFinDisponibilite);

      // Vérification si les dates se chevauchent avec les dates de filtre
      return (
        debutDisponibilite <= dateFin && finDisponibilite >= dateDebut
      );
    });
  }
}
