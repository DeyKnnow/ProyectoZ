import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetallePlanetaPage } from './detalle-planeta.page';

describe('DetallePlanetaPage', () => {
  let component: DetallePlanetaPage;
  let fixture: ComponentFixture<DetallePlanetaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DetallePlanetaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
