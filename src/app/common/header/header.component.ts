import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { SearchService } from '../services/search.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  searchControl = new FormControl('');

  private subscription: Subscription | null = null;

  constructor(
    private searchService: SearchService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.subscription = this.searchService.search$.subscribe(value => {
      this.searchControl.setValue(value, { emitEvent: false });
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  onSearch(event: Event): void {
    event.preventDefault();

    this.searchService.setSearch(this.searchControl.value ?? '');
    this.router.navigate(['/catalog']);
  }

  onReset(): void {
    this.searchService.resetSearch();
  }
}
