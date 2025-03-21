import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConocenosPage } from './conocenos.page';


describe('ConocenosPage', () => {
  let component: ConocenosPage;
  let fixture: ComponentFixture<ConocenosPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ConocenosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
