import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './_page/home/home.component';
import { GettingStartedComponent } from './_page/getting-started/getting-started.component';
import { ResoucesComponent } from './_page/resouces/resouces.component';
import { UploadComponent } from './_page/upload/upload.component';
import { TestComponent } from './_page/test/test.component';
import { RegisterComponent } from './_page/register/register.component';
import { LoginComponent } from './_page/login/login.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent, pathMatch: 'full' },
  { path: 'gettingStarted', component: GettingStartedComponent, pathMatch: 'full' },
  { path: 'resouces', component: ResoucesComponent, pathMatch: 'full' },
  { path: 'upload', component: UploadComponent, pathMatch: 'full' },
  { path: 'test', component: TestComponent, pathMatch: 'full' },
  { path: 'login', component: LoginComponent, pathMatch: 'full' },
  { path: 'register', component: RegisterComponent, pathMatch: 'full' },
  { path: '**', redirectTo: 'home', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
