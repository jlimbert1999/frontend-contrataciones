import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CuentasComponent } from '../Configuraciones/cuentas/cuentas.component';
import { DependenciasComponent } from '../Configuraciones/dependencias/dependencias.component';
import { InstitucionesComponent } from '../Configuraciones/instituciones/instituciones.component';
import { UsuariosComponent } from '../Configuraciones/usuarios/usuarios.component';
import { HomeComponent } from './home.component';

const routes: Routes = [
    {
        path: 'home', component: HomeComponent,
        children: [
            { path: 'dependencias', component: DependenciasComponent },
            { path: 'instituciones', component: InstitucionesComponent },
            { path: 'funcionarios', component: UsuariosComponent },
            { path: 'cuentas', component: CuentasComponent },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class HomeRoutingModule { }
