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
import {NgIf} from '@angular/common';
import {EliminateParams} from '../../expression.service';

@Component({
  selector: 'expression-arc-with-segment',
  imports: [NgIf],
  templateUrl: './expression-arc-with-segment.component.html',
  styleUrls: ['./expression-arc-with-segment.component.css']
})
export class ExpressionArcWithSegmentComponent implements AfterViewInit, OnChanges {
  @Input() expressionA = '';
  @Input() operatorSymbol = '';
  @Input() expressionB = '';
  @Input() swapSide: 'A' | 'B' | null = null;
  @Input() segmentParams: EliminateParams | null = null;

  @ViewChild('svgRoot', {static: true}) svgRoot!: ElementRef<SVGSVGElement>;
  @ViewChild('textA', {static: true}) textA!: ElementRef<SVGTextElement>;
  @ViewChild('textOperator', {static: true}) textOperator!: ElementRef<SVGTextElement>;
  @ViewChild('textB', {static: true}) textB!: ElementRef<SVGTextElement>;

  @ViewChild('segA', {static: false}) segA!: ElementRef<SVGTextElement>;
  @ViewChild('segOp', {static: false}) segOp!: ElementRef<SVGTextElement>;
  @ViewChild('segB', {static: false}) segB!: ElementRef<SVGTextElement>;
  @ViewChild('segSep', {static: false}) segSep!: ElementRef<SVGTextElement>;
  @ViewChild('segC', {static: false}) segC!: ElementRef<SVGTextElement>;

  public arcPath = '';
  public segmentPath = '';

  private readonly fontSize = 48;
  private readonly horizontalGap = 20;
  private readonly topPadding = 20;
  private readonly bottomPadding = 450;
  private readonly tickLength = 16;
  private readonly verticalGap = 20;

  private readonly displayWidth = 15;

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
    this.arcPath = '';
    this.segmentPath = '';
    this.textA.nativeElement.removeAttribute('visibility');
    this.textB.nativeElement.removeAttribute('visibility');

    if (!this.expressionA.trim() || !this.operatorSymbol.trim() || !this.expressionB.trim()) {
      this.setSvgSize(0, 0);
      return;
    }

    this.applyFontSize([this.textA, this.textOperator, this.textB]);
    const widthA = this.resetAndMeasure(this.textA);
    const widthOp = this.resetAndMeasure(this.textOperator);
    this.resetAndMeasure(this.textB);

    const xA = this.horizontalGap;
    const xOp = xA + widthA + this.horizontalGap;
    const xB = xOp + widthOp + this.horizontalGap;
    const baselineY = this.fontSize + this.topPadding;

    this.setPosition(this.textA, xA, baselineY);
    this.setPosition(this.textOperator, xOp, baselineY);
    this.setPosition(this.textB, xB, baselineY);

    const boxA = this.textA.nativeElement.getBBox();
    const boxB = this.textB.nativeElement.getBBox();
    this.arcPath = this.buildArc(boxA, boxB);

    const validSegment =
      this.segmentParams?.expressionA.trim() &&
      this.segmentParams.operation.trim() &&
      this.segmentParams.expressionB.trim() &&
      this.segmentParams.expressionC.trim();

    if (this.swapSide && validSegment) {
      const anchorTextRef = this.swapSide === 'A' ? this.textA : this.textB;
      anchorTextRef.nativeElement.setAttribute('visibility', 'hidden');

      this.segA.nativeElement.textContent = this.segmentParams!.expressionA;
      this.segOp.nativeElement.textContent = this.segmentParams!.operation;
      this.segB.nativeElement.textContent = this.segmentParams!.expressionB;
      this.segSep.nativeElement.textContent = ';';
      this.segC.nativeElement.textContent = this.segmentParams!.expressionC;

      const anchorBox = this.swapSide === 'A' ? boxA : boxB;
      this.renderSegmentUnder(anchorBox, baselineY);
    } else {
      [this.segA, this.segOp, this.segB, this.segSep, this.segC].forEach(seg => {
        seg.nativeElement.textContent = '';
      });
    }

    const svgW = boxB.x + boxB.width + 2 * this.horizontalGap;
    const svgH = baselineY + this.bottomPadding;
    this.setSvgSize(svgW, svgH);
  }

  private renderSegmentUnder(anchorBox: DOMRect, baselineY: number): void {
    const xLine = anchorBox.x + anchorBox.width / 2 - 20;
    const half = this.tickLength / 2;

    [this.segA, this.segOp, this.segB, this.segSep, this.segC]
      .forEach(r => {
        const el = r.nativeElement;
        el.setAttribute('font-size', `${this.fontSize}px`);
        el.setAttribute('fill', '#F8F8FF');
      });

    const hA = this.segA.nativeElement.getBBox().height;
    const hOp = this.segOp.nativeElement.getBBox().height;
    const hB = this.segB.nativeElement.getBBox().height;
    const hSep = this.segSep.nativeElement.getBBox().height;

    const yA = baselineY;
    const yOp = yA + hA + this.verticalGap;
    const yB = yOp + hOp + this.verticalGap;
    const ySep = yB + hB + this.verticalGap;
    const yC = ySep + hSep + this.verticalGap;

    this.segA.nativeElement.setAttribute('x', `${anchorBox.x}`);
    this.segA.nativeElement.setAttribute('y', `${yA}`);
    this.segOp.nativeElement.setAttribute('x', `${anchorBox.x}`);
    this.segOp.nativeElement.setAttribute('y', `${yOp}`);
    this.segB.nativeElement.setAttribute('x', `${anchorBox.x}`);
    this.segB.nativeElement.setAttribute('y', `${yB}`);
    this.segSep.nativeElement.setAttribute('x', `${anchorBox.x}`);
    this.segSep.nativeElement.setAttribute('y', `${ySep}`);
    this.segC.nativeElement.setAttribute('x', `${anchorBox.x}`);
    this.segC.nativeElement.setAttribute('y', `${yC}`);

    const yStart = anchorBox.y + anchorBox.height / 2;
    const boxC = this.segC.nativeElement.getBBox();
    const yEnd = boxC.y + boxC.height / 2;

    this.segmentPath = [
      `M ${xLine - half} ${yStart} L ${xLine + half} ${yStart}`,
      `M ${xLine} ${yStart} L ${xLine} ${yEnd}`,
      `M ${xLine - half} ${yEnd}   L ${xLine + half} ${yEnd}`
    ].join(' ');
  }

  private applyFontSize(refs: ElementRef<SVGTextElement>[]) {
    refs.forEach(r => {
      const el = r.nativeElement;
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

  private setPosition(elRef: ElementRef<SVGTextElement>, x: number, y: number) {
    elRef.nativeElement.setAttribute('x', `${x}`);
    elRef.nativeElement.setAttribute('y', `${y}`);
  }

  private buildArc(boxA: DOMRect, boxB: DOMRect): string {
    const yTop = Math.min(boxA.y, boxB.y);
    const xStart = boxA.x + boxA.width / 2;
    const xEnd = boxB.x + boxB.width / 2;
    const radius = xEnd - xStart;
    return `M ${xStart} ${yTop} A ${radius} ${radius} 0 0 1 ${xEnd} ${yTop}`;
  }

  private setSvgSize(width: number, height: number) {
    const svg = this.svgRoot.nativeElement;

    svg.setAttribute('viewBox', `0 0 ${width} ${height}`);
    svg.setAttribute('preserveAspectRatio', 'xMinYMin meet');

    svg.setAttribute('width', `${this.displayWidth}vmin`);
    svg.setAttribute(
      'height',
      `${(this.displayWidth * height / width).toFixed(2)}vmin`
    );
  }
}
