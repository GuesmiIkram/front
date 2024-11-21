import { Component, OnInit } from '@angular/core';
import { Reservation } from '../models/Reservation';
import { ReservationService } from '../services/ReservationService';
import { PaymentService } from '../services/PaymentService';
import { loadStripe, Stripe } from '@stripe/stripe-js';
import { Voiture } from '../models/Voiture';
import { VoitureService } from '../services/VoitureService';
import { ProprietaireService } from '../services/ProprietaireService';
import { Proprietaire } from '../models/Proprietaire';
import { Router } from '@angular/router';
import { AvisProprietaireService } from '../services/AvisProprietaireService';

@Component({
  selector: 'app-client-reservations',
  templateUrl: './client-reservations.component.html',
  styleUrls: ['./client-reservations.component.css']
})
export class ClientReservationsComponent implements OnInit {
  reservations: Reservation[] = [];
  modalVisible: boolean = false;
  showPaymentForm: boolean = false;
  secondInstallmentAmount: number = 0;
  selectedReservation!: Reservation;
  stripe: Stripe | null = null;
  paymentSuccess: boolean = false;
  paymentError: boolean = false;
  reservedVoiture!: Voiture;
  p!: Proprietaire;
  voituresMap: { [key: number]: Voiture } = {};
  proprietairesMap: { [key: number]: Proprietaire } = {};
  paymentMessage: string = '';
  avisModalVisible: boolean = false;
  avisModalVisibles: boolean = false;
  avisContenu: string = '';
  avisNote: number = 5; 
  currentReservation: Reservation | null = null;
  avisProprietaires: { [key: number]: any[] } = {};
  selectedProprietaireId: number | null = null;
  constructor(
    private reservationService: ReservationService,
    private paymentService: PaymentService,
    private voitureService: VoitureService, 
    private proprietaireService: ProprietaireService,
    private avisProprietaireService: AvisProprietaireService,
    private router: Router
  ) {}

  async ngOnInit(): Promise<void> {
    this.stripe = await loadStripe('pk_test_51PGQGIBlDGjUzagjgVk02tco77GknvJN3I0534Ti0p3kEioMtW9uLqzWmCx4XpEhHDEUTK7b7NK0RSn8o0dyuU0O00Z4xbhRW2');

    if (!this.stripe) {
      console.error("Stripe failed to load.");
      return;
    }

    this.loadReservations();
  }

  async loadReservations(): Promise<void> {
    const clientId = Number(localStorage.getItem('userId'));
    this.reservationService.getReservationsByClientId(clientId).subscribe(
      async (data) => {
        this.reservations = data;

        // Promises pour charger les voitures et les propriétaires
        const voiturePromises = this.reservations.map(reservation => {
          return this.voitureService.getVoitureById(reservation.voitureId).toPromise().then(
            (voiture) => {
              if (voiture) {  // Vérifier si la voiture est récupérée
                this.voituresMap[reservation.voitureId] = voiture;
              } else {
                console.error('Voiture non trouvée pour la réservation:', reservation.voitureId);
              }
            }
          );
        });

        const proprietairePromises = this.reservations.map(reservation => {
          return this.proprietaireService.getProprietaireById(reservation.proprietaireId).toPromise().then(
            (proprietaire) => {
              if (proprietaire) {  // Vérifier si le propriétaire est récupéré
                this.proprietairesMap[reservation.proprietaireId] = proprietaire;
              } else {
                console.error('Propriétaire non trouvé pour la réservation:', reservation.proprietaireId);
              }
            }
          );
        });

        // Attend que toutes les voitures et propriétaires soient chargés
        await Promise.all([...voiturePromises, ...proprietairePromises]);
        console.log('Toutes les données ont été chargées');
      },
      (error) => {
        console.error('Erreur lors de la récupération des réservations:', error);
      }
    );
  }

  paySecondInstallment(reservation: Reservation): void {
    this.voitureService.getVoitureById(reservation.voitureId).subscribe(
      (voiture) => {
        if (voiture) {
          this.reservedVoiture = voiture;
          console.log('Reserved car details:', this.reservedVoiture);
        } else {
          console.error('Erreur: Voiture non trouvée');
        }
      },
      (error) => {
        console.error('Erreur lors de la récupération de la voiture réservée:', error);
      }
    );

    this.selectedReservation = reservation;
    this.secondInstallmentAmount = reservation.montantTotal - reservation.montantPaye + this.reservedVoiture.montantCaution;
    this.showPaymentForm = true;
    this.paymentSuccess = false;
    this.paymentError = false;
    this.loadStripeCardElement();
  }

  loadStripeCardElement(): void {
    const elements = this.stripe!.elements();
    const cardElement = elements.create('card');
    cardElement.mount('#card-element');
  }

  async submitPayment(): Promise<void> {
    if (!this.stripe) {
      console.error("Stripe is not loaded.");
      return;
    }

    try {
      const response = await this.paymentService.createPaymentIntent(this.secondInstallmentAmount).toPromise();
      const clientSecret = response.clientSecret;

      const elements = this.stripe!.elements();
      const cardElement = elements.getElement('card') || elements.create('card');
      cardElement.mount('#card-element');

      const { error } = await this.stripe!.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: { name: 'Client Name' } // Remplacez par le nom réel du client
        }
      });

      if (error) {
        this.paymentError = true;
        console.error('Échec du paiement:', error);
      } else {
        this.showPaymentForm = false;
        this.selectedReservation.montantPaye += this.secondInstallmentAmount;
        this.voitureService.updateVoitureStateToPayer(this.selectedReservation.voitureId).subscribe(
          () => {
            console.log('Statut de la voiture mis à jour avec succès');
            
            this.paymentSuccess = true;
           
            
          },
          (error) => {
            console.error('Échec de la mise à jour du statut de la voiture:', error);
            this.paymentError = true;
          }
        );
        
        this.paymentMessage = 'Paiement effectué avec succès !';
     
         this.router.navigate(['/accueil']);      
       
      }
    } catch (err) {
      this.paymentError = true;
      console.error('Erreur lors du traitement du paiement:', err);
    }
  }

  refreshReservations(): void {
    const clientId = Number(localStorage.getItem('userId'));
    this.reservationService.getReservationsByClientId(clientId).subscribe(
      (data) => {
        this.reservations = data;
      },
      (error) => {
        console.error('Erreur lors de la mise à jour des réservations:', error);
      }
    );
  }

  openModal() {
    this.modalVisible = true;
  }

  signOut(): void {
    localStorage.clear();
  }

  closeModal() {
    this.modalVisible = false;
  }

  openAvisModal(reservation: Reservation): void {
    this.currentReservation = reservation;
    this.avisModalVisible = true;
}
closeAvisModal(): void {
  this.avisModalVisible = false;
  this.avisContenu = '';
  
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
      reservation: { id: this.currentReservation.id }
    };
    console.log("Note sélectionnée :", this.avisNote);
    console.log('Avis envoyé :', avis); 

    this.avisProprietaireService.ajouterAvisProprietaire(avis).subscribe(
      (response) => {
        console.log('Avis ajouté avec succès:', response);
        this.closeAvisModal();
      },
      (error) => {
        console.error('Erreur lors de l\'ajout de l\'avis:', error);
      }
    );
  }
}
fetchAvisForProprietaire(proprietaireId: number): void {
  this.selectedProprietaireId = proprietaireId;
  this.avisProprietaireService.getAvisByProprietaireId(proprietaireId).subscribe(
    (avisList) => {
      this.avisProprietaires[proprietaireId] = avisList;
      this.avisModalVisibles = true;
    },
    (error) => {
      console.error('Erreur lors de la récupération des avis:', error);
    }
  );
}
closeAvisModals(): void {
  this.avisModalVisibles = false;
  this.selectedProprietaireId = null;
}
onNoteChange(event: any): void {
  console.log('Nouvelle note sélectionnée :', event.target.value);
  this.avisNote = +event.target.value; // Assurez-vous que c'est un nombre
}

}
