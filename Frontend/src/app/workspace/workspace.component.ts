import {Component, OnInit} from '@angular/core';
import {ExpressionArcComponent} from '../expression-arc/expression-arc.component';
import {ExpressionSegmentComponent} from '../expression-segment/expression-segment.component';
import {EliminateParams, ExpressionService, ParallelParams} from '../expression.service';

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
  parallelExpressionA = '';
  parallelExpressionB = '';
  parallelOperatorSymbol = '';

  eliminateExpressionA = '';
  eliminateExpressionB = '';
  eliminateOperatorSymbol = '';
  eliminateExpressionC = '';

  constructor(private readonly expressionService: ExpressionService) {
  }

  ngOnInit() {
    this.expressionService.parallel$.subscribe((parallelParams: ParallelParams) => {
      this.parallelExpressionA = parallelParams.expressionA;
      this.parallelExpressionB = parallelParams.expressionB;
      this.parallelOperatorSymbol = parallelParams.operation;
    });
    this.expressionService.eliminate$.subscribe((eliminateParams: EliminateParams) => {
      this.eliminateExpressionA = eliminateParams.expressionA;
      this.eliminateExpressionB = eliminateParams.expressionB;
      this.eliminateOperatorSymbol = eliminateParams.operation;
      this.eliminateExpressionC = eliminateParams.expressionC;
    });
  }
}
