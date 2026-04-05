import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WealthGrowthDetailedModalComponent } from './wealth-growth-detailed-modal.component';

describe('WealthGrowthDetailedModal', () => {
  let component: WealthGrowthDetailedModalComponent;
  let fixture: ComponentFixture<WealthGrowthDetailedModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WealthGrowthDetailedModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WealthGrowthDetailedModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
