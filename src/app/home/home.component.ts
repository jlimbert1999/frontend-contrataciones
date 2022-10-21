import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../auth/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  mobileQuery: MediaQueryList;

  Menu:any = this.authService.Menu

  private _mobileQueryListener: () => void;


  constructor(
    changeDetectorRef: ChangeDetectorRef, media: MediaMatcher,
    private authService: AuthService
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }
  ngOnDestroy(): void {
  
    this.mobileQuery!.removeListener(this._mobileQueryListener);
  }

  ngOnInit(): void {
   
  }


}
