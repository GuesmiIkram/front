import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
    providedIn: 'root'
  })
  export class AvisProprietaireService {
    private apiUrl = 'http://localhost:8081/api'; // URL de base de l'API
  
    constructor(private http: HttpClient) {}
  
    ajouterAvisProprietaire(avis: any): Observable<any> {
      return this.http.post(`${this.apiUrl}/avis-proprietaire`, avis);
    }
    getAvisByProprietaireId(proprietaireId: number): Observable<any[]> {
        return this.http.get<any[]>(`${this.apiUrl}/avis-proprietaire/${proprietaireId}`);
      }
  }