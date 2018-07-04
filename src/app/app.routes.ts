import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { Nopagefound404Component } from './nopagefound404/nopagefound404.component';
import { ProgressComponent } from './pages/progress/progress.component';
import { Graphic1Component } from './pages/graphic1/graphic1.component';
import { PagesComponent } from './pages/pages.component';

const appRoutes: Routes = [
    { 
        path: '',
        component: PagesComponent,
        children: [
            { path: 'dashboard', component: DashboardComponent },
            { path: 'progress', component: ProgressComponent },
            { path: 'graphic1', component: Graphic1Component },
            { path: '', redirectTo: '/dashboard', pathMatch: 'full'},
        ]
    },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: '**', component: Nopagefound404Component}
];

export const APP_ROUTES = RouterModule.forRoot(appRoutes, { useHash : true });