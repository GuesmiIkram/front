import { Component, OnInit } from '@angular/core';
import { ClientService } from '../services/ClientService';

@Component({
  selector: 'app-dashboard-client',
  templateUrl: './dashboard-client.component.html',
  styleUrls: ['./dashboard-client.component.css']
})
export class DashboardClientComponent implements OnInit {
  clientName: string = 'Client'; // To display the client's name after fetching
  clientId: string | null = null;

  constructor(private clientService: ClientService) {}

  ngOnInit(): void {
    // Retrieve the client ID from local storage
     this.clientId = localStorage.getItem('userId'); 

    if (this.clientId) {
      this.clientService.getClientById(Number(this.clientId)).subscribe(
        (client) => {
          this.clientName = client.name; // assuming 'nom' is the client's name field
        },
        (error) => {
          console.error('Error retrieving client:', error);
        }
      );
    }
  }
}
