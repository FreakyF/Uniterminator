import {Component, Input} from '@angular/core';

@Component({
    selector: 'sidebar-button',
    imports: [],
    templateUrl: './sidebar-button.component.html',
    styleUrl: './sidebar-button.component.css'
})
export class SidebarButtonComponent {
    @Input() label!: string;
}
