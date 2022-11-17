import { Component, OnDestroy, OnInit } from '@angular/core';
import { SocketService } from 'src/app/Tramites/services/socket.service';

@Component({
  selector: 'app-funcionarios',
  templateUrl: './funcionarios.component.html',
  styleUrls: ['./funcionarios.component.css']
})
export class FuncionariosComponent implements OnInit, OnDestroy {
  constructor(public socketService: SocketService) {
  }
  ngOnDestroy(): void {

  }

  ngOnInit(): void {
  }

}
