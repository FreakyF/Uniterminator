import {Component, OnInit} from '@angular/core';
import {ExpressionArcComponent} from '../expression-arc/expression-arc.component';
import {ExpressionSegmentComponent} from '../expression-segment/expression-segment.component';
import {ExpressionParams, ExpressionService} from '../expression.service';

@Component({
  selector: 'workspace',
  imports: [
    ExpressionArcComponent,
    ExpressionSegmentComponent
  ],
  templateUrl: './workspace.component.html',
  styleUrl: './workspace.component.css'
})
export class WorkspaceComponent implements OnInit {
  expressionA = '';
  operatorSymbol = '';
  expressionB = '';

  constructor(private readonly expressionService: ExpressionService) {
  }

  ngOnInit() {
    this.expressionService.params$.subscribe((expressionParams: ExpressionParams) => {
      this.expressionA = expressionParams.a;
      this.operatorSymbol = expressionParams.op;
      this.expressionB = expressionParams.b;
    });
  }
}
