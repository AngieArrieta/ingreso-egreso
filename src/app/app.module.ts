import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms'
import { environment } from 'src/environments/environment';

// NGRX
import { StoreModule } from '@ngrx/store';
import { appReducers } from './app.reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

//angular fire
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';

// rutas
import { AppRoutingModule } from './app-routing.module';

// componentes
import { AppComponent } from './app.component';

// servicios
import { AuthService } from './services/auth.service';

// modulos
import { AuthModule } from './auth/auth.module';




@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    //general
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    
    //firebase
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,

    //modulos de app
    AuthModule,


    //ngRx
    StoreModule.forRoot(appReducers),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production
    })

  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
