import { Component, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSelect } from '@angular/material/select';
import { ReplaySubject, Subject, take, takeUntil } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { BandejaService } from '../services/bandeja.service';
import { SocketService } from '../services/socket.service';
import Swal from 'sweetalert2';
import { MailModel } from '../models/mail.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-dialog-remision',
  templateUrl: './dialog-remision.component.html',
  styleUrls: ['./dialog-remision.component.css']
})
export class DialogRemisionComponent implements OnInit, OnDestroy {
  instituciones: any[] = []
  dependencias: any[] = []
  funcionarios: any[] = []
  receptor: any
  mail: any
  motivo: string
  public bankCtrl: UntypedFormControl = new UntypedFormControl();
  public bankFilterCtrl: UntypedFormControl = new UntypedFormControl();
  public filteredBanks: ReplaySubject<any[]> = new ReplaySubject<any[]>(1);
  @ViewChild('singleSelect', { static: true }) singleSelect: MatSelect;
  protected _onDestroy = new Subject<void>();

  public UserCtrl: UntypedFormControl = new UntypedFormControl();
  public userFilterCtrl: UntypedFormControl = new UntypedFormControl();
  public filteredUsers: ReplaySubject<any[]> = new ReplaySubject<any[]>(1);
  @ViewChild('userSelect', { static: true }) userSelect: MatSelect;
  protected _onDestroy2 = new Subject<void>();


  constructor(
    private bandejaService: BandejaService,
    private socketService: SocketService,
    private authService: AuthService,
    @Inject(MAT_DIALOG_DATA) public Data: { detalles_reenvio: any, detalles_tramite: any },
    public dialogRef: MatDialogRef<DialogRemisionComponent>,
    private toastr: ToastrService,
  ) { }
  ngOnDestroy(): void {
    this._onDestroy.next();
    this._onDestroy.complete();
    this._onDestroy2.next();
    this._onDestroy2.complete();
  }

  ngOnInit(): void {
    this.bandejaService.obtener_instituciones_envio().subscribe(inst => {
      this.instituciones = inst
    })
  }

  obtener_dependencias(id_institucion: string) {
    this.bandejaService.obtener_dependencias_envio(id_institucion).subscribe(deps => {
      this.dependencias = deps
      this.bankCtrl.setValue(this.dependencias);
      this.filteredBanks.next(this.dependencias.slice());
      this.bankFilterCtrl.valueChanges
        .pipe(takeUntil(this._onDestroy))
        .subscribe(() => {
          this.filterBanks();
        });
    })
  }
  obtener_funcionarios(id_dependencia: string) {
    this.funcionarios = []
    this.bandejaService.obtener_funcionarios_envio(id_dependencia).subscribe(users => {
      let usuarios: any[] = users
      usuarios.forEach(element => {
        if (element.id_cuenta != this.authService.Detalles_Cuenta.id_cuenta) {
          let user = this.socketService.Users.find(user => user.id_cuenta === element.id_cuenta)
          if (user) {
            element.id = user.id
          }
          this.funcionarios.push(element)
        }
      })
      this.UserCtrl.setValue(this.funcionarios);
      this.filteredUsers.next(this.funcionarios.slice());
      this.userFilterCtrl.valueChanges
        .pipe(takeUntil(this._onDestroy2))
        .subscribe(() => {
          this.filterUsers();
        });
    })
  }

  remitir_tramite() {
    let mail: MailModel = {
      cuenta_receptor: this.receptor.id_cuenta,
      tramite: this.Data.detalles_tramite.id_tramite,
      motivo: this.motivo
    }
    Swal.fire({
      title: `Enviar tramite a ${this.receptor.dependencia.nombre} - ${this.receptor.dependencia.institucion.sigla}?`,
      text: `El funcionario ${this.receptor.funcionario.nombre} (${this.receptor.cargo}) recibira el tramite`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Enviar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        if (this.receptor.id) {
          // datos extra para que socket tenga lo mismo de la bd al enviar tramite
          this.Data.detalles_tramite['recibido'] = false
          this.Data.detalles_tramite['cuenta_emisor'] = this.authService.Detalles_Cuenta.id_cuenta
          this.socketService.socket.emit("enviar-tramite", { id: this.receptor.id, tramite: this.Data.detalles_tramite })
        }
        this.bandejaService.agregar_mail({ data:mail, detalles_reenvio: this.Data.detalles_reenvio }).subscribe(resp => {
          this.toastr.success(undefined, 'Tramite enviado!', {
            positionClass: 'toast-bottom-right',
            timeOut: 3000,
          })
          this.dialogRef.close(resp)
        })
      }
    })
  }
  protected filterBanks() {
    if (!this.dependencias) {
      return;
    }
    let search = this.bankFilterCtrl.value;
    if (!search) {
      this.filteredBanks.next(this.dependencias.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    this.filteredBanks.next(
      this.dependencias.filter(bank => bank.nombre.toLowerCase().indexOf(search) > -1)
    );
  }
  protected filterUsers() {
    if (!this.funcionarios) {
      return;
    }
    let search = this.userFilterCtrl.value;
    if (!search) {
      this.filteredUsers.next(this.funcionarios.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    this.filteredUsers.next(
      this.funcionarios.filter(user => user.nombre.indexOf(search) == 0 || user.cargo.indexOf(search) == 0)
    );
  }
}
