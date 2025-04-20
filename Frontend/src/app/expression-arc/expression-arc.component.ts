import {AfterViewInit, Component, ElementRef, Input, OnChanges, SimpleChanges, ViewChild} from '@angular/core';

@Component({
  selector: 'app-expression-arc',
  imports: [],
  templateUrl: './expression-arc.component.html',
  styleUrl: './expression-arc.component.css'
})
export class ExpressionArcComponent implements AfterViewInit, OnChanges {
  @Input() expressionA = '';
  @Input() operatorSymbol = '';
  @Input() expressionB = '';

  @ViewChild('svgRoot', {static: true}) svgRoot!: ElementRef<SVGSVGElement>;
  @ViewChild('textA', {static: true}) textA!: ElementRef<SVGTextElement>;
  @ViewChild('textOperator', {static: true}) textOperator!: ElementRef<SVGTextElement>;
  @ViewChild('textB', {static: true}) textB!: ElementRef<SVGTextElement>;

  public arcPath = '';

  private readonly fontSize = 48;
  private readonly horizontalGap = 20;
  private readonly topPadding = 20;
  private readonly bottomPadding = 20;

  ngAfterViewInit(): void {
    this.render();
  }

  ngOnChanges(_: SimpleChanges): void {
    if (this.svgRoot) {
      setTimeout(() => this.render());
    }
  }

  private render(): void {
    this.applyFontSize();

    const expressionAWidth = this.resetAndMeasure(this.textA);
    const operatorWidth = this.resetAndMeasure(this.textOperator);

    this.resetAndMeasure(this.textB);

    const xA = this.horizontalGap;
    const xOperator = xA + expressionAWidth + this.horizontalGap;
    const xB = xOperator + operatorWidth + this.horizontalGap;
    const baselineY = this.fontSize + this.topPadding;

    this.setPosition(this.textA, xA, baselineY);
    this.setPosition(this.textOperator, xOperator, baselineY);
    this.setPosition(this.textB, xB, baselineY);

    const boxA = this.textA.nativeElement.getBBox();
    const boxB = this.textB.nativeElement.getBBox();

    this.arcPath = this.buildArc(boxA, boxB);

    const svgWidth = boxB.x + boxB.width + this.horizontalGap;
    const svgHeight = baselineY + this.bottomPadding;
    this.setSvgSize(svgWidth, svgHeight);
  }

  private applyFontSize(): void {
    [this.textA, this.textOperator, this.textB]
      .forEach(ref =>
        ref.nativeElement.setAttribute('font-size', `${this.fontSize}px`)
      );
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
    const yTop = Math.min(boxA.y, boxB.y);
    const xStart = boxA.x + boxA.width / 2;
    const xEnd = boxB.x + boxB.width / 2;
    const radius = (xEnd - xStart);
    return `M ${xStart} ${yTop} A ${radius} ${radius} 0 0 1 ${xEnd} ${yTop}`;
  }

  private setSvgSize(width: number, height: number): void {
    const svg = this.svgRoot.nativeElement;
    svg.setAttribute('width', `${width}`);
    svg.setAttribute('height', `${height}`);
  }
}
