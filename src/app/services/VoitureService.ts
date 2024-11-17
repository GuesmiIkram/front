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

  createVoiture(voiture: Voiture//, imageFile: File
): Observable<number> {
    return this.http.post<number>(`${this.apiUrl}/add`, voiture);
    //const formData: FormData = new FormData();
    //formData.append('voiture', JSON.stringify(voiture));  // Convertir l'objet voiture en JSON
    //formData.append('imageFile', imageFile);  // Ajouter le fichier image

    // Envoyer la requête multipart
  }

  enregistrerImageVoiture(fd: FormData,id : number) : Observable<Boolean>{
    return this.http.post<Boolean>(`${this.apiUrl}/image/${id}`,fd); 
  }


  getVoitures(): Observable<Voiture[]> {
    return this.http.get<Voiture[]>(this.apiUrl);
  }
  
  getVoitureById(id: number): Observable<Voiture> {
    return this.http.get<Voiture>(`${this.apiUrl}/${id}`);
  }
  updateVoitureStateToPayer(id: number): Observable<Voiture> {
    return this.http.put<Voiture>(`${this.apiUrl}/${id}/changeretat`, {});  // Use POST as in your back-end
  }
  

 /* getImageVoitureById(id : number): Observable<object>{
    const url = `${this.apiUrl}/getImage/${id}`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.get(url, { responseType: 'blob', headers: headers });
  }
*/
getImageVoitureById(id: number): Observable<Blob> {
  const url = `${this.apiUrl}/getImage/${id}`;
  return this.http.get(url, { responseType: 'blob' });
}


}


