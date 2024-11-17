import { Component, OnInit } from '@angular/core';
import { pub } from '../models/pub';
import { pubService } from '../services/pubService';
 // Import ClientService
import { Observable, map } from 'rxjs';
import { ClientService } from '../services/ClientService';

@Component({
    selector: 'app-liste-pub',
    templateUrl: './liste-pub.component.html',
    styleUrls: ['./liste-pub.component.css']
})
export class ListePubComponent implements OnInit {
    pub: pub[] = [];
    message: string = '';
    clientNames: { [id: number]: string } = {}; // stocke les noms par idClient

    constructor(private pubService: pubService, private clientService: ClientService) {}

    ngOnInit(): void {
        this.getpub();
    }

    getpub(): void {
        this.pubService.getpub().subscribe({
            next: (data) => {
                this.pub = data;
                this.pub.forEach(publication => {
                    this.getClientName(publication.idClient).subscribe({
                        next: (name) => {
                            this.clientNames[publication.idClient] = name;
                        },
                        error: (err) => console.error(err)
                    });
                });
            },
            error: (err) => {
                this.message = 'Une erreur est survenue lors de l\'affichage des publications.';
                console.error(err);
            }
        });
    }

    getClientName(idClient: number): Observable<string> {
        return this.clientService.getClientById(idClient).pipe(
            map(clientResponse => clientResponse.name)
        );
    }
}
