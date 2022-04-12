import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './_page/home/home.component';
import { GettingStartedComponent } from './_page/getting-started/getting-started.component';
import { ResoucesComponent } from './_page/resouces/resouces.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: 'home', component: HomeComponent, pathMatch: 'full' },
  { path: 'gettingStarted', component: GettingStartedComponent, pathMatch: 'full' },
  { path: 'resouces', component: ResoucesComponent, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
