export enum AutoLogoutConfigLevel {
  SECRET,
  CONFIDENTIAL,
  OTHER,
  TEST,
}

export interface AutoLogoutConfig {
  timeoutSeconds: number;
  displayWarningBeforeTimeout?: boolean;
  warningWhenRemainSeconds?: number;
}

export const autoLogoutConfig: { [key in AutoLogoutConfigLevel]: AutoLogoutConfig } = {
  [AutoLogoutConfigLevel.SECRET]: {
    timeoutSeconds: 300,
    displayWarningBeforeTimeout: true,
    warningWhenRemainSeconds: 10,
  },
  [AutoLogoutConfigLevel.CONFIDENTIAL]: {
    timeoutSeconds: 900,
    displayWarningBeforeTimeout: true,
    warningWhenRemainSeconds: 10,
  },
  [AutoLogoutConfigLevel.OTHER]: {
    timeoutSeconds: 3600,
    displayWarningBeforeTimeout: true,
    warningWhenRemainSeconds: 10,
  },
  [AutoLogoutConfigLevel.TEST]: {
    timeoutSeconds: 20,
    displayWarningBeforeTimeout: true,
    warningWhenRemainSeconds: 10,
  },
};
