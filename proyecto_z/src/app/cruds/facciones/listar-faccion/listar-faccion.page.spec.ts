import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListarFaccionPage } from './listar-faccion.page';

describe('ListarFaccionPage', () => {
  let component: ListarFaccionPage;
  let fixture: ComponentFixture<ListarFaccionPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarFaccionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
