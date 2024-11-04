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


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
