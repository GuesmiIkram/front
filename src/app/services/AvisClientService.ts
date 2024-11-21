import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
    providedIn: 'root'
  })
  export class AvisClientService {
    private apiUrl = 'http://localhost:8081/api'; // URL de base de l'API
  
    constructor(private http: HttpClient) {}
  
    ajouterAvisClient(avis: any): Observable<any> {
      return this.http.post(`${this.apiUrl}/avis-client`, avis);
    }
    getAvisByClientId(clientId: number): Observable<any[]> {
        return this.http.get<any[]>(`${this.apiUrl}/avis-client/${clientId}`);
      }
  }