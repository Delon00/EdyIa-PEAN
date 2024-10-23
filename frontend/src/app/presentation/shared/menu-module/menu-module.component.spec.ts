import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuModuleComponent } from './menu-module.component';

describe('MenuModuleComponent', () => {
  let component: MenuModuleComponent;
  let fixture: ComponentFixture<MenuModuleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenuModuleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
