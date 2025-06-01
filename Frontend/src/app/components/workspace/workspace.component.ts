import {Component, OnInit} from '@angular/core';
import {ExpressionArcComponent} from '../expression-arc/expression-arc.component';
import {ExpressionSegmentComponent} from '../expression-segment/expression-segment.component';
import {EliminateParams, ExpressionService, ParallelParams} from '../../expression.service';
import {ExpressionArcWithSegmentComponent} from '../expression-arc-with-segment/expression-arc-with-segment.component';
import {NgIf} from '@angular/common';

@Component({
  selector: 'workspace',
  imports: [
    ExpressionArcComponent,
    ExpressionSegmentComponent,
    ExpressionArcWithSegmentComponent,
    NgIf
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

  swapSide: 'A' | 'B' | null = null;

  constructor(private readonly expressionService: ExpressionService) {
  }

  ngOnInit() {
    this.expressionService.parallel$.subscribe((p: ParallelParams) => {
      this.parallelExpressionA = p.expressionA;
      this.parallelExpressionB = p.expressionB;
      this.parallelOperatorSymbol = p.operation;
      this.swapSide = null;
    });

    this.expressionService.eliminate$.subscribe((e: EliminateParams) => {
      this.eliminateExpressionA = e.expressionA;
      this.eliminateExpressionB = e.expressionB;
      this.eliminateOperatorSymbol = e.operation;
      this.eliminateExpressionC = e.expressionC;
      this.swapSide = null;
    });

    this.expressionService.swap$.subscribe(side => {
      this.swapSide = side;
    });

    this.expressionService.clear$.subscribe(() => {
      this.parallelExpressionA = '';
      this.parallelExpressionB = '';
      this.parallelOperatorSymbol = '';
      this.eliminateExpressionA = '';
      this.eliminateExpressionB = '';
      this.eliminateOperatorSymbol = '';
      this.eliminateExpressionC = '';
      this.swapSide = null;
    });
  }
}
