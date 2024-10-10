import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { HttpClientModule } from '@angular/common/http'; // Importa HttpClientModule
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getAnalytics, provideAnalytics, ScreenTrackingService, UserTrackingService } from '@angular/fire/analytics';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getDatabase, provideDatabase } from '@angular/fire/database';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { environment } from 'src/environments/environment';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    HttpClientModule, // Asegúrate de incluir HttpClientModule aquí
    IonicModule.forRoot(),
    AppRoutingModule,
    IonicModule.forRoot({
      rippleEffect: false,
      mode: 'ios'
    }) 
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, 
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()), 
    provideAnalytics(() => getAnalytics()), ScreenTrackingService, UserTrackingService, 
    provideFirestore(() => getFirestore()), provideDatabase(() => getDatabase()), 
    provideStorage(() => getStorage()),

  ],
    
  bootstrap: [AppComponent],
  
})
export class AppModule { }
