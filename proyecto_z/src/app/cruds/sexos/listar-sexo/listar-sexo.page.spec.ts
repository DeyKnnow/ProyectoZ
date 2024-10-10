import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListarSexoPage } from './listar-sexo.page';

describe('ListarSexoPage', () => {
  let component: ListarSexoPage;
  let fixture: ComponentFixture<ListarSexoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarSexoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
