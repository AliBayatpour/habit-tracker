import { TestBed } from '@angular/core/testing';

import { newHabitService } from './new-habit.service';

describe('newHabitService', () => {
  let service: newHabitService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(newHabitService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
