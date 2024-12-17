import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CrearJustificacionPage } from './crear-justificacion.page';

describe('CrearJustificacionPage', () => {
  let component: CrearJustificacionPage;
  let fixture: ComponentFixture<CrearJustificacionPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearJustificacionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
