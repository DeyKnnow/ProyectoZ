import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CrearPersonajePage } from './crear-personaje.page';

describe('CrearPersonajePage', () => {
  let component: CrearPersonajePage;
  let fixture: ComponentFixture<CrearPersonajePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearPersonajePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
