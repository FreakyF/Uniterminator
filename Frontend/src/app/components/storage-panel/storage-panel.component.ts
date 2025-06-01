import {Component, inject} from '@angular/core';
import {NgIcon, provideIcons} from '@ng-icons/core';
import {matDeleteOutline} from "@ng-icons/material-icons/outline";
import {ApiService} from '../../services/api.service';
import {GetSnapshotDto} from '../../models/get-snapshot-dto';
import {NgForOf} from '@angular/common';


@Component({
  selector: 'storage-panel',
  imports: [
    NgIcon,
    NgForOf
  ],
  viewProviders: [provideIcons({matDeleteOutline})],
  templateUrl: './storage-panel.component.html',
  styleUrl: './storage-panel.component.css'
})
export class StoragePanelComponent {
  snapshots: GetSnapshotDto[] = [];

  private readonly api = inject(ApiService);

  ngOnInit(): void {
    this.loadSnapshots();
  }

  private loadSnapshots(): void {
    this.api.getAllSnapshots().subscribe({
      next: (data) => (this.snapshots = data),
      error: (err) => console.error('Error fetching snapshots', err),
    });
  }

  onDelete(id: string): void {
    this.api.deleteSnapshotById(id).subscribe({
      next: () => {
        this.snapshots = this.snapshots.filter((s) => s.id !== id);
      },
      error: (err) => console.error('Error deleting snapshot', err),
    });
  }
}
