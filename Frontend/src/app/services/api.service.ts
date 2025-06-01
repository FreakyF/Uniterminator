import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {GetSnapshotDto} from '../models/get-snapshot-dto';
import {CreateSnapshotDto} from '../models/create-snapshot-dto';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = 'https://localhost:7220/snapshots';

  getAllSnapshots(): Observable<GetSnapshotDto[]> {
    return this.http.get<GetSnapshotDto[]>(this.baseUrl);
  }

  getSnapshotById(id: string): Observable<GetSnapshotDto> {
    return this.http.get<GetSnapshotDto>(`${this.baseUrl}/${id}`);
  }

  createSnapshot(dto: CreateSnapshotDto): Observable<GetSnapshotDto> {
    return this.http.post<GetSnapshotDto>(this.baseUrl, dto);
  }

  deleteSnapshotById(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
