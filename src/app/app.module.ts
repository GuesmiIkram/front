import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PublierAnnonceComponent } from './publier-annonce/publier-annonce.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConsulterOffresComponent } from './consulter-offres/consulter-offres.component';
import { AccueilComponent } from './accueil/accueil.component';
import { ConsulterVoitureComponent } from './consulter-voiture/consulter-voiture.component';
import { CreateProprietaireComponent } from './create-proprietaire/create-proprietaire.component';
import { PublierAnnonceClientComponent } from './publier-annonce-client/publier-annonce-client.component';
import { ListePubComponent } from './liste-pub/liste-pub.component';
import { LoginComponent } from './login/login.component';
import { FacebookLoginProvider, SocialAuthServiceConfig, SocialLoginModule } from '@abacritt/angularx-social-login';
import { LoginClientComponent } from './login-client/login-client.component';


@NgModule({
  declarations: [
    AppComponent,
    PublierAnnonceComponent,
    ConsulterOffresComponent,
    AccueilComponent,
    ConsulterVoitureComponent,
    CreateProprietaireComponent,
    PublierAnnonceClientComponent,
    ListePubComponent,
    LoginComponent,
    LoginClientComponent,
   
    
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    SocialLoginModule

  ],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        lang: 'en',
        providers: [
         
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider('851462143702467')
          }
        ],
        onError: (err) => {
          console.error(err);
        }
      } as SocialAuthServiceConfig,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
