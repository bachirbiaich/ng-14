import { Component } from '@angular/core';
import { AutoLogoutService } from './core/auto-logout/auto-logout.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'ng-14-sample';

  constructor(private autoLogoutService: AutoLogoutService) {
    this.autoLogoutService.activateAutoLogout();
  }
}
