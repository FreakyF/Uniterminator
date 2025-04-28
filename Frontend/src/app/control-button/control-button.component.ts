import {Component, Input} from '@angular/core';

@Component({
  selector: 'control-button',
  imports: [],
  templateUrl: './control-button.component.html',
  styleUrl: './control-button.component.css'
})
export class ControlButtonComponent {
  @Input() label!: string;
  get isWhiteBackground(): boolean {
    return ['Eliminate', 'Parallelize', 'Swap A', 'Swap B'].includes(this.label);
  }
}
