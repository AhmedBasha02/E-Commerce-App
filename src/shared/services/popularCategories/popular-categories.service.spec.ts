import { TestBed } from '@angular/core/testing';

import { PopularCategoriesService } from './popular-categories.service';

describe('PopularCategoriesService', () => {
  let service: PopularCategoriesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PopularCategoriesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
