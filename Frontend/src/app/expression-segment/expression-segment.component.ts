import {AfterViewInit, Component, ElementRef, Input, OnChanges, SimpleChanges, ViewChild} from '@angular/core';

@Component({
  selector: 'app-expression-segment',
  imports: [],
  templateUrl: './expression-segment.component.html',
  styleUrl: './expression-segment.component.css'
})
export class ExpressionSegmentComponent implements AfterViewInit, OnChanges {
  @Input() expressionA = '';
  @Input() operatorSymbol = '';
  @Input() expressionB = '';

  @ViewChild('svgRoot', {static: true}) svgRoot!: ElementRef<SVGSVGElement>;
  @ViewChild('textA', {static: true}) textA!: ElementRef<SVGTextElement>;
  @ViewChild('textOperator', {static: true}) textOperator!: ElementRef<SVGTextElement>;
  @ViewChild('textB', {static: true}) textB!: ElementRef<SVGTextElement>;

  public arcPath = '';

  private readonly fontSize = 48;
  private readonly verticalGap = 20;
  private readonly leftPadding = 20;
  private readonly rightPadding = 20;
  private readonly tickLength = 16;

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

    const heightA = this.resetAndMeasure(this.textA);
    const heightOp = this.resetAndMeasure(this.textOperator);
    this.resetAndMeasure(this.textB);

    const yA = this.verticalGap;
    const yOp = yA + heightA + this.verticalGap;
    const yB = yOp + heightOp + this.verticalGap;

    const xText = this.leftPadding + this.verticalGap;

    this.setPosition(this.textA, xText, yA + this.fontSize);
    this.setPosition(this.textOperator, xText, yOp + this.fontSize);
    this.setPosition(this.textB, xText, yB + this.fontSize);

    const boxA = this.textA.nativeElement.getBBox();
    const boxB = this.textB.nativeElement.getBBox();
    this.arcPath = this.buildLine(boxA, boxB);

    const svgWidth = xText + boxB.width + this.rightPadding;
    const svgHeight = boxB.y + boxB.height + this.verticalGap;
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
    el.setAttribute('x', `${this.leftPadding}`);
    el.setAttribute('y', `${this.fontSize}`);
    return el.getBBox().height;
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

  private buildLine(boxA: DOMRect, boxB: DOMRect): string {
    const xLine = this.leftPadding;
    const yStart = boxA.y + boxA.height / 2;
    const yEnd = boxB.y + boxB.height / 2;
    const half = this.tickLength / 2;

    return [
      `M ${xLine} ${yStart} L ${xLine} ${yEnd}`,
      `M ${xLine - half} ${yStart} L ${xLine + half} ${yStart}`,
      `M ${xLine - half} ${yEnd}   L ${xLine + half} ${yEnd}`
    ].join(' ');
  }

  private setSvgSize(width: number, height: number): void {
    const svg = this.svgRoot.nativeElement;
    svg.setAttribute('width', `${width}`);
    svg.setAttribute('height', `${height}`);
  }
}
