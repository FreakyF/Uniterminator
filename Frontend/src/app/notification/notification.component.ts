import {Component, Input} from '@angular/core';

@Component({
  selector: 'notification',
  imports: [],
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.css'
})
export class NotificationComponent {
  @Input() status: string = '';
}
