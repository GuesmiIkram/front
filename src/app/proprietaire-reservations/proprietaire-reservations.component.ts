import { Component, OnInit } from '@angular/core';
import { Reservation } from '../models/Reservation';
import { ReservationService } from '../services/ReservationService';
import { Voiture } from '../models/Voiture';
import { VoitureService } from '../services/VoitureService';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-proprietaire-reservations',
  templateUrl: './proprietaire-reservations.component.html',
  styleUrls: ['./proprietaire-reservations.component.css']
})
export class ProprietaireReservationsComponent implements OnInit {
  reservations: Reservation[] = [];
  proprietaireId: number;
  voitures: { [key: number]: Voiture } = {};
  modalVisible: boolean = false;

  constructor(
    private authService: AuthService,
    private reservationService: ReservationService,
    private voitureService: VoitureService
  ) {
    // Retrieve owner ID from local storage
    this.proprietaireId = parseInt(localStorage.getItem('userId') || '0', 10);
  }

  ngOnInit(): void {
    if (this.proprietaireId) {
      this.reservationService.getReservationsByProprietaireId(this.proprietaireId).subscribe(
        (data: Reservation[]) => {
          this.reservations = data;
          // Load car details after reservations have been fetched
          this.loadCarDetails();
        },
        (error) => {
          console.error("Erreur lors de la récupération des réservations :", error);
        }
      );
    }
  }
  openModal() {
    this.modalVisible = true;
  }
  signOut(): void {
    localStorage.clear();
    this.authService.signOut();
  }
  
  loadCarDetails() {
    this.reservations.forEach((reservation) => {
      if (reservation.voitureId && !this.voitures[reservation.voitureId]) {
        this.voitureService.getVoitureById(reservation.voitureId).subscribe(
          (voiture: Voiture) => {
            console.log('Fetched voiture:', voiture);
            this.voitures[reservation.voitureId] = voiture;
          },
          (error) => {
            console.error("Erreur lors de la récupération de la voiture :", error);
          }
        );
      }
    });
  }
}
