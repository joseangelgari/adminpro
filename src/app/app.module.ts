import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// RUTAS
import { APP_ROUTES } from './app.routes';

import { AppComponent } from './app.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { BreadcrumbsComponent } from './shared/breadcrumbs/breadcrumbs.component';
import { HeaderComponent } from './shared/header/header.component';
import { LoginComponent } from './login/login.component';
import { Nopagefound404Component } from './nopagefound404/nopagefound404.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ProgressComponent } from './pages/progress/progress.component';
import { Graphic1Component } from './pages/graphic1/graphic1.component';
import { PagesComponent } from './pages/pages.component';
import { RegisterComponent } from './register/register.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    Nopagefound404Component,
    DashboardComponent,
    ProgressComponent,
    Graphic1Component,
    HeaderComponent,
    SidebarComponent,
    BreadcrumbsComponent,
    PagesComponent,
    RegisterComponent,
  ],
  imports: [
    BrowserModule,
    APP_ROUTES
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
