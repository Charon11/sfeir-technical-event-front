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
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MAT_DATE_FORMATS,
  DateAdapter,
  MAT_DATE_LOCALE, NativeDateAdapter, MatSlideToggleModule
} from '@angular/material';
import {ToolBarComponent} from './components/tool-bar/tool-bar.component';
import {EventComponent} from './components/agenda/event/event.component';
import {AgendaComponent} from './components/agenda/agenda/agenda.component';
import {environment} from '../environments/environment';
import {AngularFireModule} from '@angular/fire';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {LoginComponent} from './components/login/login.component';
import {AngularFireAuthGuardModule} from '@angular/fire/auth-guard';
import {MyPropositionsComponent} from './components/propositions/my-propositions/my-propositions.component';
import {AddEventDialogComponent} from './components/add-event-dialog/add-event-dialog.component';
import {ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {PropositionEventComponent} from './components/propositions/proposition-event/proposition-event.component';
import {EditEventDialogComponent} from './components/propositions/edit-event-dialog/edit-event-dialog.component';
import {AdminComponent} from './components/admin/admin/admin.component';
import {AdminEventComponent} from './components/admin/admin-event/admin-event.component';
import {ChooseAcceptDateDialogComponent} from './components/admin/choose-accept-date-dialog/choose-accept-date-dialog.component';
import {NgxSpinnerModule} from 'ngx-spinner';
import {DeleteConfirmDialogComponent} from './components/propositions/delete-confirm-dialog/delete-confirm-dialog.component';

// extend NativeDateAdapter's format method to specify the date format.
export class CustomDateAdapter extends NativeDateAdapter {
  format(date: Date, displayFormat: Object): string {
    if (displayFormat === 'input') {
      const day = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();
      // Return the format as per your requirement
      return `${day}-${month}-${year}`;
    } else {
      return date.toDateString();
    }
  }

  // If required extend other NativeDateAdapter methods.
}

const MY_DATE_FORMATS = {
  parse: {
    dateInput: {month: 'short', year: 'numeric', day: 'numeric'}
  },
  display: {
    dateInput: 'input',
    monthYearLabel: {year: 'numeric', month: 'short'},
    dateA11yLabel: {year: 'numeric', month: 'long', day: 'numeric'},
    monthYearA11yLabel: {year: 'numeric', month: 'long'},
  }
};

@NgModule({
  declarations: [
    AppComponent,
    ToolBarComponent,
    EventComponent,
    AgendaComponent,
    LoginComponent,
    MyPropositionsComponent,
    AddEventDialogComponent,
    PropositionEventComponent,
    EditEventDialogComponent,
    AdminComponent,
    AdminEventComponent,
    ChooseAcceptDateDialogComponent,
    DeleteConfirmDialogComponent
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
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSlideToggleModule,
    NgxSpinnerModule
  ],
  entryComponents: [AddEventDialogComponent,
    EditEventDialogComponent,
    ChooseAcceptDateDialogComponent,
    DeleteConfirmDialogComponent],
  providers: [
    {
      provide: DateAdapter, useClass: CustomDateAdapter
    },
    {
      provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
