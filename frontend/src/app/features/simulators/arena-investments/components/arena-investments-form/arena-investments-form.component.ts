import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ArenaInvestmentRequest } from '../../models/arena-investments.model';

@Component({
  selector: 'app-arena-investments-form',
  standalone: true,
  imports: [
    CommonModule, 
    ReactiveFormsModule, 
    MatFormFieldModule, 
    MatInputModule, 
    MatButtonModule, 
    MatIconModule
  ],
  templateUrl: './arena-investments-form.component.html',
  styleUrls: ['./arena-investments-form.component.scss']
})
export class ArenaInvestmentsFormComponent {
  @Output() simulate = new EventEmitter<ArenaInvestmentRequest>();
  
  form: FormGroup;

  valorInicialDisplay = '';
  aporteMensalDisplay = '';
  prazoMesesDisplay = '';

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      valorInicial: ['', [Validators.required, Validators.min(0)]],
      aporteMensal: ['', [Validators.required, Validators.min(0)]],
      prazoMeses: ['', [Validators.required, Validators.min(1), Validators.max(600)]]
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.simulate.emit(this.form.value);
    } else {
      this.form.markAllAsTouched();
    }
  }

  onCurrencyInput(controlName: 'valorInicial' | 'aporteMensal', event: Event): void {
    const input = event.target as HTMLInputElement;
    const digits = (input.value ?? '').replace(/\D/g, '');
    const numericValue = digits ? Number(digits) / 100 : null;

    this.form.get(controlName)?.setValue(numericValue);
    this.form.get(controlName)?.markAsDirty();

    const formatted = numericValue !== null ? this.formatCurrency(numericValue) : '';
    if (controlName === 'valorInicial') {
      this.valorInicialDisplay = formatted;
    } else {
      this.aporteMensalDisplay = formatted;
    }
  }

  onIntegerInput(controlName: 'prazoMeses', event: Event): void {
    const input = event.target as HTMLInputElement;
    const digits = (input.value ?? '').replace(/\D/g, '');
    const numericValue = digits ? Number(digits) : null;

    this.form.get(controlName)?.setValue(numericValue);
    this.form.get(controlName)?.markAsDirty();
    this.prazoMesesDisplay = digits ? numericValue!.toLocaleString('pt-BR') : '';
  }

  markAsTouched(controlName: 'valorInicial' | 'aporteMensal' | 'prazoMeses'): void {
    this.form.get(controlName)?.markAsTouched();
  }

  private formatCurrency(value: number): string {
    return value.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });
  }
}