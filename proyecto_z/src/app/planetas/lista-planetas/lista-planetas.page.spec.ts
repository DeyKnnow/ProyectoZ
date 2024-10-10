import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListaPlanetasPage } from './lista-planetas.page';

describe('ListaPlanetasPage', () => {
  let component: ListaPlanetasPage;
  let fixture: ComponentFixture<ListaPlanetasPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaPlanetasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
