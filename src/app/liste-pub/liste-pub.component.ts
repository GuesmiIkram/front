import { Component, OnInit } from '@angular/core';
import { pub } from '../models/pub';
import { pubService } from '../services/pubService';

@Component({
    selector: 'app-liste-pub',
    templateUrl: './liste-pub.component.html',
    styleUrls: ['./liste-pub.component.css']
})
export class ListePubComponent implements OnInit {
    pub: pub[] = [];
    message: string = '';

    constructor(private pubService: pubService) {}

    ngOnInit(): void {
        this.getpub();
    }

    // Méthode pour récupérer les publications
    getpub(): void {
        this.pubService.getpub().subscribe({
            next: (data) => {
                this.pub = data;
            },
            error: (err) => {
                this.message = 'Une erreur est survenue lors de l affichage des publications.';
                console.error(err);
            }
        });
    }
    
}
