import {Component} from '@angular/core';
import {NgIcon, provideIcons} from "@ng-icons/core";
import {matTransformOutline} from "@ng-icons/material-icons/outline";

@Component({
    selector: 'title-header',
    imports: [
        NgIcon
    ],
    viewProviders: [provideIcons({matTransformOutline})],
    templateUrl: './title-header.component.html',
    styleUrl: './title-header.component.css'
})
export class TitleHeaderComponent {

}
