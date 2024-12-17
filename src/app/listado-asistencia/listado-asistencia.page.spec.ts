import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListadoAsistenciaPage } from './listado-asistencia.page';

describe('ListadoAsistenciaPage', () => {
  let component: ListadoAsistenciaPage;
  let fixture: ComponentFixture<ListadoAsistenciaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ListadoAsistenciaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
