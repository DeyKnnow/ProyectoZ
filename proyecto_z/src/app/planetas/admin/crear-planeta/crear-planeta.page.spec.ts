import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CrearPlanetaPage } from './crear-planeta.page';

describe('CrearPlanetaPage', () => {
  let component: CrearPlanetaPage;
  let fixture: ComponentFixture<CrearPlanetaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearPlanetaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
