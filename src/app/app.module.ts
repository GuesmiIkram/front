import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PublierAnnonceComponent } from './publier-annonce/publier-annonce.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ConsulterOffresComponent } from './consulter-offres/consulter-offres.component';
import { AccueilComponent } from './accueil/accueil.component';
import { ConsulterVoitureComponent } from './consulter-voiture/consulter-voiture.component';

@NgModule({
  declarations: [
    AppComponent,
    PublierAnnonceComponent,
    ConsulterOffresComponent,
    AccueilComponent,
    ConsulterVoitureComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
