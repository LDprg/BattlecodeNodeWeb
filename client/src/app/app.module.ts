import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { GettingStartedComponent } from './pages/getting-started/getting-started.component';
import { ResoucesComponent } from './pages/resouces/resouces.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { UploadComponent } from './pages/upload/upload.component';
import { TestComponent } from './pages/test/test.component';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    GettingStartedComponent,
    ResoucesComponent,
    SidebarComponent,
    UploadComponent,
    TestComponent,
    RegisterComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
