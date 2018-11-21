import { Routes, RouterModule } from '@angular/router';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graphic1Component } from './graphic1/graphic1.component';
import { PromisesComponent } from './promises/promises.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { LoginGuard } from '../services/service.index';
import { ProfileComponent } from './profile/profile.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { HospitalesComponent } from './hospitales/hospitales.component';
import { MedicoComponent } from './medicos/medico.component';
import { MedicosComponent } from './medicos/medicos.component';


const pagesRoutes : Routes = [
    { 
        path: '',
        component: PagesComponent,
        canActivate: [ LoginGuard ],
        children: [
            { path: 'dashboard', component: DashboardComponent, data: {title: 'Dashboard'} },
            { path: 'progress', component: ProgressComponent, data: {title: 'Progress Bar'} },
            { path: 'graphic1', component: Graphic1Component, data: {title: 'Graphics'} },
            { path: 'promises', component: PromisesComponent, data: {title: 'Promises'} },
            { path: 'rxjs', component: RxjsComponent, data: {title: 'Rxjs'} },
            { path: 'profile', component: ProfileComponent, data: {title: "User's profile"} },
            // Maintenance
            { path: 'usuarios', component: UsuariosComponent, data: {title: "Mantenimiento de usuarios"} },
            { path: 'hospitales', component: HospitalesComponent, data: {title: "Mantenimiento de hospitales"} },
            { path: 'medicos', component: MedicosComponent, data: {title: "Mantenimiento de médicos"} },
            { path: 'medico/:id', component: MedicoComponent, data: {title: "Actualización de médicos"} },
            { path: '', redirectTo: '/dashboard', pathMatch: 'full'},
        ]
    }
]

export const PAGES_ROUTES = RouterModule.forChild(pagesRoutes);