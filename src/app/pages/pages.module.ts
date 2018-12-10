import { NgModule } from "@angular/core";

import { FormsModule } from "@angular/forms";

import { DashboardComponent } from "./dashboard/dashboard.component";
import { ProgressComponent } from "./progress/progress.component";
import { Graphic1Component } from "./graphic1/graphic1.component";
import { GraphicDonutsComponent } from '../components/graphic-donuts/graphic-donuts.component';
import { PromisesComponent } from './promises/promises.component';
import { ProfileComponent } from './profile/profile.component';

import { PipesModule } from "../pipes/pipes.module";
import { PAGES_ROUTES } from './pages.routes';
// TEMPORAL
import { IncrementComponent } from '../components/increment/increment.component';
import { CommonModule } from '@angular/common';

// ng2-charts
import {ChartsModule } from 'ng2-charts';
import { RxjsComponent } from './rxjs/rxjs.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { HospitalesComponent } from './hospitales/hospitales.component';
import { MedicosComponent } from './medicos/medicos.component';
import { MedicoComponent } from './medicos/medico.component';
import { SearchComponent } from './search/search.component';

@NgModule({
    declarations: [
        DashboardComponent,
        ProgressComponent,
        Graphic1Component,
        IncrementComponent,
        GraphicDonutsComponent,
        PromisesComponent,
        RxjsComponent,
        ProfileComponent,
        UsuariosComponent,
        HospitalesComponent,
        MedicosComponent,
        MedicoComponent,
        SearchComponent
    ],
    exports: [
        DashboardComponent,
        ProgressComponent,
        Graphic1Component,
    ],
    imports: [
        CommonModule,
        PAGES_ROUTES,
        FormsModule,
        ChartsModule,
        PipesModule
    ]

})

export class PagesModule {}