import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { GettingStartedComponent } from './pages/getting-started/getting-started.component';
import { ResoucesComponent } from './pages/resouces/resouces.component';
import { UploadComponent } from './pages/upload/upload.component';
import { TestComponent } from './pages/test/test.component';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';

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
