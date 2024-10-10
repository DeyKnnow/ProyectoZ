import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminPersonajesPage } from './admin-personajes.page';

describe('AdminPersonajesPage', () => {
  let component: AdminPersonajesPage;
  let fixture: ComponentFixture<AdminPersonajesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPersonajesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
