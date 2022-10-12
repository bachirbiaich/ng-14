import { Injectable } from '@angular/core';
import { Observable, fromEvent, merge, Subject, timer, Subscription, take } from 'rxjs';
import { AutoLogoutModule } from './auto-logout.module';

@Injectable({ providedIn: AutoLogoutModule })
export class IdleService {
  idle$: Observable<any>;
  private timer$: Subscription;
  private warningTimer$: Subscription;
  private timeOutMilliSeconds: number;
  private warningTimeOutMilliSeconds: number;
  private idleSubscription: Subscription;

  warningBeforeExpired$ = new Subject<void>();
  expired$ = new Subject<void>();

  constructor() {}

  startWatching(timeOutSeconds: number, warningWhenRemainSeconds?: number): void {
    this.idle$ = merge(
      fromEvent(document, 'mousemove'),
      fromEvent(document, 'click'),
      fromEvent(document, 'mousedown'),
      fromEvent(document, 'keypress'),
      fromEvent(document, 'DOMMouseScroll'),
      fromEvent(document, 'mousewheel'),
      fromEvent(document, 'touchmove'),
      fromEvent(document, 'MSPointerMove'),
      fromEvent(window, 'mousemove'),
      fromEvent(window, 'resize')
    );

    this.timeOutMilliSeconds = timeOutSeconds * 1000;
    if (warningWhenRemainSeconds != null) {
      this.warningTimeOutMilliSeconds = (timeOutSeconds - warningWhenRemainSeconds) * 1000;
    }

    this.idleSubscription = this.idle$.subscribe(() => {
      this.resetTimers();
    });

    this.startTimers();
  }

  stopWatching(): void {
    this.stopTimer();
  }

  private startTimers(): void {
    this.timer$ = timer(this.timeOutMilliSeconds, this.timeOutMilliSeconds)
      .pipe(take(1))
      .subscribe(() => this.expired$.next());
    if (this.warningTimeOutMilliSeconds != null) {
      this.warningTimer$ = timer(this.warningTimeOutMilliSeconds, this.warningTimeOutMilliSeconds)
        .pipe(take(1))
        .subscribe(() => this.warningBeforeExpired$.next());
    }
  }

  private resetTimers(): void {
    this.timer$?.unsubscribe();
    this.warningTimer$?.unsubscribe();
    this.startTimers();
  }

  private stopTimer(): void {
    this.timer$?.unsubscribe();
    this.warningTimer$?.unsubscribe();
    this.idleSubscription?.unsubscribe();
  }
}
