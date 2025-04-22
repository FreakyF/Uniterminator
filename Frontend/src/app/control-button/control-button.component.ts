import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'control-button',
  imports: [],
  templateUrl: './control-button.component.html',
  styleUrl: './control-button.component.css'
})
export class ControlButtonComponent {
  @Input() label!: string;

  @Output() onKeyDown = new EventEmitter<KeyboardEvent>();
  @Output() onKeyUp = new EventEmitter<KeyboardEvent>();
}
