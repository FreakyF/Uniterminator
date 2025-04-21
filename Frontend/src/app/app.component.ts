import {Component, OnDestroy, OnInit} from '@angular/core';
import {ExpressionArcComponent} from './expression-arc/expression-arc.component';
import {ExpressionSegmentComponent} from './expression-segment/expression-segment.component';

@Component({
  selector: 'app-root',
  imports: [
    ExpressionArcComponent,
    ExpressionSegmentComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  // ngOnInit() {
  //   window.addEventListener('wheel', this.preventZoom, {passive: false});
  //   window.addEventListener('keydown', this.preventKeyboardZoom);
  // }
  //
  // ngOnDestroy() {
  //   window.removeEventListener('wheel', this.preventZoom);
  //   window.removeEventListener('keydown', this.preventKeyboardZoom);
  // }
  //
  // preventZoom = (e: WheelEvent) => {
  //   if (e.ctrlKey) {
  //     e.preventDefault();
  //   }
  // };
  //
  // preventKeyboardZoom = (e: KeyboardEvent) => {
  //   if (e.ctrlKey && (e.key === '+' || e.key === '-' || e.key === '=')) {
  //     e.preventDefault();
  //   }
  // };
}
