import { Component, OnInit } from '@angular/core';
import { ClientService } from '../services/ClientService';
import { ReservationService } from '../services/ReservationService';
import { Reservation } from '../models/Reservation';
import { ChartType } from 'angular-google-charts'; 

@Component({
  selector: 'app-dashboard-client',
  templateUrl: './dashboard-client.component.html',
  styleUrls: ['./dashboard-client.component.css']
})
export class DashboardClientComponent implements OnInit {
  clientName: string = 'Client';
  clientId: string | null = null;

  // Configuration du graphique
  chart = {
    type: ChartType.ColumnChart, // Utilisation du type `ChartType`
    columns: ['Mois', 'Nombre de Réservations'],
    data: [] as [string, number][],
    options: {
      title: 'Réservations par mois',
      legend: { position: 'bottom' },
      hAxis: { title: 'Mois' },
      vAxis: { title: 'Réservations' }
    }
  };

  constructor(
    private clientService: ClientService,
    private reservationService: ReservationService
  ) {}

  ngOnInit(): void {
    this.clientId = localStorage.getItem('userId');
    if (this.clientId) {
      // Charger le nom du client
      this.clientService.getClientById(Number(this.clientId)).subscribe(
        (client) => {
          this.clientName = client.name;
        },
        (error) => {
          console.error('Error retrieving client:', error);
        }
      );

      // Charger les réservations et construire les données du graphique
      this.loadReservations();
    }
  }

  loadReservations(): void {
    this.reservationService.getReservationsByClientId(Number(this.clientId)).subscribe(
      (reservations) => {
        this.chart.data = this.processReservations(reservations);
      },
      (error) => {
        console.error('Error loading reservations:', error);
      }
    );
  }

  processReservations(reservations: Reservation[]): [string, number][] {
    const monthlyData: { [key: string]: number } = {};

    reservations.forEach((reservation) => {
      const month = new Date(reservation.dateDebut).toLocaleString('fr-FR', { month: 'long' });
      monthlyData[month] = (monthlyData[month] || 0) + 1;
    });

    // Convertir en tableau de données compatible avec Google Charts
    return Object.entries(monthlyData).sort((a, b) => new Date(`1 ${a[0]} 2023`).getMonth() - new Date(`1 ${b[0]} 2023`).getMonth());
  }
}
