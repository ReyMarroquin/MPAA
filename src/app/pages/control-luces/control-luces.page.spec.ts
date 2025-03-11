import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ControlLucesPage } from './control-luces.page';

describe('ControlLucesPage', () => {
  let component: ControlLucesPage;
  let fixture: ComponentFixture<ControlLucesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ControlLucesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
