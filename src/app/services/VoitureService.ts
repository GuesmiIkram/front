

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Voiture } from '../models/Voiture';

@Injectable({
  providedIn: 'root'
})
export class VoitureService {
  private apiUrl = 'http://localhost:8081/api/voitures';  // L'URL de ton back-end

  constructor(private http: HttpClient) {}

  createVoiture(voiture: Voiture, imageFile: File): Observable<Voiture> {
    const formData: FormData = new FormData();
    formData.append('voiture', JSON.stringify(voiture));  // Convertir l'objet voiture en JSON
    formData.append('imageFile', imageFile);  // Ajouter le fichier image

    // Envoyer la requête multipart
    return this.http.post<Voiture>(this.apiUrl, formData);
  }

  getVoitures(): Observable<Voiture[]> {
    return this.http.get<Voiture[]>(this.apiUrl);
  }
  getVoitureById(id: number): Observable<Voiture> {
    return this.http.get<Voiture>(`${this.apiUrl}/${id}`);
  }
}


