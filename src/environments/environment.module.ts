import { InjectionToken, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { environment } from './environment';
import { Environment } from './environment.interface';

export const ENV = new InjectionToken<Environment>('ENV');

@NgModule({
  imports: [CommonModule],
  providers: [{ provide: ENV, useValue: environment }],
})
export class EnvironmentModule {}
