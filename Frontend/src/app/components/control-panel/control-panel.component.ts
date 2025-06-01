import {Component, inject} from '@angular/core';
import {TextInputComponent} from '../text-input/text-input.component';
import {ControlButtonComponent} from '../control-button/control-button.component';
import {ExpressionService} from '../../services/expression.service';
import {FormsModule} from '@angular/forms';
import {NgIf} from '@angular/common';
import {CreateSnapshotDto} from '../../models/create-snapshot-dto';
import {ApiService} from '../../services/api.service';

@Component({
  selector: 'control-panel',
  imports: [
    TextInputComponent,
    ControlButtonComponent,
    FormsModule,
    NgIf
  ],
  templateUrl: './control-panel.component.html',
  styleUrl: './control-panel.component.css'
})
export class ControlPanelComponent {
  public expressionA = '';
  public expressionB = '';
  public operation = '';
  public expressionC = '';
  public snapshotName = '';

  public mode: 'parallelize' | 'eliminate' = 'parallelize';
  swapMode: 'A' | 'B' | null = null;
  isDrawn = false;


  private readonly expressionService = inject(ExpressionService);
  private readonly api = inject(ApiService);

  parallelize(): void {
    this.mode = 'parallelize';
  }

  eliminate(): void {
    this.mode = 'eliminate';
  }

  onSwapA() {
    this.expressionService.swapA();
    this.swapMode = 'A';
  }

  onSwapB() {
    this.expressionService.swapB();
    this.swapMode = 'B';
  }

  draw(): void {
    if (this.mode === 'parallelize') {
      this.expressionService.parallelize(
        this.expressionA,
        this.expressionB,
        this.operation
      );
    } else {
      this.expressionService.eliminate(
        this.expressionA,
        this.expressionB,
        this.operation,
        this.expressionC
      );
    }
    this.isDrawn = !!this.expressionA.trim() && !!this.expressionB.trim() && !!this.operation.trim() && !!this.expressionA.trim() && !!this.expressionB.trim() && !!this.operation.trim() && !!this.expressionC.trim();
  }


  clear(): void {
    this.expressionA = '';
    this.expressionB = '';
    this.operation = '';
    this.expressionC = '';

    this.expressionService.clear();
    this.isDrawn = false;
    this.swapMode = null;
  }

  save(): void {
    if (!this.isDrawn) {
      return;
    }

    const name = this.snapshotName.trim() || new Date().toISOString();

    let dto: CreateSnapshotDto;

    if (this.mode === 'parallelize') {
      dto = {
        snapshotName: name,
        parallelizeOperation: {
          expressionA: this.expressionA,
          expressionB: this.expressionB,
          operationSymbol: this.operation,
        },
        eliminateOperation: null,
      };
    } else {
      dto = {
        snapshotName: name,
        eliminateOperation: {
          expressionA: this.expressionA,
          expressionB: this.expressionB,
          expressionExtra: this.expressionC,
          operationSymbol: this.operation,
        },
        parallelizeOperation: null,
      };
    }

    this.api.createSnapshot(dto).subscribe({
      next: () => {
        this.clear();
      },
      error: (err) => console.error('Error saving snapshot', err),
    });
  }
}
