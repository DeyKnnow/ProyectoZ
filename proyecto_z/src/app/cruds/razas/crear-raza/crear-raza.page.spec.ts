import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CrearRazaPage } from './crear-raza.page';

describe('CrearRazaPage', () => {
  let component: CrearRazaPage;
  let fixture: ComponentFixture<CrearRazaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearRazaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
