import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ResponseService } from '../services/ResponseService';
import { ResponseDTO } from '../models/ResponseDTO';

@Component({
  selector: 'app-consulter-response',
  templateUrl: './consulter-response.component.html',
  styleUrls: ['./consulter-response.component.css']
})
export class ConsulterResponseComponent {
  Response: ResponseDTO[] = [];
  message: string = '';
  groupedResponses: any[] = [];
  selectedPublicationIndex: number | null = null; // Pour savoir quelle publication a été sélectionnée

  constructor(
    private route: ActivatedRoute,
    private ResponseService: ResponseService
  ) {}

  ngOnInit(): void {
    this.getResponseDetails();
  }

  getResponseDetails(): void {
    const idClient = Number(this.route.snapshot.paramMap.get('idClient'));
    this.ResponseService.getResponseByIdClient(idClient).subscribe({
      next: (data) => {
        this.Response = data;
        this.groupResponsesByPublication(); // Appeler cette méthode pour regrouper les réponses
      },
      error: (err) => {
        this.message = 'Une erreur est survenue lors de la récupération des réponses.';
        console.error(err);
      }
    });
  }

  // Affiche ou cache les réponses d'une publication entière
  togglePublicationResponses(index: number): void {
    this.selectedPublicationIndex = this.selectedPublicationIndex === index ? null : index;
  }

  openEmail(email?: string): void {
    if (email) {
      window.location.href = `mailto:${email}`;
    } else {
      console.error('Email non défini');
    }
  }

  groupResponsesByPublication(): void {
    const grouped: { [key: number]: { publicationContenu: string, responses: ResponseDTO[] } } = {};

    this.Response.forEach(response => {
      if (response.idPublication !== undefined && response.idPublication !== null) {
        const publicationContenu = response.publicationContenu ?? 'Aucune description disponible';

        if (!grouped[response.idPublication]) {
          grouped[response.idPublication] = {
            publicationContenu: publicationContenu,
            responses: []
          };
        }
        grouped[response.idPublication].responses.push(response);
      } else {
        console.warn('idPublication est indéfini pour la réponse suivante :', response);
      }
    });
    this.groupedResponses = Object.values(grouped);
  }
}