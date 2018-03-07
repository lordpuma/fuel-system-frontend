import { TestBed, async, inject } from '@angular/core/testing';

import { LoginGuardGuard } from './login-guard.guard';
import { LoginServiceService } from './login-service.service';
import { Apollo } from 'apollo-angular';

describe('LoginGuardGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoginGuardGuard, LoginServiceService, Apollo]
    });
  });

  it('should ...', inject([LoginGuardGuard], (guard: LoginGuardGuard) => {
    expect(guard).toBeTruthy();
  }));
});
