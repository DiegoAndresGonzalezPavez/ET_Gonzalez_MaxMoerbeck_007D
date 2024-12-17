import { ComponentFixture, TestBed } from '@angular/core/testing';
import { JustificacionPage } from './justificacion.page';

describe('JustificacionPage', () => {
  let component: JustificacionPage;
  let fixture: ComponentFixture<JustificacionPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(JustificacionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
