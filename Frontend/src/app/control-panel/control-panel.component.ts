import {Component} from '@angular/core';
import {TextInputComponent} from '../text-input/text-input.component';
import {ControlButtonComponent} from '../control-button/control-button.component';
import {NotificationComponent} from '../notification/notification.component';
import {ExpressionService} from '../expression.service';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'control-panel',
  imports: [
    TextInputComponent,
    ControlButtonComponent,
    NotificationComponent,
    FormsModule
  ],
  templateUrl: './control-panel.component.html',
  styleUrl: './control-panel.component.css'
})
export class ControlPanelComponent {
  public expressionA = '';
  public expressionB = '';
  public operation = '';

  constructor(private readonly expressionService: ExpressionService) {
  }

  parallelize() {
    this.expressionService.parallelize(this.expressionA, this.expressionB, this.operation);
  }
}
