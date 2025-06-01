import {Component} from '@angular/core';

import {ControlPanelComponent} from './components/control-panel/control-panel.component';
import {WorkspaceComponent} from './components/workspace/workspace.component';
import {StoragePanelComponent} from './components/storage-panel/storage-panel.component';
import {BannerComponent} from './components/banner/banner.component';

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
