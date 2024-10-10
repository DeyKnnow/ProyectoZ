import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminPlanetaPage } from './admin-planeta.page';

describe('AdminPlanetaPage', () => {
  let component: AdminPlanetaPage;
  let fixture: ComponentFixture<AdminPlanetaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPlanetaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
