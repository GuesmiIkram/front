import { Component, OnInit } from '@angular/core';
import { Reservation } from '../models/Reservation';
import { ReservationService } from '../services/ReservationService';
import { Voiture } from '../models/Voiture';
import { VoitureService } from '../services/VoitureService';
import { AuthService } from '../services/auth.service';
import { AvisClientService } from '../services/AvisClientService';

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
  avisModalVisible: boolean = false;
avisContenu: string = '';
avisNote: number = 5;
currentReservation: Reservation | null = null;
avisClients: { [key: number]: any[] } = {};
avisModalVisibles: boolean = false;
selectedClientId: number | null = null;

  constructor(
    private authService: AuthService,
    private reservationService: ReservationService,
    private avisClientService: AvisClientService,
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
  openAvisModal(reservation: Reservation): void {
    this.currentReservation = reservation;
    this.avisModalVisible = true;
}

closeAvisModal(): void {
    this.avisModalVisible = false;
    this.avisContenu = '';
    this.avisNote = 5;
    this.currentReservation = null;
}

submitAvis(): void {
  console.log("Contenu de l'avis avant envoi:", this.avisContenu);
    if (this.currentReservation) {
        const avis = {
            contenu: this.avisContenu.trim(),
            note: this.avisNote,
            client: { id: this.currentReservation.clientId },
            proprietaire: { id: this.currentReservation.proprietaireId },
            reservation: { id: this.currentReservation.id},
          
        };
        console.log('Avis envoyé :', avis); 

        this.avisClientService.ajouterAvisClient(avis).subscribe(
            (response) => {
                console.log("Avis ajouté avec succès :", response);
                this.closeAvisModal();
            },
            (error) => {
                console.error("Erreur lors de l'ajout de l'avis :", error);
            }
        );
    }
}
fetchAvisForClient(clientId: number): void {
  this.selectedClientId = clientId;
  this.avisClientService.getAvisByClientId(clientId).subscribe(
    (avisList) => {
      this.avisClients[clientId] = avisList;
      this.avisModalVisibles = true;
    },
    (error) => {
      console.error("Erreur lors de la récupération des avis :", error);
    }
  );
}
closeAvisModals(): void {
  this.avisModalVisibles = false;
  this.selectedClientId = null;
}
onNoteChange(event: any): void {
  console.log('Nouvelle note sélectionnée :', event.target.value);
  this.avisNote = +event.target.value; // Assurez-vous que c'est un nombre
}



}
