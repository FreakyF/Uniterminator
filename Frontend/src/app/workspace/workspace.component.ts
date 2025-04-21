import {Component} from '@angular/core';
import {ExpressionArcComponent} from '../expression-arc/expression-arc.component';
import {ExpressionSegmentComponent} from '../expression-segment/expression-segment.component';

@Component({
  selector: 'workspace',
  imports: [
    ExpressionArcComponent,
    ExpressionSegmentComponent
  ],
  templateUrl: './workspace.component.html',
  styleUrl: './workspace.component.css'
})
export class WorkspaceComponent {

}
