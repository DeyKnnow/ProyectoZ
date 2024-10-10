import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListaPersonajePage } from './lista-personaje.page';

describe('ListaPersonajePage', () => {
  let component: ListaPersonajePage;
  let fixture: ComponentFixture<ListaPersonajePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaPersonajePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
