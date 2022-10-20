import {
  AfterViewInit,
  Component,
  Inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Cuenta, CuentaModel } from '../../models/cuenta.mode';
import { UsuarioModel } from '../../models/usuario.model';
import { CuentaService } from '../../services/cuenta.service';

@Component({
  selector: 'app-cuenta-dialog',
  templateUrl: './cuenta-dialog.component.html',
  styleUrls: ['./cuenta-dialog.component.css'],
})
export class CuentaDialogComponent implements OnInit {
  titulo: string = '';
  propietario: { nombre: string; cargo: string };
  dependencias: { id_dependencia: string; nombre: string }[];

  asignar: boolean = false;
  cambiar_password: boolean = false;
  Form_Funcionario: FormGroup = this.fb.group({
    nombre: ['', Validators.required],
    dni: ['', Validators.required],
    telefono: ['', [Validators.required, Validators.maxLength(8)]],
    cargo: ['', Validators.required],
    direccion: ['', Validators.required],
  });

  Form_Cuenta: FormGroup = this.fb.group({
    login: ['', Validators.required],
    password: ['', Validators.required],
    rol: ['', Validators.required],
    dependencia: ['', Validators.required],
  });

  displayedColumns = ['nombre', 'cargo', 'dni', 'opciones'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<CuentaDialogComponent>,
    private cuentasService: CuentaService
  ) {}

  ngOnInit(): void {
    if (this.data) {
      this.titulo = 'Edicion';
      this.propietario = this.data.funcionario;
      this.Form_Cuenta = this.fb.group({
        login: [this.data.login, Validators.required],
        rol: [this.data.rol, Validators.required],
      });
    } else {
      this.titulo = 'Registro';
      this.cuentasService
        .obtener_dependencias_hablitadas()
        .subscribe((dep) => (this.dependencias = dep));
    }
  }
  guardar() {
    if (this.data) {
      this.cuentasService
        .editar_cuenta(this.data.id_cuenta!, this.Form_Cuenta.value)
        .subscribe((cuenta) => {
          this.dialogRef.close(cuenta);
        });
    } else {
      this.cuentasService
        .agregar_cuenta(this.Form_Cuenta.value, this.Form_Funcionario.value)
        .subscribe((cuenta) => {
          this.dialogRef.close(cuenta);
        });
    }
  }

  cambiar_formulario(value: boolean) {
    this.cambiar_password = value;
    if (value) {
      this.Form_Cuenta = this.fb.group({
        login: [this.data.login, Validators.required],
        password: ['', Validators.required],
        rol: [this.data.rol, Validators.required],
      });
    } else {
      this.Form_Cuenta = this.fb.group({
        login: [this.data.login, Validators.required],
        rol: [this.data.rol, Validators.required],
      });
    }
  }
  obtener_funcionarios() {
    this.cuentasService.obtener_funcionarios_asignacion().subscribe((users) => {
      this.dataSource = new MatTableDataSource(users);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  asignar_cuenta(funcionario: {id_funcionario:string, nombre:string, cargo:string, dni:string}) {

    this.cuentasService
      .asignar_cuenta(this.data.id_cuenta!,this.data.funcionario._id, funcionario.id_funcionario)
      .subscribe(cuenta => {
        this.propietario.nombre = funcionario.nombre;
        this.propietario.cargo = funcionario.cargo;
        const nombreLogin:string[]=funcionario.nombre.split(" ")
        this.Form_Cuenta = this.fb.group({
          login: [`${nombreLogin[0]}${nombreLogin[1][0]}`.toUpperCase(), Validators.required],
          password: [funcionario.dni, Validators.required],
          rol: [cuenta.rol, Validators.required],
        });
        this.cambiar_password=true
        this.asignar=false  
      });
  }
}
