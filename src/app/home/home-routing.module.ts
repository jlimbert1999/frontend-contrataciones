import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../auth/login/login.component';
import { CuentasComponent } from '../Configuraciones/cuentas/cuentas.component';
import { DependenciasComponent } from '../Configuraciones/dependencias/dependencias.component';
import { InstitucionesComponent } from '../Configuraciones/instituciones/instituciones.component';
import { TiposTramitesComponent } from '../Configuraciones/tipos-tramites/tipos-tramites.component';
import { AuthGuard } from '../guards/auth.guard';
import { AdministracionComponent } from '../Tramites/administracion/administracion.component';
import { HomeComponent } from './home.component';

const routes: Routes = [
    {
        path: 'home', component: HomeComponent, canActivate:[AuthGuard],
        children: [
            { path: 'dependencias', component: DependenciasComponent },
            { path: 'instituciones', component: InstitucionesComponent },
            { path: 'cuentas', component: CuentasComponent },

            { path: 'tipos', component: TiposTramitesComponent },

            { path: 'tramites', component: AdministracionComponent },
        ]
    },
    {
        path: 'login', component: LoginComponent,
     
    },

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class HomeRoutingModule { }
