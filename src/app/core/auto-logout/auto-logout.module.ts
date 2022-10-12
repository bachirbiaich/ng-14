import { autoLogoutConfig, AutoLogoutConfig, AutoLogoutConfigLevel } from './auto-logout.config';
import { InjectionToken, Injector, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Environment } from '../../../environments/environment.interface';
import { ENV } from '../../../environments/environment.module';
import { AutoLogoutSbarComponent } from './auto-logout-sbar/auto-logout-sbar.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';

export const AUTO_LOGOUT_CONFIG = new InjectionToken<AutoLogoutConfig>('AUTO_LOGOUT_CONFIG');

@NgModule({
  imports: [CommonModule, MatSnackBarModule, AutoLogoutSbarComponent],
  providers: [
    {
      provide: AUTO_LOGOUT_CONFIG,
      useFactory: (injector: Injector) =>
        injector.get<Environment>(ENV).autoLogoutConfigLevel != null
          ? autoLogoutConfig[<AutoLogoutConfigLevel>injector.get<Environment>(ENV).autoLogoutConfigLevel]
          : autoLogoutConfig[AutoLogoutConfigLevel.SECRET],
      deps: [Injector],
    },
  ],
})
export class AutoLogoutModule {}
