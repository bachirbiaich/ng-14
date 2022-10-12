import { AutoLogoutModule } from './auto-logout/auto-logout.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [CommonModule],
  exports: [AutoLogoutModule],
})
export class CoreModule {}
