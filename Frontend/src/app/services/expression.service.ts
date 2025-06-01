import {Injectable} from '@angular/core';
import {BehaviorSubject, Subject} from 'rxjs';

export interface ParallelParams {
  expressionA: string;
  expressionB: string;
  operation: string;
}

export interface EliminateParams {
  expressionA: string;
  expressionB: string;
  operation: string;
  expressionC: string;
}

@Injectable({
  providedIn: 'root'
})
export class ExpressionService {
  private readonly _parallel = new BehaviorSubject<ParallelParams>({expressionA: '', expressionB: '', operation: ''});
  readonly parallel$ = this._parallel.asObservable();
  private readonly swapSubject = new Subject<'A' | 'B'>();
  public swap$ = this.swapSubject.asObservable();

  private readonly clearSubject = new Subject<void>();
  public clear$ = this.clearSubject.asObservable();

  private readonly _eliminate = new BehaviorSubject<EliminateParams>({
    expressionA: '',
    expressionB: '',
    operation: '',
    expressionC: ''
  });
  readonly eliminate$ = this._eliminate.asObservable();

  parallelize(expressionA: string, expressionB: string, operation: string) {
    this._parallel.next({expressionA: expressionA, expressionB: expressionB, operation: operation});
  }

  eliminate(expressionA: string, expressionB: string, operation: string, expressionC: string) {
    this._eliminate.next({
      expressionA: expressionA,
      expressionB: expressionB,
      operation: operation,
      expressionC: expressionC
    });
  }

  swapA() {
    this.swapSubject.next('A');
  }

  swapB() {
    this.swapSubject.next('B');
  }

  clear() {
    this.clearSubject.next();
  }
}
