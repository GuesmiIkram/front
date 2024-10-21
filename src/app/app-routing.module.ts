import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PublierAnnonceComponent } from './publier-annonce/publier-annonce.component';
import { ConsulterOffresComponent } from './consulter-offres/consulter-offres.component';
import { AccueilComponent } from './accueil/accueil.component';
import { ConsulterVoitureComponent } from './consulter-voiture/consulter-voiture.component';

const routes: Routes = [
  { path: 'publier-annonce', component: PublierAnnonceComponent },
  { path: 'offres', component: ConsulterOffresComponent },
  { path: 'accueil', component: AccueilComponent},
  { path: 'voiture/:id', component: ConsulterVoitureComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
