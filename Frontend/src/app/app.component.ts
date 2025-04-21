import {Component} from '@angular/core';
import {ExpressionArcComponent} from './expression-arc/expression-arc.component';
import {ExpressionSegmentComponent} from './expression-segment/expression-segment.component';
import {TitleHeaderComponent} from './title-header/title-header.component';
import {FormTextInputComponent} from './sidebar-input/sidebar-input.component';
import {SidebarButtonComponent} from './sidebar-button/sidebar-button.component';
import {StatusMessageComponent} from './status-message/status-message.component';

@Component({
  selector: 'app-root',
  imports: [
    ExpressionArcComponent,
    ExpressionSegmentComponent,
    TitleHeaderComponent,
    FormTextInputComponent,
    SidebarButtonComponent,
    StatusMessageComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  // ngOnInit() {
  //   window.addEventListener('wheel', this.preventZoom, {passive: false});
  //   window.addEventListener('keydown', this.preventKeyboardZoom);
  // }
  //
  // ngOnDestroy() {
  //   window.removeEventListener('wheel', this.preventZoom);
  //   window.removeEventListener('keydown', this.preventKeyboardZoom);
  // }
  //
  // preventZoom = (e: WheelEvent) => {
  //   if (e.ctrlKey) {
  //     e.preventDefault();
  //   }
  // };
  //
  // preventKeyboardZoom = (e: KeyboardEvent) => {
  //   if (e.ctrlKey && (e.key === '+' || e.key === '-' || e.key === '=')) {
  //     e.preventDefault();
  //   }
  // };
}
