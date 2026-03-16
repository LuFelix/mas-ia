// Caminho: src/app/features/simulators/wealth-growth/components/wealth-growth-form/wealth-growth-form.component.ts

import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

export interface WealthGrowthFormData {
  initialCapital: number;
  monthlyContribution: number;
  interestRate: number;
  months: number;
}

@Component({
  selector: 'app-wealth-growth-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './wealth-growth-form.component.html',
  styleUrls: ['./wealth-growth-form.component.scss'],
})
export class WealthGrowthFormComponent implements OnInit {

  @Output() simulate = new EventEmitter<WealthGrowthFormData>();

  form!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      initialCapital: [null, [Validators.required, Validators.min(0)]],
      monthlyContribution: [null, [Validators.required, Validators.min(0)]],
      interestRate: [null, [Validators.required, Validators.min(0)]],
      months: [null, [Validators.required, Validators.min(1)]],
    });
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    
    // Garante que o NestJS vai receber números puros
    const rawValue = this.form.value;
    const numericData: WealthGrowthFormData = {
      initialCapital: Number(rawValue.initialCapital),
      monthlyContribution: Number(rawValue.monthlyContribution),
      interestRate: Number(rawValue.interestRate),
      months: Number(rawValue.months)
    };

    this.simulate.emit(numericData);
  }
}
