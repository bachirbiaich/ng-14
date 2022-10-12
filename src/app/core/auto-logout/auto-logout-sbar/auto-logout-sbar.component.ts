import { Component, Inject, Input, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { interval, Subject, take, takeUntil } from 'rxjs';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

@Component({
  selector: 'app-auto-logout-sbar',
  standalone: true,
  imports: [CommonModule, MatProgressSpinnerModule],
  templateUrl: './auto-logout-sbar.component.html',
  styleUrls: ['./auto-logout-sbar.component.scss'],
})
export class AutoLogoutSbarComponent implements OnInit, OnDestroy {
  @Input() counterSeconds: number;
  remainSeconds: number;
  progressSpinnerDiameter = 40;

  private ngUnsubscribe = new Subject<void>();

  constructor(@Inject(MAT_SNACK_BAR_DATA) data: { counterSeconds: number }) {
    this.counterSeconds = data.counterSeconds;
    this.remainSeconds = this.counterSeconds;
  }

  ngOnInit(): void {
    interval(1000)
      .pipe(take(this.counterSeconds), takeUntil(this.ngUnsubscribe))
      .subscribe(() => this.remainSeconds--);
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
