import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})
export class AccueilComponent {
  constructor(private authService: AuthService) {}
  modalVisible: boolean = false;

  openModal() {
    this.modalVisible = true;
  }
  signOut(): void {
    this.authService.signOut();
  }
  
  closeModal() {
    this.modalVisible = false;
  }
  }
  


