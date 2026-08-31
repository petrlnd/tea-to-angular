import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private readonly searchSubject = new BehaviorSubject<string>('');

  readonly search$: Observable<string> = this.searchSubject.asObservable();

  get currentSearch(): string {
    return this.searchSubject.value;
  }

  setSearch(value: string): void {
    this.searchSubject.next(value.trim());
  }

  resetSearch(): void {
    this.searchSubject.next('');
  }
}
