import { Component, OnInit } from '@angular/core';
import { Voiture } from '../models/Voiture';
import { VoitureService } from '../services/VoitureService';
import { ReservationService } from '../services/ReservationService';
import { Reservation } from '../models/Reservation';
import { loadStripe, Stripe } from '@stripe/stripe-js';
import { PaymentService } from '../services/PaymentService';

@Component({
  selector: 'app-consulter-offres',
  templateUrl: './consulter-offres.component.html',
  styleUrls: ['./consulter-offres.component.css']
})
export class ConsulterOffresComponent implements OnInit {
  voitures: Voiture[] = [];
  filteredVoitures: Voiture[] = [];
  message: string = '';
  filterDateDebut: string = '';
  filterDateFin: string = '';
  carImages: { [key: number]: string } = {};
  showReservationForm: boolean = false;
  selectedVoiture: Voiture | null = null;
  reservationDateDebut: string = '';
  reservationDateFin: string = '';
  private stripePromise = loadStripe('pk_test_51PGQGIBlDGjUzagjgVk02tco77GknvJN3I0534Ti0p3kEioMtW9uLqzWmCx4XpEhHDEUTK7b7NK0RSn8o0dyuU0O00Z4xbhRW2');
  clientSecret: string | null = null;

  constructor(
    private voitureService: VoitureService,
    private payementService: PaymentService,
    private reservationService: ReservationService
  ) {}

  ngOnInit(): void {
    this.getVoitures();
    
  }

  getVoitures(): void {
    this.voitureService.getVoitures().subscribe({
      next: (data) => {
        this.voitures = data;
        this.filteredVoitures = data;
        this.filteredVoitures.forEach(voiture => {
          if (voiture && voiture.id) {
            this.fetchCarImage(voiture.id);
          }
        });
      },
      error: (err) => {
        this.message = 'Une erreur est survenue lors de la récupération des offres.';
        console.error(err);
      }
    });
  }
  fetchCarImage(id: number) {
    this.voitureService.getImageVoitureById(id).subscribe((imageBlob) => {
      const objectURL = URL.createObjectURL(imageBlob);
      this.carImages[id] = objectURL;
    });
  }

  filtrerVoitures(): void {
    if (!this.filterDateDebut || !this.filterDateFin) {
      this.filteredVoitures = this.voitures;
      return;
    }

    const dateDebut = new Date(this.filterDateDebut);
    const dateFin = new Date(this.filterDateFin);

    if (isNaN(dateDebut.getTime()) || isNaN(dateFin.getTime()) || dateDebut > dateFin) {
      this.message = "Veuillez saisir une période valide.";
      this.filteredVoitures = [];
      return;
    }

    this.filteredVoitures = this.voitures.filter(voiture => {
      return voiture.disponibilites.some(dispo => {
        const dispoDebut = new Date(dispo.dateDebutDisponibilite);
        const dispoFin = new Date(dispo.dateFinDisponibilite);
        return (dateDebut <= dispoFin && dateFin >= dispoDebut);
      });
    });

    this.message = this.filteredVoitures.length === 0 ? "Aucune voiture disponible pour les dates sélectionnées." : '';
  }

  openReservationForm(voiture: Voiture): void {
    this.selectedVoiture = voiture;
    this.showReservationForm = true;
    this.loadStripeForm((voiture.prix /3)*100);
  }

  async loadStripeForm(amount: number): Promise<void> {
    const stripe = await this.stripePromise;
    if (!stripe) {
      console.error("Stripe n'a pas été chargé correctement.");
      return;
    }

    // Appel pour créer le PaymentIntent
    this.payementService.createPaymentIntent(amount).subscribe({
      next: (response) => {
        this.clientSecret = response.clientSecret;

        const cardContainer = document.getElementById('card-element');
        if (cardContainer) {
          // Nettoie le contenu avant le montage
          cardContainer.innerHTML = '';
        }

        const elements = stripe.elements();
        const cardElement = elements.create('card');
        cardElement.mount('#card-element');

        const form = document.getElementById('payment-form');
        form?.addEventListener('submit', async (event) => {
          event.preventDefault();
          const result = await stripe.confirmCardPayment(this.clientSecret || '', {
            payment_method: { card: cardElement }
          });

          if (result.error) {
            console.error(result.error.message);
            this.message = 'Erreur de paiement : ' + result.error.message;
          } else {
            if (result.paymentIntent && result.paymentIntent.status === 'succeeded') {
              console.log('Paiement réussi!');
              this.submitReservation();
            }
          }
        });
      },
      error: (err) => {
        console.error("Erreur lors de la création du PaymentIntent :", err);
        this.message = 'Erreur lors de la préparation du paiement. Veuillez réessayer.';
      }
    });
  }

  submitReservation(): void {
    if (!this.selectedVoiture || !this.reservationDateDebut || !this.reservationDateFin) {
      this.message = 'Veuillez sélectionner les dates de début et de fin.';
      return;
    }

    const dateDebut = new Date(this.reservationDateDebut);
    const dateFin = new Date(this.reservationDateFin);

    if (isNaN(dateDebut.getTime()) || isNaN(dateFin.getTime()) || dateDebut >= dateFin) {
      this.message = 'Veuillez saisir une période valide.';
      return;
    }

    const isDateValid = this.selectedVoiture.disponibilites.some(dispo => {
      const dispoDebut = new Date(dispo.dateDebutDisponibilite);
      const dispoFin = new Date(dispo.dateFinDisponibilite);
      return dateDebut >= dispoDebut && dateFin <= dispoFin;
    });

    if (!isDateValid) {
      this.message = 'Les dates de réservation dépassent la période de disponibilité de cette voiture.';
      return;
    }

    const nombreJours = Math.ceil((dateFin.getTime() - dateDebut.getTime()) / (1000 * 60 * 60 * 24));
    const montantTotal = nombreJours * (this.selectedVoiture?.prix || 0);
    const montantPaye = montantTotal / 3;

    const reservation = new Reservation(
      0,
      this.selectedVoiture.id || 0,
      this.selectedVoiture.proprietaireId || 0,
      parseInt(localStorage.getItem('userId') || '0', 10),
      this.reservationDateDebut,
      this.reservationDateFin,
      montantTotal,
      montantPaye
    );

    this.reservationService.reserverVoiture(reservation).subscribe({
      next: () => {
        this.message = 'Réservation réussie !';
        this.showReservationForm = false;
        this.selectedVoiture = null;
      },
      error: (err) => {
        this.message = 'Erreur lors de la réservation. Veuillez réessayer.';
        console.error("Erreur lors de la réservation :", err);
      }
    });
  }
  closeReservationForm() {
    this.showReservationForm = false;
  }
  cancelReservation(): void {
    this.showReservationForm = false;
    this.selectedVoiture = null;
    this.message = '';
  }}
  