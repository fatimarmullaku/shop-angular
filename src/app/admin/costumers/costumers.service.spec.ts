import { TestBed } from '@angular/core/testing';

import { CostumersService } from './costumers.service';

describe('CostumersService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CostumersService = TestBed.get(CostumersService);
    expect(service).toBeTruthy();
  });
});
