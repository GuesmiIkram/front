import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ClientResponse } from '../models/ClientResponse';
// Ensure this interface exists to represent client data

@Injectable({
    providedIn: 'root'
})
export class ClientService {
    private apiUrl = 'http://localhost:8081/api/clients'; // Replace with your actual API URL

    constructor(private http: HttpClient) {}

    // Method to fetch client by ID
    getClientById(id: number): Observable<ClientResponse> {
        return this.http.get<ClientResponse>(`${this.apiUrl}/${id}`);
    }
}
