import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../auth/login/login.component';
import { CuentasComponent } from '../Configuraciones/cuentas/cuentas.component';
import { DependenciasComponent } from '../Configuraciones/dependencias/dependencias.component';
import { FuncionariosComponent } from '../Configuraciones/funcionarios/funcionarios.component';
import { InstitucionesComponent } from '../Configuraciones/instituciones/instituciones.component';
import { TiposTramitesComponent } from '../Configuraciones/tipos-tramites/tipos-tramites.component';
import { AuthGuard } from '../guards/auth.guard';
import { AdministracionComponent } from '../Tramites/administracion/administracion.component';
import { BandejaEntradaComponent } from '../Tramites/bandeja-entrada/bandeja-entrada.component';
import { BandejaSalidaComponent } from '../Tramites/bandeja-salida/bandeja-salida.component';
import { ControlComponent } from '../Tramites/control/control.component';
import { FichaComponent } from '../Tramites/ficha/ficha.component';
import { HomeComponent } from './home.component';

const routes: Routes = [
    {
        path: 'home', component: HomeComponent, canActivate: [AuthGuard],
        children: [
            { path: 'dependencias', component: DependenciasComponent },
            { path: 'instituciones', component: InstitucionesComponent },
            { path: 'cuentas', component: CuentasComponent },
            { path: 'funcionarios', component: FuncionariosComponent },
            { path: 'tipos', component: TiposTramitesComponent },

            { path: 'tramites', component: AdministracionComponent },
            { path: 'tramites/ficha/:id', component: FichaComponent },
            { path: 'bandeja_entrada', component: BandejaEntradaComponent },
            { path: 'bandeja_entrada/ficha/:id', component: FichaComponent },
            { path: 'bandeja_salida', component: BandejaSalidaComponent },
            { path: 'bandeja_salida/ficha/:id', component: FichaComponent },


            { path: 'control', component: ControlComponent },
            { path: 'control/ficha/:id', component: FichaComponent }
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
