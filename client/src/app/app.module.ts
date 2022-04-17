import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './_page/home/home.component';
import { GettingStartedComponent } from './_page/getting-started/getting-started.component';
import { ResoucesComponent } from './_page/resouces/resouces.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { UploadComponent } from './_page/upload/upload.component';
import { TestComponent } from './_page/test/test.component';
import { RegisterComponent } from './_page/register/register.component';
import { LoginComponent } from './_page/login/login.component';

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
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
