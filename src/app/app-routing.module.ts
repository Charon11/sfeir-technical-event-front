import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AgendaComponent} from './components/agenda/agenda.component';
import {canActivate, loggedIn, redirectUnauthorizedTo} from '@angular/fire/auth-guard';
import {MyPropositionsComponent} from './components/my-propositions/my-propositions.component';


const routes: Routes = [
  {path: 'agenda', component: AgendaComponent},
  {path: 'demandes', component: AgendaComponent, ...canActivate(loggedIn)},
  {path: 'propositions', component: MyPropositionsComponent, ...canActivate(redirectUnauthorizedTo(['agenda']))},
  {path: '', redirectTo: 'agenda', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
