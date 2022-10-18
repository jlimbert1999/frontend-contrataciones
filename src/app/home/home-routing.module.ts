import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DependenciasComponent } from '../Configuraciones/dependencias/dependencias.component';
import { InstitucionesComponent } from '../Configuraciones/instituciones/instituciones.component';
import { HomeComponent } from './home.component';

const routes: Routes = [
    {
        path: 'home', component: HomeComponent,
        children: [
            { path: 'dependencias', component: DependenciasComponent },
            { path: 'instituciones', component: InstitucionesComponent },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class HomeRoutingModule { }
