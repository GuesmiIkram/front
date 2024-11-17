import { Component, OnInit } from '@angular/core';
import { ProprietaireService } from '../services/ProprietaireService';

@Component({
  selector: 'app-dashboard-prop',
  templateUrl: './dashboard-prop.component.html',
  styleUrls: ['./dashboard-prop.component.css']
})
export class DashboardPropComponent implements OnInit {
  propName: string = 'Propriétaire'; // Default name before fetching
  propId: string | null = null;

  constructor(private propService: ProprietaireService) {}

  ngOnInit(): void {
    // Retrieve the proprietaire ID from local storage
    this.propId = localStorage.getItem('userId'); 

    if (this.propId ) {
      this.propService.getProprietaireById(Number(this.propId)).subscribe(
        (proprietaire) => {
          this.propName = proprietaire.nom; // assuming 'nom' is the proprietaire's name field
        },
        (error) => {
          console.error('Error retrieving proprietaire:', error);
        }
      );
    }
  }
}
