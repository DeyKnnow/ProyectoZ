import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListarRazaPage } from './listar-raza.page';

describe('ListarRazaPage', () => {
  let component: ListarRazaPage;
  let fixture: ComponentFixture<ListarRazaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarRazaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
