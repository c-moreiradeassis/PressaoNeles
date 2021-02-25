import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DeputadoComponent } from './deputado/deputado.component';
import { HomeComponent } from './home/home.component';
import { PartidoComponent } from './partido/partido.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'partido', component: PartidoComponent },
  { path: 'deputado', component: DeputadoComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
