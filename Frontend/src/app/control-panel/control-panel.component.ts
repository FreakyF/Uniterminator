import {Component} from '@angular/core';
import {TextInputComponent} from '../text-input/text-input.component';
import {ControlButtonComponent} from '../control-button/control-button.component';
import {NotificationComponent} from '../notification/notification.component';
import {ExpressionService} from '../expression.service';
import {FormsModule} from '@angular/forms';
import {NgIf} from '@angular/common';

@Component({
  selector: 'control-panel',
  imports: [
    TextInputComponent,
    ControlButtonComponent,
    NotificationComponent,
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

  public mode: 'parallelize' | 'eliminate' = 'parallelize';

  constructor(private readonly expressionService: ExpressionService) {
  }

  parallelize(): void {
    this.mode = 'parallelize';
  }

  eliminate(): void {
    this.mode = 'eliminate';
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
  }
}
