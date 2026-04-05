import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import { ArenaInvestmentProfile, ArenaInvestmentRequest, ArenaInvestmentResponse } from '../models/arena-investments.model';

@Injectable({
  providedIn: 'root'
})
export class ArenaInvestmentsService {

  simulate(request: ArenaInvestmentRequest): Observable<ArenaInvestmentResponse> {
    const { valorInicial, aporteMensal, prazoMeses } = request;
    const configuracoesPerfis: Array<Pick<ArenaInvestmentProfile, 'nome' | 'taxaMensal'>> = [
      { nome: 'Conservador', taxaMensal: 0.008 },
      { nome: 'Moderado', taxaMensal: 0.01 },
      { nome: 'Arrojado', taxaMensal: 0.015 }
    ];

    const perfis: ArenaInvestmentResponse['perfis'] = configuracoesPerfis.map((configuracao) => {
      const perfil: ArenaInvestmentProfile = {
        nome: configuracao.nome,
        taxaMensal: configuracao.taxaMensal,
        saldoFinal: 0,
        historico: []
      };

      let saldoAnterior = valorInicial;

      for (let mes = 1; mes <= prazoMeses; mes++) {
        const rendimento = saldoAnterior * perfil.taxaMensal;
        const saldoAtual = saldoAnterior + rendimento + aporteMensal;

        perfil.historico.push({
          mes,
          saldo: saldoAtual,
          rendimento
        });

        saldoAnterior = saldoAtual;
      }

      perfil.saldoFinal = saldoAnterior;
      return perfil;
    });

    const resultado: ArenaInvestmentResponse = { perfis };

    return of(resultado).pipe(delay(500));
  }
}