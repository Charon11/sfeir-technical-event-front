import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './components/app/app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatIconModule, MatToolbarModule, MatButtonModule, MatCardModule, MatMenuModule} from '@angular/material';
import {ToolBarComponent} from './components/tool-bar/tool-bar.component';
import {EventComponent} from './components/event/event.component';
import {AgendaComponent} from './components/agenda/agenda.component';
import {environment} from '../environments/environment';
import {AngularFireModule} from '@angular/fire';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {LoginComponent} from './components/login/login.component';
import {AngularFireAuthGuardModule} from '@angular/fire/auth-guard';
import { MyPropositionsComponent } from './components/my-propositions/my-propositions.component';

@NgModule({
  declarations: [
    AppComponent,
    ToolBarComponent,
    EventComponent,
    AgendaComponent,
    LoginComponent,
    MyPropositionsComponent
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebaseConfig),
    BrowserModule,
    AppRoutingModule,
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireAuthGuardModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatCardModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
