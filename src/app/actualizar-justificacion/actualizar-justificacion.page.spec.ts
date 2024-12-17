import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActualizarJustificacionPage } from './actualizar-justificacion.page';

describe('ActualizarJustificacionPage', () => {
  let component: ActualizarJustificacionPage;
  let fixture: ComponentFixture<ActualizarJustificacionPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ActualizarJustificacionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
