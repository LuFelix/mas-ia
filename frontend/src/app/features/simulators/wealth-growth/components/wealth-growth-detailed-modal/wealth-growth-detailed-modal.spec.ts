import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WealthGrowthDetailedModal } from './wealth-growth-detailed-modal';

describe('WealthGrowthDetailedModal', () => {
  let component: WealthGrowthDetailedModal;
  let fixture: ComponentFixture<WealthGrowthDetailedModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WealthGrowthDetailedModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WealthGrowthDetailedModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
