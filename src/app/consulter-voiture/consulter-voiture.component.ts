import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Voiture } from '../models/Voiture';
import { VoitureService } from '../services/VoitureService';

@Component({
  selector: 'app-consulter-voiture',
  templateUrl: './consulter-voiture.component.html',
  styleUrls: ['./consulter-voiture.component.css']
})
export class ConsulterVoitureComponent implements OnInit {
  voiture?: Voiture; // Define a variable to hold the car details
  message: string = '';

  constructor(
    private route: ActivatedRoute,
    private voitureService: VoitureService
  ) {}

  ngOnInit(): void {
    this.getVoitureDetails();
  }

  // Method to fetch car details
  getVoitureDetails(): void {
    const id = Number(this.route.snapshot.paramMap.get('id')); // Get the ID from the route
    this.voitureService.getVoitureById(id).subscribe({
      next: (data) => {
        this.voiture = data; // Assign the car data to the variable
      },
      error: (err) => {
        this.message = 'Une erreur est survenue lors de la récupération des détails de la voiture.';
        console.error(err);
      }
    });
  }
}
