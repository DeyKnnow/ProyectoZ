import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SexoPage } from './sexo.page';

describe('SexoPage', () => {
  let component: SexoPage;
  let fixture: ComponentFixture<SexoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SexoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
