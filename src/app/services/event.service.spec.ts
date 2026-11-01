import { TestBed } from '@angular/core/testing';

import { EventService } from './event.service';

describe('EventService', () => {
  it('gives every event a unique id', () => {
    // The id is used as the add-to-calendar UID, so duplicates make calendar
    // apps treat two events as one. Use the next number after the highest id.
    const ids = TestBed.inject(EventService).getEvents().map(e => e.id);
    const duplicates = ids.filter((id, i) => ids.indexOf(id) !== i);
    expect(duplicates).toEqual([]);
  });
});
