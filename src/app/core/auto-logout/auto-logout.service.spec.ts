import { TestBed } from '@angular/core/testing';

import { AutoLogoutService } from './auto-logout.service';

describe('AutoLogoutService', () => {
  let service: AutoLogoutService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AutoLogoutService],
    });
    service = TestBed.inject(AutoLogoutService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
