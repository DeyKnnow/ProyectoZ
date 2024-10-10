import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CrearFaccionPage } from './crear-faccion.page';

describe('CrearFaccionPage', () => {
  let component: CrearFaccionPage;
  let fixture: ComponentFixture<CrearFaccionPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearFaccionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
