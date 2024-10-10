import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UsuariosRegistradosPage } from './usuarios-registrados.page';

describe('UsuariosRegistradosPage', () => {
  let component: UsuariosRegistradosPage;
  let fixture: ComponentFixture<UsuariosRegistradosPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(UsuariosRegistradosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
