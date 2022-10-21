import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TramiteDialogComponent } from './tramite-dialog.component';

describe('TramiteDialogComponent', () => {
  let component: TramiteDialogComponent;
  let fixture: ComponentFixture<TramiteDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TramiteDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TramiteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
