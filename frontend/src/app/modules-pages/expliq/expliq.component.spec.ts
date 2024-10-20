import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpliqComponent } from './expliq.component';

describe('ExpliqComponent', () => {
  let component: ExpliqComponent;
  let fixture: ComponentFixture<ExpliqComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExpliqComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExpliqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
