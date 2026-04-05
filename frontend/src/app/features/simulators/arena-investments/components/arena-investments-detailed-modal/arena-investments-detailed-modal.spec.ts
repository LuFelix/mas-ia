import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { ArenaInvestmentsDetailedModalComponent } from './arena-investments-detailed-modal';

describe('ArenaInvestmentsDetailedModalComponent', () => {
  let component: ArenaInvestmentsDetailedModalComponent;
  let fixture: ComponentFixture<ArenaInvestmentsDetailedModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArenaInvestmentsDetailedModalComponent],
      providers: [
        {
          provide: MAT_DIALOG_DATA,
          useValue: {
            perfis: [
              {
                nome: 'Conservador',
                taxaMensal: 0.01,
                saldoFinal: 1100,
                historico: [{ mes: 1, saldo: 1100, rendimento: 100 }]
              },
              {
                nome: 'Moderado',
                taxaMensal: 0.02,
                saldoFinal: 1200,
                historico: [{ mes: 1, saldo: 1200, rendimento: 200 }]
              },
              {
                nome: 'Arrojado',
                taxaMensal: 0.03,
                saldoFinal: 1300,
                historico: [{ mes: 1, saldo: 1300, rendimento: 300 }]
              }
            ]
          }
        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArenaInvestmentsDetailedModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
