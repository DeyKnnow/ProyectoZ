import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FavoritoPage } from './favorito.page';

describe('FavoritoPage', () => {
  let component: FavoritoPage;
  let fixture: ComponentFixture<FavoritoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(FavoritoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
