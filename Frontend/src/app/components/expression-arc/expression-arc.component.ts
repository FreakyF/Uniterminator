import {
  AfterViewInit, ChangeDetectorRef,
  Component,
  ElementRef, inject,
  Input,
  OnChanges,
  SimpleChanges,
  ViewChild
} from '@angular/core';

@Component({
  selector: 'expression-arc',
  templateUrl: './expression-arc.component.html',
  styleUrls: ['./expression-arc.component.css']
})
export class ExpressionArcComponent implements AfterViewInit, OnChanges {
  @Input() expressionA = '';
  @Input() operatorSymbol = '';
  @Input() expressionB = '';

  @ViewChild('svgRoot', { static: true }) svgRoot!: ElementRef<SVGSVGElement>;
  @ViewChild('textA',    { static: true }) textA!:    ElementRef<SVGTextElement>;
  @ViewChild('textOperator',{static: true}) textOperator!: ElementRef<SVGTextElement>;
  @ViewChild('textB',    { static: true }) textB!:    ElementRef<SVGTextElement>;

  public arcPath = '';

  private readonly fontSize       = 48;
  private readonly horizontalGap  = 20;
  private readonly topPadding     = 20;

  private readonly cd = inject(ChangeDetectorRef);

  ngAfterViewInit(): void {
    const svg = this.svgRoot.nativeElement;

    svg.setAttribute('viewBox', '0 0 600 100');
    svg.setAttribute('preserveAspectRatio', 'xMinYMin meet');

    svg.setAttribute('width',  '50vmin');
    svg.setAttribute('height', `${(50 * 100/600).toFixed(2)}vmin`);

    queueMicrotask(() => {
      this.render();
      this.cd.detectChanges();
    });
  }

  ngOnChanges(_: SimpleChanges): void {
    if (this.svgRoot) {
      setTimeout(() => this.render());
    }
  }

  private render(): void {
    this.applyFontSize();

    const expressionAWidth = this.resetAndMeasure(this.textA);
    const operatorWidth    = this.resetAndMeasure(this.textOperator);
    this.resetAndMeasure(this.textB);

    const xA         = this.horizontalGap;
    const xOperator  = xA + expressionAWidth + this.horizontalGap;
    const xB         = xOperator + operatorWidth + this.horizontalGap;
    const baselineY  = this.fontSize + this.topPadding;

    this.setPosition(this.textA,      xA,        baselineY);
    this.setPosition(this.textOperator,xOperator, baselineY);
    this.setPosition(this.textB,      xB,        baselineY);

    const boxA = this.textA.nativeElement.getBBox();
    const boxB = this.textB.nativeElement.getBBox();

    this.arcPath = this.buildArc(boxA, boxB);
  }

  private applyFontSize(): void {
    [this.textA, this.textOperator, this.textB].forEach(ref => {
      const el = ref.nativeElement;
      el.setAttribute('font-size', `${this.fontSize}px`);
      el.setAttribute('fill', '#F8F8FF');
    });
  }

  private resetAndMeasure(elRef: ElementRef<SVGTextElement>): number {
    const el = elRef.nativeElement;
    el.setAttribute('x', '0');
    el.setAttribute('y', `${this.fontSize + this.topPadding}`);
    return el.getBBox().width;
  }

  private setPosition(
    elRef: ElementRef<SVGTextElement>,
    x: number,
    y: number
  ): void {
    const el = elRef.nativeElement;
    el.setAttribute('x', `${x}`);
    el.setAttribute('y', `${y}`);
  }

  private buildArc(boxA: DOMRect, boxB: DOMRect): string {
    const yTop   = Math.min(boxA.y, boxB.y);
    const xStart = boxA.x + boxA.width / 2;
    const xEnd   = boxB.x + boxB.width / 2;
    const radius = xEnd - xStart;
    return `M ${xStart} ${yTop} A ${radius} ${radius} 0 0 1 ${xEnd} ${yTop}`;
  }
}
