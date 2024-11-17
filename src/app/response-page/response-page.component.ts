import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
 // Update the import to `CustomResponse`
import { ResponseService } from '../services/ResponseService';
import { Router } from '@angular/router';
import { CustomResponse } from '../models/CustomResponse';

@Component({
  selector: 'app-response-page',
  templateUrl: './response-page.component.html',
  styleUrls: ['./response-page.component.css']
})
export class ResponsePageComponent {

  idPublication!: number;
  idclient!: number;
  response: CustomResponse = new CustomResponse(); // Use `CustomResponse` here
  message: string = '';
  warningMessage: string = '';

  constructor(private ResponseService: ResponseService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.idPublication = +this.route.snapshot.paramMap.get('id')!;
    this.idclient = +this.route.snapshot.queryParamMap.get('idClient')!;
  }

  onSubmit(): void {
    if (!this.response.responsecontenu || this.response.responsecontenu.trim() === '') {
      this.warningMessage = 'Veuillez saisir une réponse à la demande avant de publier.';
      return;
    }

    this.warningMessage = ''; // Clear warning message
    const userId = localStorage.getItem('userId');
    if (!userId) {
      this.message = "propriétaire non connecté.";
      return;
    }

    this.response.idClient = this.idclient; 
    this.response.idPublication= this.idPublication;
    this.response.idProprietaire = Number(userId);
    console.log('ID du client:', this.response.idClient); 
    console.log('ID du pub:', this.response.idPublication);
    console.log('Données de la publication avant envoi:', this.response);

    this.ResponseService.createresponse(this.response).subscribe({
      next: (response) => { 
        console.log('Réponse de l\'API:', response); 
        this.message = 'Publication effectuée avec succès !';
        alert(this.message);
        this.router.navigate(['/liste-pub']);
      },
      error: (err) => {
        console.error('Erreur lors de la publication:', err);
        this.message = 'Une erreur est survenue lors de la publication.';
        alert(this.message);
      }
    });
  }
}
