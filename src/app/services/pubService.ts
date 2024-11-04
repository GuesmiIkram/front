import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { pub } from '../models/pub';

@Injectable({
    providedIn: 'root' // Cela permet à Angular d'injecter le service à travers toute l'application
})
export class pubService {
    private apiUrl = 'http://localhost:8081/api/pub';  // L'URL de ton back-end

    constructor(private http: HttpClient) {}

    createpub(pub: pub): Observable<pub> {
        
        return this.http.post<pub>(this.apiUrl, pub);
    }

    getpub(): Observable<pub[]> {
        return this.http.get<pub[]>(this.apiUrl);
    }

    getpubById(id: number): Observable<pub> {
        return this.http.get<pub>(`${this.apiUrl}/${id}`);
    }
}


