import {Component, Input} from '@angular/core';
import {NgIcon, provideIcons} from '@ng-icons/core';
import {matDeleteOutline} from "@ng-icons/material-icons/outline";


@Component({
  selector: 'storage-panel',
  imports: [
    NgIcon
  ],
  viewProviders: [provideIcons({matDeleteOutline})],
  templateUrl: './storage-panel.component.html',
  styleUrl: './storage-panel.component.css'
})
export class StoragePanelComponent {
  @Input() text: string = "XD";
}
