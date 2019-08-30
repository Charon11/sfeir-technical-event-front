import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AgendaComponent} from './components/agenda/agenda/agenda.component';
import {AngularFireAuthGuard, canActivate, hasCustomClaim, loggedIn, redirectUnauthorizedTo} from '@angular/fire/auth-guard';
import {MyPropositionsComponent} from './components/propositions/my-propositions/my-propositions.component';
import {AdminComponent} from './components/admin/admin/admin.component';

const redirectUnauthorizedToAgenda = () => redirectUnauthorizedTo(['agenda']);
const appLoggedIn = () => loggedIn;

const routes: Routes = [
  {
    path: 'agenda',
    component: AgendaComponent
  },
  {
    path: 'demandes',
    component: AgendaComponent,
    canActivate: [AngularFireAuthGuard],
    data: {authGuardPipe: appLoggedIn}
  },
  {
    path: 'propositions',
    component: MyPropositionsComponent,
    canActivate: [AngularFireAuthGuard],
    data: {authGuardPipe: redirectUnauthorizedToAgenda}
  },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AngularFireAuthGuard],
    data: {authGuardPipe: redirectUnauthorizedToAgenda}
  },
  {path: '', redirectTo: 'agenda', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
