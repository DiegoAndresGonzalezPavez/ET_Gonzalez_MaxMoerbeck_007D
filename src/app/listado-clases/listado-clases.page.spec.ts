import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListadoClasesPage } from './listado-clases.page';

describe('ListadoClasesPage', () => {
  let component: ListadoClasesPage;
  let fixture: ComponentFixture<ListadoClasesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ListadoClasesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
