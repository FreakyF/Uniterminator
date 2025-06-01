import {Component} from '@angular/core';
import {NgIcon, provideIcons} from "@ng-icons/core";
import {matTransformOutline} from "@ng-icons/material-icons/outline";

@Component({
  selector: 'banner',
  imports: [
    NgIcon
  ],
  viewProviders: [provideIcons({matTransformOutline})],
  templateUrl: './banner.component.html',
  styleUrl: './banner.component.css'
})
export class BannerComponent {

}
