import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { Nopagefound404Component } from './nopagefound404/nopagefound404.component';
import { PagesComponent } from './pages/pages.component';
import { LoginGuard } from './services/service.index';

const appRoutes: Routes = [

    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    {
        path: '',
        component: PagesComponent,
        canActivate: [ LoginGuard ],
        loadChildren: './pages/pages.module#PagesModule'
    },
    { path: '**', component: Nopagefound404Component}
];

export const APP_ROUTES = RouterModule.forRoot(appRoutes, { useHash : true });