import {Component, Input} from '@angular/core';
import {NgClass} from '@angular/common';

@Component({
  selector: 'control-button',
  imports: [
    NgClass
  ],
  templateUrl: './control-button.component.html',
  styleUrl: './control-button.component.css'
})
export class ControlButtonComponent {
  @Input() label!: string;
  @Input() active = false;
  get isWhiteBackground(): boolean {
    return ['Eliminate', 'Parallelize', 'Swap A', 'Swap B'].includes(this.label);
  }
}
