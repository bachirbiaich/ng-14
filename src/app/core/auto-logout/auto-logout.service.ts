import { AutoLogoutConfig } from './auto-logout.config';
import { Inject, Injectable } from '@angular/core';
import { AUTO_LOGOUT_CONFIG, AutoLogoutModule } from './auto-logout.module';
import { IdleService } from './idle.service';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';
import { AutoLogoutSbarComponent } from './auto-logout-sbar/auto-logout-sbar.component';
import { take } from 'rxjs';

@Injectable({ providedIn: AutoLogoutModule })
export class AutoLogoutService {
  snackBarRef: MatSnackBarRef<AutoLogoutSbarComponent>;

  constructor(
    @Inject(AUTO_LOGOUT_CONFIG) private config: AutoLogoutConfig,
    private idleService: IdleService,
    private snackBar: MatSnackBar
  ) {}

  activateAutoLogout(): void {
    if (this.config.timeoutSeconds != null) {
      this.idleService.startWatching(
        this.config.timeoutSeconds,
        this.config.displayWarningBeforeTimeout ? this.config.warningWhenRemainSeconds : undefined
      );
      if (this.config.displayWarningBeforeTimeout && this.config.warningWhenRemainSeconds != null) {
        this.idleService.warningBeforeExpired$.subscribe(() => this.onWarningBeforeExpired());
      }
      this.idleService.expired$.subscribe(() => this.onExpired());
    } else {
      throw Error('AUTO_LOGOUT_CONFIG - timeoutSeconds cannot be null');
    }
  }

  private onWarningBeforeExpired(): void {
    console.log('onWarningBeforeExpired');
    this.snackBarRef = this.snackBar.openFromComponent(AutoLogoutSbarComponent, {
      data: { counterSeconds: this.config.warningWhenRemainSeconds },
    });
    this.idleService.idle$.pipe(take(1)).subscribe(() => this.snackBarRef.dismiss());
  }

  private onExpired(): void {
    console.log('onExpired');
    this.idleService.stopWatching();
    this.snackBarRef?.dismiss();
    // TODO : Logout Service call
  }
}
