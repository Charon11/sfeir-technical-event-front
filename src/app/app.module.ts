import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './components/app/app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
  MatIconModule,
  MatToolbarModule,
  MatButtonModule,
  MatCardModule,
  MatMenuModule,
  MatDialogModule,
  MatFormFieldModule, MatInputModule, MatSelectModule
} from '@angular/material';
import {ToolBarComponent} from './components/tool-bar/tool-bar.component';
import {EventComponent} from './components/event/event.component';
import {AgendaComponent} from './components/agenda/agenda.component';
import {environment} from '../environments/environment';
import {AngularFireModule} from '@angular/fire';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {LoginComponent} from './components/login/login.component';
import {AngularFireAuthGuardModule} from '@angular/fire/auth-guard';
import {MyPropositionsComponent} from './components/my-propositions/my-propositions.component';
import {AddEventDialogComponent} from './components/add-event-dialog/add-event-dialog.component';
import {ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    ToolBarComponent,
    EventComponent,
    AgendaComponent,
    LoginComponent,
    MyPropositionsComponent,
    AddEventDialogComponent
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebaseConfig),
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireAuthGuardModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    MatMenuModule,
    MatCardModule,
    MatDialogModule,
    MatFormFieldModule
  ],
  entryComponents: [AddEventDialogComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
