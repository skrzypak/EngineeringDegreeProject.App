import { TestBed } from '@angular/core/testing';

import { NutritionPlansService } from './nutrition-plans.service';

describe('NutritionPlansService', () => {
  let service: NutritionPlansService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NutritionPlansService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
