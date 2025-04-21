import {Component} from '@angular/core';
import {FormTextInputComponent} from '../text-input/text-input.component';
import {ControlButtonComponent} from '../control-button/control-button.component';
import {NotificationComponent} from '../notification/notification.component';

@Component({
  selector: 'control-panel',
  imports: [
    FormTextInputComponent,
    ControlButtonComponent,
    NotificationComponent
  ],
  templateUrl: './control-panel.component.html',
  styleUrl: './control-panel.component.css'
})
export class ControlPanelComponent {

}
