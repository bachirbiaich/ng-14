import { AutoLogoutConfigLevel } from 'src/app/core/auto-logout/auto-logout.config';

export interface Environment {
  production: boolean;
  autoLogoutConfigLevel?: AutoLogoutConfigLevel;
}
