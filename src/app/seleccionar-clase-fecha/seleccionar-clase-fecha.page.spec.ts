import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SeleccionarClaseFechaPage } from './seleccionar-clase-fecha.page';

describe('SeleccionarClaseFechaPage', () => {
  let component: SeleccionarClaseFechaPage;
  let fixture: ComponentFixture<SeleccionarClaseFechaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SeleccionarClaseFechaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
