import { Component, OnInit } from '@angular/core';
import { ReservationService } from '../services/ReservationService';
import { ChartType } from 'angular-google-charts';
import { ProprietaireService } from '../services/ProprietaireService';

@Component({
  selector: 'app-dashboard-prop',
  templateUrl: './dashboard-prop.component.html',
  styleUrls: ['./dashboard-prop.component.css'],
})
export class DashboardPropComponent implements OnInit {
  propName: string = 'Propriétaire';
  propId: string | null = null;

  // Graphique en barres (Réservations par mois)
  barChartOptions = {
    title: 'Réservations par mois',
    hAxis: { title: 'Mois' },
    vAxis: { title: 'Nombre de Réservations' },
    legend: 'none',
  };
  barChartType: ChartType = ChartType.BarChart; // Correction ici
  barChartData: [string, number][] = [];

  // Graphique circulaire (Paiements)
  doughnutChartOptions = {
    title: 'Paiements',
    pieHole: 0.4,
    legend: { position: 'bottom' },
  };
  doughnutChartType: ChartType = ChartType.PieChart; // Ajout de cette propriété
  doughnutChartData: [string, number][] = []; // Données pour Google Charts

  constructor(private reservationService: ReservationService,private propService: ProprietaireService) {}

  ngOnInit(): void {
    this.propId = localStorage.getItem('userId');

    if (this.propId) {

      this.propService.getProprietaireById(Number(this.propId)).subscribe(
        (proprietaire) => {
          this.propName = proprietaire.nom; // assuming 'nom' is the proprietaire's name field
        },
        (error) => {
          console.error('Error retrieving proprietaire:', error);
        }
      );
      this.reservationService.getReservationsByProprietaireId(Number(this.propId)).subscribe(
        (reservations) => {
          const reservationsByMonth = Array(12).fill(0);
          let paid = 0, unpaid = 0;

          reservations.forEach((reservation) => {
            const month = new Date(reservation.dateDebut).getMonth(); // Mois
            reservationsByMonth[month]++;
            if (reservation.montantPaye >= reservation.montantTotal) {
              paid++;
            } else {
              unpaid++;
            }
          });

          // Préparer les données pour le graphique en barres
          const months = [
            'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
            'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
          ];
          this.barChartData = months.map((month, index) => [month, reservationsByMonth[index]]);

          // Préparer les données pour le graphique circulaire
          this.doughnutChartData = [
            ['Payé', paid],
            ['Non Payé', unpaid],
          ];
        },
        (error) => {
          console.error('Erreur lors de la récupération des données :', error);
        }
      );
    }
  }
}
