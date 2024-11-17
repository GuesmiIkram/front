import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PublierAnnonceComponent } from './publier-annonce/publier-annonce.component';
import { ConsulterOffresComponent } from './consulter-offres/consulter-offres.component';
import { AccueilComponent } from './accueil/accueil.component';
import { ConsulterVoitureComponent } from './consulter-voiture/consulter-voiture.component';
import { CreateProprietaireComponent } from './create-proprietaire/create-proprietaire.component';
import { PublierAnnonceClientComponent } from './publier-annonce-client/publier-annonce-client.component';
import { ListePubComponent } from './liste-pub/liste-pub.component';
import { LoginComponent } from './login/login.component';
import { LoginClientComponent } from './login-client/login-client.component';
import { ClientReservationsComponent } from './client-reservations/client-reservations.component';
import { ResponsePageComponent } from './response-page/response-page.component';
import { ProprietaireReservationsComponent } from './proprietaire-reservations/proprietaire-reservations.component';
import { ConsulterResponseComponent } from './consulter-response/consulter-response.component';
import { DashboardClientComponent } from './dashboard-client/dashboard-client.component';
import { DashboardPropComponent } from './dashboard-prop/dashboard-prop.component';



const routes: Routes = [
  { path: 'publier-annonce', component: PublierAnnonceComponent },
  { path: 'offres', component: ConsulterOffresComponent },
  { path: 'accueil', component: AccueilComponent},
  { path: 'voiture/:id', component: ConsulterVoitureComponent },
  { path: 'registerP', component: CreateProprietaireComponent},
  { path: 'publier-annonce-client', component: PublierAnnonceClientComponent },
  { path: 'liste-pub', component: ListePubComponent },
  { path: 'login', component: LoginComponent },
  { path: 'loginC', component: LoginClientComponent },
  { path: 'reservationC', component: ClientReservationsComponent },
  { path: 'publication/:id', component: ResponsePageComponent },
  { path: 'reservations-proprietaire', component: ProprietaireReservationsComponent },
  { path: 'response/:idClient', component: ConsulterResponseComponent },
  {path: 'dashboardClient', component: DashboardClientComponent},
  {path: 'dashboardProp', component:DashboardPropComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
