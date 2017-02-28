import { TestBed, inject } from '@angular/core/testing';
import { GWApiService } from './gwapi.service';

describe('GWApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GWApiService]
    });
  });

  it('should ...', inject([GWApiService], (service: GWApiService) => {
    expect(service).toBeTruthy();
  }));
});
