import { TestBed } from '@angular/core/testing';

import { RickAndMortyService } from './RickAndMorty.service';

describe('ServService', () => {
  let service: RickAndMortyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RickAndMortyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
