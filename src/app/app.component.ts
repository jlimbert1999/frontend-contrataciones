import { Component, OnDestroy, OnInit } from '@angular/core';
import { SocketService } from './Tramites/services/socket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'frontend_contrataciones';
  constructor(private socketService: SocketService) { }
  ngOnInit() {
    // this.socketService.setupSocketConnection();
  }
  ngOnDestroy() {
    this.socketService.disconnect();
  }
}
