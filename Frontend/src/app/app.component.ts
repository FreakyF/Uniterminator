import {Component} from '@angular/core';
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
}
