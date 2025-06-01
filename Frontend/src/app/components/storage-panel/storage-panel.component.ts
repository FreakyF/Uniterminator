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
  snapshots: GetSnapshotDto[] = [
    {
      id: '4a5f1c2d-8b6e-4c3f-81a1-9f2ee54b7d11',
      snapshotName: 'Dodawanie wielomianów',
      parallelizeOperation: {
        id: 'b71c9c6d-1e1d-4b41-bd57-abcd1234ef01',
        expressionA: '2x² + 3x + 5',
        expressionB: 'x² - 4x + 1',
        operationSymbol: '+'
      }
      // eliminateOperation brak – zostawiamy undefined
    },
    {
      id: 'e92c7d14-3f49-4288-9e4d-bc7654321fed',
      snapshotName: 'Eliminacja zmiennej',
      eliminateOperation: {
        id: '0d1a2b3c-4e5f-6789-abcd-ef0123456789',
        expressionA: '3y + 2z = 7',
        expressionB: 'y - 4z = -1',
        expressionExtra: 'z',          // zmienna do wyeliminowania
        operationSymbol: 'elim'        // lub dowolny symbol z backendu
      }
    },
    {
      id: '1c2d3e4f-5061-4273-8a9b-0c1d2e3f4a5b',
      snapshotName: 'Mieszana operacja',
      parallelizeOperation: {
        id: 'f0e1d2c3-b4a5-6789-0abc-def123456789',
        expressionA: 'sin(α) · cos(β)',
        expressionB: 'cos(α) · sin(β)',
        operationSymbol: '+'
      },
      eliminateOperation: {
        id: '12345678-90ab-cdef-1234-567890abcdef',
        expressionA: '5x - 3y = 2',
        expressionB: '2x +  y = 5',
        expressionExtra: 'y',
        operationSymbol: 'elim'
      }
    }
  ];

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
