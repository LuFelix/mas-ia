import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ArenaInvestmentsService } from './arena-investments.service';
import { ArenaInvestmentRequest } from '../models/arena-investments.model';

describe('ArenaInvestmentsService (TDD - RED)', () => {
  let service: ArenaInvestmentsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArenaInvestmentsService);
  });

  it('deve retornar os 3 perfis na resposta da simulação', fakeAsync(() => {
    const request: ArenaInvestmentRequest = {
      valorInicial: 1000,
      aporteMensal: 100,
      prazoMeses: 12,
    };

    let response: any;

    service.simulate(request).subscribe((result) => {
      response = result;
    });

    tick(500);

    expect(response).toBeTruthy();
    expect(response.perfis.length).toBe(3);
    expect(response.perfis.map((p: any) => p.nome)).toEqual([
      'Conservador',
      'Moderado',
      'Arrojado',
    ]);
  }));

  it('deve calcular corretamente o saldoFinal do perfil Moderado (1% a.m.) para 12 meses', fakeAsync(() => {
    const request: ArenaInvestmentRequest = {
      valorInicial: 1000,
      aporteMensal: 100,
      prazoMeses: 12,
    };

    let response: any;

    service.simulate(request).subscribe((result) => {
      response = result;
    });

    tick(500);

    const perfilModerado = response.perfis.find((p: any) => p.nome === 'Moderado');
    expect(perfilModerado).toBeTruthy();

    const expectedSaldoFinalModerado = 2395.075331451667;
    expect(perfilModerado.saldoFinal).toBeCloseTo(expectedSaldoFinalModerado, 10);
  }));
});