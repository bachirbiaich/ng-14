import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutoLogoutSbarComponent } from './auto-logout-sbar.component';

describe('AutoLogoutSbarComponent', () => {
  let component: AutoLogoutSbarComponent;
  let fixture: ComponentFixture<AutoLogoutSbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AutoLogoutSbarComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AutoLogoutSbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
