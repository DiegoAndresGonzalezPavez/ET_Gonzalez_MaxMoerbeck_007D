import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetalleClasePage } from './detalle-clase.page';

describe('DetalleClasePage', () => {
  let component: DetalleClasePage;
  let fixture: ComponentFixture<DetalleClasePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleClasePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
