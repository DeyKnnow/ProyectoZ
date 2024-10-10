import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PanelAdminPage } from './panel-admin.page';

describe('PanelAdminPage', () => {
  let component: PanelAdminPage;
  let fixture: ComponentFixture<PanelAdminPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PanelAdminPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
