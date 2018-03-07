import { TestBed, inject } from '@angular/core/testing';

import { LoginServiceService } from './login-service.service';
import { Apollo } from 'apollo-angular';

describe('LoginServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoginServiceService, Apollo]
    });
  });

  it('should be created', inject([LoginServiceService], (service: LoginServiceService) => {
    expect(service).toBeTruthy();
  }));
});
