import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { UsuarioModel } from '../models/usuario.model';
import { UsuariosService } from '../services/usuarios.service';
import { UsuarioDialogComponent } from './usuario-dialog/usuario-dialog.component';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {
  Usuarios: UsuarioModel[] = []
  Total: number = 0
  dataSource = new MatTableDataSource()
  displayedColumns = [
    { key: 'cargo', titulo: 'Cargo' },
    { key: 'nombre', titulo: 'Nombre' },
    { key: 'dni', titulo: 'Dni' },
    { key: 'telefono', titulo: 'Telefono' },
    { key: 'activo', titulo: 'Situacion' },
  ]
  @ViewChild("txtSearch") private searchInput: ElementRef;

  constructor(private usuariosSrevice:UsuariosService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.obtener_funcionarios()
    
  }
  obtener_funcionarios() {
    this.usuariosSrevice.obtener_funcionarios().subscribe(data => {
      this.Usuarios = data.funcionarios
      this.Total = data.total
      this.dataSource.data = this.Usuarios
      console.log(this.Usuarios);
    })
  }


  activar_busqueda() {
   
  }
  agregar_funcionario() {
    const dialogRef = this.dialog.open(UsuarioDialogComponent, {
      width: '700px'
    });
    dialogRef.afterClosed().subscribe((result: UsuarioModel) => {
      if (result) {
       this.obtener_funcionarios()

      }
    });
  }
  editar_funcionario(data:any){
    const dialogRef = this.dialog.open(UsuarioDialogComponent, {
      // width: '700px',
      data
    });
    dialogRef.afterClosed().subscribe((result: UsuarioDialogComponent) => {
      if (result) {
        this.obtener_funcionarios()
       

      }
    });
  }

}
