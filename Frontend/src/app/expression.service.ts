import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

export interface ExpressionParams {
  a: string;
  b: string;
  op: string;
}

@Injectable({
  providedIn: 'root'
})
export class ExpressionService {
  private readonly _params = new BehaviorSubject<ExpressionParams>({a: '', b: '', op: ''});
  readonly params$ = this._params.asObservable();

  parallelize(a: string, b: string, op: string) {
    this._params.next({a, b, op});
  }
}
