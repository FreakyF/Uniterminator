import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  inject,
  Input,
  OnChanges,
  SimpleChanges,
  ViewChild
} from '@angular/core';

@Component({
  selector: 'expression-segment',
  templateUrl: './expression-segment.component.html',
  styleUrls: ['./expression-segment.component.css']
})
export class ExpressionSegmentComponent implements AfterViewInit, OnChanges {
  @Input() expressionA = '';
  @Input() operatorSymbol = '';
  @Input() expressionB = '';
  @Input() expressionC = '';

  @ViewChild('svgRoot', {static: true}) svgRoot!: ElementRef<SVGSVGElement>;
  @ViewChild('textA', {static: true}) textA!: ElementRef<SVGTextElement>;
  @ViewChild('textOperator', {static: true}) textOperator!: ElementRef<SVGTextElement>;
  @ViewChild('textB', {static: true}) textB!: ElementRef<SVGTextElement>;
  @ViewChild('textSep', {static: true}) textSep!: ElementRef<SVGTextElement>;
  @ViewChild('textC', {static: true}) textC!: ElementRef<SVGTextElement>;

  public segmentPath = '';

  private readonly fontSize = 48;
  private readonly verticalGap = 20;
  private readonly leftPadding = 20;
  private readonly rightPadding = 20;
  private readonly tickLength = 16;

  private readonly displayWidth = 50;
  private readonly displayHeight = 200 * (100 / 600);

  private readonly cd = inject(ChangeDetectorRef);

  ngAfterViewInit(): void {
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

    const heightA = this.resetAndMeasure(this.textA);
    const heightOp = this.resetAndMeasure(this.textOperator);
    const heightB = this.resetAndMeasure(this.textB);
    const heightSep = this.resetAndMeasure(this.textSep);

    const yA = this.verticalGap;
    const yOp = yA + heightA + this.verticalGap;
    const yB = yOp + heightOp + this.verticalGap;
    const ySep = yB + heightB + this.verticalGap;
    const yC = ySep + heightSep + this.verticalGap;

    const xText = this.leftPadding + this.verticalGap;

    this.setPosition(this.textA, xText, yA + this.fontSize);
    this.setPosition(this.textOperator, xText, yOp + this.fontSize);
    this.setPosition(this.textB, xText, yB + this.fontSize);
    this.setPosition(this.textSep, xText, ySep + this.fontSize);
    this.setPosition(this.textC, xText, yC + this.fontSize);

    const boxA = this.textA.nativeElement.getBBox();
    const boxC = this.textC.nativeElement.getBBox();
    this.segmentPath = this.buildLine(boxA, boxC);

    const svgWidth = xText + boxC.width + this.rightPadding;
    const svgHeight = boxC.y + boxC.height + this.verticalGap;

    this.setSvgSize(svgWidth, svgHeight);
  }

  private applyFontSize(): void {
    [this.textA, this.textOperator, this.textB, this.textSep, this.textC]
      .forEach(ref => {
        const el = ref.nativeElement;
        el.setAttribute('font-size', `${this.fontSize}px`);
        el.setAttribute('fill', '#F8F8FF');
      });
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

  private buildLine(boxA: DOMRect, boxC: DOMRect): string {
    if (boxA.width === 0 && boxC.width === 0) {
      return '';
    }
    const xLine = this.leftPadding + 12;
    const yStart = boxA.y + boxA.height / 2;
    const yEnd = boxC.y + boxC.height / 2;
    const half = this.tickLength / 2;

    return [
      `M ${xLine} ${yStart} L ${xLine} ${yEnd}`,
      `M ${xLine - half} ${yStart} L ${xLine + half} ${yStart}`,
      `M ${xLine - half} ${yEnd}   L ${xLine + half} ${yEnd}`
    ].join(' ');
  }

  private setSvgSize(width: number, height: number): void {
    const svg = this.svgRoot.nativeElement;

    svg.setAttribute('viewBox', `0 0 ${width} ${height}`);
    svg.setAttribute('preserveAspectRatio', 'xMinYMin meet');

    svg.setAttribute('width', `${this.displayWidth}vmin`);
    svg.setAttribute('height', `${this.displayHeight.toFixed(2)}vmin`);
  }
}
