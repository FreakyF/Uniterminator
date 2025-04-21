import {Component} from '@angular/core';

import {ControlPanelComponent} from './control-panel/control-panel.component';
import {WorkspaceComponent} from './workspace/workspace.component';
import {StoragePanelComponent} from './storage-panel/storage-panel.component';
import {BannerComponent} from './banner/banner.component';

@Component({
  selector: 'app-root',
  imports: [
    ControlPanelComponent,
    WorkspaceComponent,
    StoragePanelComponent,
    BannerComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
}
